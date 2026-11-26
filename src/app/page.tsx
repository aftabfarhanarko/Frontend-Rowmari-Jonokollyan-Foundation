'use client';

import React, { useState, useEffect } from 'react';
import { Language, ApplicationTrackingStatus } from '@/types';
import { MOCK_APPLICATIONS } from '@/data/mockData';
import { useLazyTrackApplicationQuery } from '@/store/api/applicationsApi';

// Modular Home Page Sections
import {
  Hero,
  QuickActions,
  ImpactStats,
  HowItWorks,
  RecentActivities,
  TrackAndSupport,
  OngoingCampaigns,
  Testimonials,
  AboutUs,
  JoinCTA,
} from '@/components/home';

// Global Layout Components
import {
  Navbar,
  Footer,
  MobileBottomBar,
  BackToTop,
} from '@/components/layout';

// Interactive Modals
import AssistanceModal from '@/components/modals/AssistanceModal';
import VolunteerModal from '@/components/modals/VolunteerModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import AnnouncementModal from '@/components/modals/AnnouncementModal';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('bn');

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [searchedId, setSearchedId] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);
  const [applicationsMap, setApplicationsMap] = useState<Record<string, ApplicationTrackingStatus>>(MOCK_APPLICATIONS);
  const [triggerTrack] = useLazyTrackApplicationQuery();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('rjf_announcement_dismissed');
      const today = new Date().toDateString();
      if (dismissed !== today) {
        const timer = setTimeout(() => {
          setAnnouncementModalOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleSearchTracking = async (id: string) => {
    const trimmedId = id.trim().toUpperCase();
    setSearchedId(trimmedId);
    try {
      const res = await triggerTrack({ referenceCode: trimmedId, phone: '' }).unwrap();
      setTrackingRecord(res);
    } catch {
      const found = applicationsMap[trimmedId] || null;
      setTrackingRecord(found);
    }
    setTrackingModalOpen(true);
  };

  const handleAssistanceSubmitted = (newId: string) => {
    const newRecord: ApplicationTrackingStatus = {
      id: newId,
      applicantName: 'সম্মানিত আবেদনকারী',
      categoryBn: 'মানবিক সহায়তা আবেদন',
      categoryEn: 'Humanitarian Assistance Request',
      submittedDateBn: 'আজই (নতুন)',
      submittedDateEn: 'Today (New)',
      status: 'pending',
      statusNoteBn: 'আপনার আবেদনটি সফলভাবে সার্ভারে সংরক্ষিত হয়েছে। প্রাথমিক যাচাই কমিটি দ্রুত পর্যালোচনা সম্পন্ন করবে।',
      statusNoteEn: 'Application received and waiting for preliminary verification review.',
      assignedOfficerBn: 'যাচাই কমিটি, রৌমারী শাখা',
    };
    setApplicationsMap((prev) => ({
      ...prev,
      [newId]: newRecord,
    }));
  };

  const scrollToActivities = () => {
    const el = document.getElementById('activities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main className="flex-1">
        <Hero
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenActivities={scrollToActivities}
        />

        <QuickActions
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        <ImpactStats lang={lang} />

        {/* 3 Steps How It Works */}
        <HowItWorks lang={lang} onOpenAssistance={() => setAssistanceModalOpen(true)} />

        <RecentActivities
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
        />

        <OngoingCampaigns
          lang={lang}
        />

        <TrackAndSupport
          lang={lang}
          onSearchTracking={handleSearchTracking}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        {/* Real Beneficiary & Volunteer Testimonials */}
        <Testimonials lang={lang} />

        <AboutUs
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
        />

        {/* Join CTA & Newsletter Subscription */}
        <JoinCTA
          lang={lang}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />
      </main>

      <Footer
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
        onSubmittedSuccess={handleAssistanceSubmitted}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
        lang={lang}
      />

      <TrackingResultModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        lang={lang}
        application={trackingRecord}
        searchedId={searchedId}
      />

      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />
    </div>
  );
}
