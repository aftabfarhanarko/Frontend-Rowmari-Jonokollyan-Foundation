'use client';

import React, { useState, useEffect } from 'react';
import { Language, ApplicationTrackingStatus } from '@/types';
import { MOCK_APPLICATIONS } from '@/data/mockData';

// Modular Page Sections
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickActions from '@/components/QuickActions';
import ImpactStats from '@/components/ImpactStats';
import HowItWorks from '@/components/HowItWorks';
import RecentActivities from '@/components/RecentActivities';
import BloodDonationBanner from '@/components/BloodDonationBanner';
import TrackAndSupport from '@/components/TrackAndSupport';
import OngoingCampaigns from '@/components/OngoingCampaigns';
import Testimonials from '@/components/Testimonials';
import AboutUs from '@/components/AboutUs';
import JoinCTA from '@/components/JoinCTA';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';

// Interactive Modals
import AssistanceModal from '@/components/modals/AssistanceModal';
import BloodRequestModal from '@/components/modals/BloodRequestModal';
import BloodDonorModal from '@/components/modals/BloodDonorModal';
import DonationModal from '@/components/modals/DonationModal';
import VolunteerModal from '@/components/modals/VolunteerModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import AnnouncementModal from '@/components/modals/AnnouncementModal';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('bn');

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [bloodRequestModalOpen, setBloodRequestModalOpen] = useState(false);
  const [bloodDonorModalOpen, setBloodDonorModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [preselectedCampaign, setPreselectedCampaign] = useState<string>('general');
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [searchedId, setSearchedId] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);
  const [applicationsMap, setApplicationsMap] = useState<Record<string, ApplicationTrackingStatus>>(MOCK_APPLICATIONS);

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

  const handleOpenDonation = (campaignId?: string) => {
    setPreselectedCampaign(campaignId || 'general');
    setDonationModalOpen(true);
  };

  const handleSearchTracking = (id: string) => {
    const trimmedId = id.trim().toUpperCase();
    setSearchedId(trimmedId);
    const found = applicationsMap[trimmedId] || null;
    setTrackingRecord(found);
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
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      <main className="flex-1">
        <Hero
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenActivities={scrollToActivities}
          onOpenBlood={() => setBloodRequestModalOpen(true)}
          onOpenDonor={() => setBloodDonorModalOpen(true)}
          onOpenDonation={(campaign) => handleOpenDonation(campaign || 'general')}
        />

        <QuickActions
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenBlood={() => setBloodRequestModalOpen(true)}
          onOpenDonation={() => handleOpenDonation('general')}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        <ImpactStats lang={lang} />

        {/* 3 Steps How It Works */}
        <HowItWorks lang={lang} onOpenAssistance={() => setAssistanceModalOpen(true)} />

        <RecentActivities
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
        />

        <BloodDonationBanner
          lang={lang}
          onOpenDonorModal={() => setBloodDonorModalOpen(true)}
          onOpenBloodRequestModal={() => setBloodRequestModalOpen(true)}
        />

        <OngoingCampaigns
          lang={lang}
          onOpenDonation={handleOpenDonation}
        />

        <TrackAndSupport
          lang={lang}
          onSearchTracking={handleSearchTracking}
          onOpenDonation={() => handleOpenDonation('general')}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        {/* Real Beneficiary & Volunteer Testimonials */}
        <Testimonials lang={lang} />

        <AboutUs
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenDonation={() => handleOpenDonation('general')}
        />

        {/* Join CTA & Newsletter Subscription */}
        <JoinCTA
          lang={lang}
          onOpenDonation={() => handleOpenDonation('general')}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />
      </main>

      <Footer
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenBlood={() => setBloodDonorModalOpen(true)}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
        onSubmittedSuccess={handleAssistanceSubmitted}
      />

      <BloodRequestModal
        isOpen={bloodRequestModalOpen}
        onClose={() => setBloodRequestModalOpen(false)}
        lang={lang}
      />

      <BloodDonorModal
        isOpen={bloodDonorModalOpen}
        onClose={() => setBloodDonorModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
        preselectedCampaign={preselectedCampaign}
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
        onOpenBloodRequest={() => setBloodRequestModalOpen(true)}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />
    </div>
  );
}
