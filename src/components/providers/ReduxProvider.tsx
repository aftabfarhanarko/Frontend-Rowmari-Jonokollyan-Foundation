'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from 'sonner';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        richColors
        position="top-center"
        closeButton
        duration={4000}
        toastOptions={{
          style: {
            fontFamily: 'inherit',
          },
        }}
      />
    </Provider>
  );
}
