'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

interface HomePageProps {
  params: {
    lang: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { lang } = params;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isArabic = lang === 'ar';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 'bold',
            mb: 2,
            textAlign: isArabic ? 'right' : 'left',
          }}
        >
          {isArabic ? 'مرحبا بك في بروكيز' : 'Welcome to Prokeys'}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            opacity: 0.9,
            textAlign: isArabic ? 'right' : 'left',
          }}
        >
          {isArabic
            ? 'منصة احترافية توفر خدمات ممتازة'
            : 'A professional platform providing excellent services'}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            {isArabic ? 'استكشف المزيد' : 'Explore More'}
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'white',
              },
            }}
          >
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </Button>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 6,
            opacity: 0.7,
            textAlign: isArabic ? 'right' : 'left',
          }}
        >
          {isArabic
            ? 'تم تطويره باستخدام Next.js و TypeScript'
            : 'Built with Next.js and TypeScript'}
        </Typography>
      </Container>
    </Box>
  );
}
