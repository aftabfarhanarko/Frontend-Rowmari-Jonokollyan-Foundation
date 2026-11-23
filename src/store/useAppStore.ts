import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Language } from '@/types';

interface AppState {
  // Localization
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;

  // Emergency Announcement Banner
  topBannerVisible: boolean;
  setTopBannerVisible: (visible: boolean) => void;
  announcementDismissedDate: string | null;
  dismissAnnouncementToday: () => void;

  // Modals Visibility & Context
  assistanceModalOpen: boolean;
  setAssistanceModalOpen: (open: boolean) => void;

  bloodRequestModalOpen: boolean;
  setBloodRequestModalOpen: (open: boolean) => void;

  bloodDonorModalOpen: boolean;
  setBloodDonorModalOpen: (open: boolean) => void;

  donationModalOpen: boolean;
  preselectedCampaign: string;
  setDonationModalOpen: (open: boolean, campaign?: string) => void;

  volunteerModalOpen: boolean;
  setVolunteerModalOpen: (open: boolean) => void;

  announcementModalOpen: boolean;
  setAnnouncementModalOpen: (open: boolean) => void;

  trackingModalOpen: boolean;
  searchedTrackingId: string;
  setTrackingModalOpen: (open: boolean, id?: string) => void;

  // Persistent User Data (e.g. tracking numbers applied by user)
  savedApplicationIds: string[];
  addSavedApplicationId: (id: string) => void;
  recentDonationReceipts: string[];
  addDonationReceipt: (receiptNo: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Localization default: 'bn'
      lang: 'bn',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((state) => ({ lang: state.lang === 'bn' ? 'en' : 'bn' })),

      // Announcement
      topBannerVisible: true,
      setTopBannerVisible: (topBannerVisible) => set({ topBannerVisible }),
      announcementDismissedDate: null,
      dismissAnnouncementToday: () => {
        const today = new Date().toDateString();
        set({ announcementDismissedDate: today, topBannerVisible: false });
      },

      // Modals
      assistanceModalOpen: false,
      setAssistanceModalOpen: (assistanceModalOpen) => set({ assistanceModalOpen }),

      bloodRequestModalOpen: false,
      setBloodRequestModalOpen: (bloodRequestModalOpen) => set({ bloodRequestModalOpen }),

      bloodDonorModalOpen: false,
      setBloodDonorModalOpen: (bloodDonorModalOpen) => set({ bloodDonorModalOpen }),

      donationModalOpen: false,
      preselectedCampaign: 'general',
      setDonationModalOpen: (donationModalOpen, campaign = 'general') =>
        set({ donationModalOpen, preselectedCampaign: campaign }),

      volunteerModalOpen: false,
      setVolunteerModalOpen: (volunteerModalOpen) => set({ volunteerModalOpen }),

      announcementModalOpen: false,
      setAnnouncementModalOpen: (announcementModalOpen) => set({ announcementModalOpen }),

      trackingModalOpen: false,
      searchedTrackingId: '',
      setTrackingModalOpen: (trackingModalOpen, id = '') =>
        set({ trackingModalOpen, searchedTrackingId: id }),

      // Persistent User Tracking
      savedApplicationIds: [],
      addSavedApplicationId: (id) =>
        set((state) => {
          if (state.savedApplicationIds.includes(id)) return state;
          return { savedApplicationIds: [id, ...state.savedApplicationIds] };
        }),

      recentDonationReceipts: [],
      addDonationReceipt: (receiptNo) =>
        set((state) => {
          if (state.recentDonationReceipts.includes(receiptNo)) return state;
          return { recentDonationReceipts: [receiptNo, ...state.recentDonationReceipts] };
        }),
    }),
    {
      name: 'rjf-app-storage', // Persistent Storage in localStorage
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : sessionStorage)),
      partialize: (state) => ({
        lang: state.lang,
        announcementDismissedDate: state.announcementDismissedDate,
        savedApplicationIds: state.savedApplicationIds,
        recentDonationReceipts: state.recentDonationReceipts,
      }),
    }
  )
);
