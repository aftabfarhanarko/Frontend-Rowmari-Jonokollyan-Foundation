
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import {
  Toaster,
  type ExternalToast,
} from 'sonner';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}

      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        visibleToasts={3}
        duration={3500}
        theme="light"
        offset={{ top: '16px', right: '16px' }}
        mobileOffset={{ top: '12px', left: '16px', right: '16px' }}
        icons={{
          success: (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
              >
                <path
                  d="m5 12 4 4L19 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ),
          error: (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  d="M12 8v4m0 4h.01M10.3 3.9 2.7 17.2A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ),
          warning: (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  d="M12 9v4m0 4h.01M10.3 3.9 2.7 17.2A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ),
          info: (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 16v-4m0-4h.01"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          ),
        }}
        toastOptions={{
          className:
            '!bg-white !border !border-slate-200/80 !text-slate-900 !rounded-2xl !shadow-[0_10px_30px_rgba(15,23,42,0.12)] !px-4 !py-3 !w-full sm:!w-[380px] !max-w-full !items-center !gap-3',
          style: {
            fontFamily: 'inherit',
          },
          classNames: {
            closeButton: '!bg-white !border-slate-200 !text-slate-500 hover:!text-slate-800',
            icon: '!flex !items-center !justify-center !shrink-0 !m-0',
            content: '!flex !flex-col !justify-center !gap-0.5 !min-w-0 !flex-1',
            title: '!text-[13px] sm:!text-[14px] !font-semibold !text-slate-900 !leading-snug !break-words',
            description: '!text-[12px] sm:!text-[13px] !text-slate-500 !leading-relaxed !break-words',
            actionButton:
              '!bg-slate-900 !text-white !rounded-lg',
            cancelButton:
              '!bg-slate-100 !text-slate-700 !rounded-lg',
          },
        }}
      />
    </Provider>
  );
}
