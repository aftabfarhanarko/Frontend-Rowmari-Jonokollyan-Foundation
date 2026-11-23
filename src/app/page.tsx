'use client';

import React, { useState, useEffect } from 'react';
import { Language, ApplicationTrackingStatus } from '@/types';
import { MOCK_APPLICATIONS } from '@/data/mockData';

// Modular Page Sections
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickActions from '@/components/QuickActions';
import ImpactStats from '@/components/ImpactStats';
import RecentActivities from '@/components/RecentActivities';
import BloodDonationBanner from '@/components/BloodDonationBanner';
import TrackAndSupport from '@/components/TrackAndSupport';
import OngoingCampaigns from '@/components/OngoingCampaigns';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';

// Interactive Modals
import AssistanceModal from '@/components/modals/AssistanceModal';
import BloodRequestModal from '@/components/modals/BloodRequestModal';
import BloodDonorModal from '@/components/modals/BloodDonorModal';
import DonationModal from '@/components/modals/DonationModal';
import VolunteerModal from '@/components/modals/VolunteerModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import AnnouncementModal from '@/components/modals/AnnouncementModal';

export default function HomePage() {
  // Localization State: বাংলা (default) | English
  const [lang, setLang] = useState<Language>('bn');

  // Emergency Announcement Banner & Popup State
  const [topBannerVisible, setTopBannerVisible] = useState(true);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  // Modals Visibility
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [bloodRequestModalOpen, setBloodRequestModalOpen] = useState(false);
  const [bloodDonorModalOpen, setBloodDonorModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [preselectedCampaign, setPreselectedCampaign] = useState<string>('general');
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  // Tracking Application State
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [searchedId, setSearchedId] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);
  const [applicationsMap, setApplicationsMap] = useState<Record<string, ApplicationTrackingStatus>>(MOCK_APPLICATIONS);

  // Auto show announcement once per session if not dismissed today (PRD Section 6 UX Rule)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('rjf_announcement_dismissed');
      const today = new Date().toDateString();
      if (dismissed !== today) {
        // Show after a subtle delay for optimal UX
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
    // Add to live tracker in memory
    const newRecord: ApplicationTrackingStatus = {
      id: newId,
      applicantName: 'সম্মানিত আবেদনকারী',
      categoryBn: 'মানবিক সহায়তা আবেদন',
      categoryEn: 'Humanitarian Assistance Request',
      submittedDateBn: 'আজই (নতুন)',
      submittedDateEn: 'Today (New)',
      status: 'pending',
      statusNoteBn: 'আপনার আবেদনটি সফলভাবে সার্ভারে সংরক্ষিত হয়েছে। প্রাথমিক যাচাই কমিটি দ্রুত পর্যালোচনা সম্পন্ন করবে।',
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
      {/* 1. Main Navigation Bar with Emergency Announcement Ticker, Logo & Links */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      <main className="flex-1">
        {/* 3. Hero Section (Heading, Subtitle, CTAs, Hero Card with Official Seal) */}
        <Hero
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenActivities={scrollToActivities}
          onOpenBlood={() => setBloodRequestModalOpen(true)}
          onOpenDonor={() => setBloodDonorModalOpen(true)}
          onOpenDonation={(campaign) => handleOpenDonation(campaign || 'general')}
        />

        {/* 4. Quick Action Cards (4 Cards: সহায়তা চাই, রক্তদান, অনুদান দিন, স্বেচ্ছাসেবক হোন) */}
        <QuickActions
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenBlood={() => setBloodRequestModalOpen(true)}
          onOpenDonation={() => handleOpenDonation('general')}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        {/* 5. Our Real Impact (4 Dark Green Stat Cards with Verified Numbers) */}
        <ImpactStats lang={lang} />

        {/* 6. Recent Activities Grid with View All & Modal Preview */}
        <RecentActivities
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
        />

        {/* 7. Blood Donation Banner (Soft Red Container with Privacy Reassurance) */}
        <BloodDonationBanner
          lang={lang}
          onOpenDonorModal={() => setBloodDonorModalOpen(true)}
          onOpenBloodRequestModal={() => setBloodRequestModalOpen(true)}
        />

        {/* 8. Dual Action Section: Track Application (Left) & Stand With Us (Right) */}
        <TrackAndSupport
          lang={lang}
          onSearchTracking={handleSearchTracking}
          onOpenDonation={() => handleOpenDonation('general')}
          onOpenVolunteer={() => setVolunteerModalOpen(true)}
        />

        {/* 9. Ongoing Campaigns Section with Targeted Funds & Progress */}
        <OngoingCampaigns
          lang={lang}
          onOpenDonation={handleOpenDonation}
        />

        {/* 10. About Us & 9-Year Historical Milestone Journey */}
        <AboutUs
          lang={lang}
          onOpenAssistance={() => setAssistanceModalOpen(true)}
          onOpenDonation={() => handleOpenDonation('general')}
        />
      </main>

      {/* 11. Footer with Full Contacts, Affiliation, Quick Links & Policies */}
      <Footer
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenBlood={() => setBloodDonorModalOpen(true)}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      {/* Persistent Mobile Bottom Sticky Bar matching the user's wireframes */}
      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => handleOpenDonation('general')}
      />

      {/* All Interactive Modals */}
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
