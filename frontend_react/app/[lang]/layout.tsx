import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Providers } from '@/app/providers';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface LangLayoutProps {
  children: ReactNode;
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  return {
    title: lang === 'ar' ? 'بروكيز - خدمات احترافية' : 'Prokeys - Professional Services',
    description:
      lang === 'ar'
        ? 'توفير خدمات احترافية وحلول متكاملة'
        : 'Prokeys provides professional services and solutions',
    openGraph: {
      locale: lang,
    },
  };
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body>
        <Providers lang={lang}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navigation lang={lang} />
            <Container
              maxWidth="xl"
              sx={{
                flex: 1,
                py: 4,
              }}
            >
              {children}
            </Container>
            <Footer lang={lang} />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
