'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';

interface ProvidersProps {
  children: ReactNode;
  lang: string;
}

export function Providers({ children, lang }: ProvidersProps) {
  const isRTL = lang === 'ar';

  const cacheRtl = createCache({
    key: isRTL ? 'muirtl' : 'muicache',
    stylisPlugins: isRTL ? [prefixer, stylisRTLPlugin] : [],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeContext.Provider value={{ isRTL, lang } as any}>
        <UserProvider>
          <CssBaseline />
          {children}
          <Toaster
            toastOptions={{
              success: {
                iconTheme: {
                  primary: 'green',
                  secondary: 'white',
                },
                style: {
                  background: '#5bb94e',
                  color: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'red',
                  secondary: 'white',
                },
                style: {
                  background: '#b30101',
                  color: 'white',
                },
              },
            }}
          />
        </UserProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
