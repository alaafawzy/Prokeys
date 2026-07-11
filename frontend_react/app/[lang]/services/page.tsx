'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

interface ServicesPageProps {
  params: {
    lang: string;
  };
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = params;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isArabic = lang === 'ar';

  const content = {
    en: {
      title: 'Our Services',
      subtitle: 'Comprehensive Solutions Tailored to Your Needs',
      services: [
        {
          title: 'Consulting',
          description: 'Expert consulting services to guide your business strategy and growth',
          features: ['Strategy', 'Planning', 'Analysis'],
        },
        {
          title: 'Development',
          description: 'Custom software development solutions for your unique requirements',
          features: ['Web Apps', 'Mobile', 'APIs'],
        },
        {
          title: 'Design',
          description: 'Beautiful and user-centric design solutions that engage users',
          features: ['UI/UX', 'Branding', 'Prototyping'],
        },
        {
          title: 'Support',
          description: '24/7 support and maintenance to keep your systems running smoothly',
          features: ['Maintenance', 'Monitoring', 'Support'],
        },
      ],
    },
    ar: {
      title: 'خدماتنا',
      subtitle: 'حلول شاملة مصممة حسب احتياجاتك',
      services: [
        {
          title: 'الاستشارات',
          description: 'خدمات استشارية متخصصة لتوجيه استراتيجية عملك والنمو',
          features: ['الإستراتيجية', 'التخطيط', 'التحليل'],
        },
        {
          title: 'التطوير',
          description: 'حلول تطوير برمجيات مخصصة لمتطلباتك الفريدة',
          features: ['تطبيقات ويب', 'الهاتف المحمول', 'واجهات برمجية'],
        },
        {
          title: 'التصميم',
          description: 'حلول تصميم جميلة وموجهة نحو المستخدم تجذب المستخدمين',
          features: ['واجهة المستخدم', 'العلامة التجارية', 'النماذج الأولية'],
        },
        {
          title: 'الدعم',
          description: 'دعم وصيانة 24/7 للحفاظ على أنظمتك تعمل بسلاسة',
          features: ['الصيانة', 'المراقبة', 'الدعم'],
        },
      ],
    },
  };

  const currentContent = content[isArabic ? 'ar' : 'en'];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {currentContent.title}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            {currentContent.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        {/* Services Grid */}
        <Grid container spacing={4}>
          {currentContent.services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.25)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#667eea',
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography color="textSecondary" sx={{ mb: 3, flex: 1 }}>
                    {service.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {service.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: '#667eea',
                          color: '#667eea',
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 8,
            textAlign: 'center',
            py: 6,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isArabic ? 'هل تريد معرفة المزيد؟' : 'Want to Learn More?'}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            {isArabic ? 'اطلب استشارة مجانية' : 'Request a Free Consultation'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
