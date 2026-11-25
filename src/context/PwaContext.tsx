'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isBannerDismissed: boolean;
  iosModalOpen: boolean;
  setIosModalOpen: (open: boolean) => void;
  promptInstall: () => Promise<void>;
  dismissBanner: () => void;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

const DISMISSAL_STORAGE_KEY = 'rjf_pwa_banner_dismissed_until';
const DISMISSAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function PwaProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isSafari, setIsSafari] = useState<boolean>(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(true);
  const [iosModalOpen, setIosModalOpen] = useState<boolean>(false);

  // Check standalone mode and platform detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (navigator as unknown as { standalone?: boolean }).standalone === true;
      const isTwa = document.referrer.startsWith('android-app://');
      const installed = Boolean(isStandaloneMedia || isIOSStandalone || isTwa);
      setIsInstalled(installed);
      return installed;
    };

    const alreadyInstalled = checkStandalone();

    // Standalone media query change listener
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Platform detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isAppleSafari =
      isAppleDevice &&
      /webkit/.test(userAgent) &&
      !/crios|fxios|opios|mercury/.test(userAgent);

    setIsIOS(isAppleDevice);
    setIsSafari(isAppleSafari);

    // Check banner dismissal timestamp in localStorage
    if (!alreadyInstalled) {
      try {
        const dismissedUntil = localStorage.getItem(DISMISSAL_STORAGE_KEY);
        if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
          setIsBannerDismissed(true);
        } else {
          setIsBannerDismissed(false);
        }
      } catch {
        setIsBannerDismissed(false);
      }
    }

    // Listen to beforeinstallprompt event (Chromium, Android Chrome, Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser's default automatic mini-infobar
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Re-evaluate dismissal on fresh installable prompt
      try {
        const dismissedUntil = localStorage.getItem(DISMISSAL_STORAGE_KEY);
        if (!dismissedUntil || Number(dismissedUntil) <= Date.now()) {
          setIsBannerDismissed(false);
        }
      } catch {
        // ignore storage errors
      }
    };

    // Listen to appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsBannerDismissed(true);
      toast.success('RJF অ্যাপ সফলভাবে ইনস্টল করা হয়েছে!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Safe Service Worker Registration
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerSW = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          // Listen for available updates
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (!installingWorker) return;
            installingWorker.onstatechange = () => {
              if (
                installingWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New content available; can prompt or activate
                installingWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            };
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service worker registration failed:', err);
        });
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
      return () => window.removeEventListener('load', registerSW);
    }
  }, []);

  // Trigger installation prompt
  const promptInstall = useCallback(async () => {
    if (isInstalled) {
      toast.info('অ্যাপটি ইতোমধ্যে আপনার ডিভাইসে ইনস্টল করা আছে।');
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          setIsBannerDismissed(true);
        }
      } catch (err) {
        console.warn('[PWA] Install prompt error:', err);
      }
      return;
    }

    // iOS Safari Add to Home Screen flow
    if (isIOS) {
      setIosModalOpen(true);
      return;
    }

    // Other browsers where beforeinstallprompt didn't fire or is unsupported
    toast.info(
      'আপনার ব্রাউজার মেনু থেকে "Add to Home Screen" বা "Install App" সিলেক্ট করুন।'
    );
  }, [deferredPrompt, isIOS, isInstalled]);

  // Dismiss banner temporarily
  const dismissBanner = useCallback(() => {
    setIsBannerDismissed(true);
    try {
      localStorage.setItem(
        DISMISSAL_STORAGE_KEY,
        String(Date.now() + DISMISSAL_DURATION_MS)
      );
    } catch {
      // ignore
    }
  }, []);

  const isInstallable = !isInstalled && (Boolean(deferredPrompt) || isIOS);

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        isSafari,
        isBannerDismissed,
        iosModalOpen,
        setIosModalOpen,
        promptInstall,
        dismissBanner,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
