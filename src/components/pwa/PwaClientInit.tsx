'use client';

import React, { ReactNode } from 'react';
import { PwaProvider } from '@/context/PwaContext';
import PwaInstallBanner from './PwaInstallBanner';
import IosInstallModal from './IosInstallModal';

export default function PwaClientInit({ children }: { children: ReactNode }) {
  return (
    <PwaProvider>
      {children}
      <PwaInstallBanner />
      <IosInstallModal />
    </PwaProvider>
  );
}
