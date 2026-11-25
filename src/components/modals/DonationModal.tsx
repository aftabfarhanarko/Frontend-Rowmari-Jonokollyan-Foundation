'use client';

import React from 'react';
import { Language } from '@/types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedCampaign?: string;
}

export default function DonationModal({
  isOpen: _isOpen,
  onClose: _onClose,
  lang: _lang,
  preselectedCampaign: _preselectedCampaign,
}: DonationModalProps) {
  // Financial donation is disabled for RJF
  return null;
}
