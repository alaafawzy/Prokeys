'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

interface AboutPageProps {
  params: {
    lang: string;
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const { lang } = params;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isArabic = lang === 'ar';

  const content = {
    en: {
      title: 'About Prokeys',
      subtitle: 'Delivering Excellence in Professional Services',
      mission: 'Our Mission',
      missionText:
        'To provide world-class professional services that empower businesses and individuals to achieve their goals.',
      vision: 'Our Vision',
      visionText:
        'To be the leading provider of innovative solutions and trusted partner in the industry.',
      values: 'Our Values',
      valuesList: [
        { title: 'Integrity', desc: 'We maintain the highest standards of honesty and transparency' },
        { title: 'Excellence', desc: 'We strive for continuous improvement and quality' },
        { title: 'Innovation', desc: 'We embrace change and seek creative solutions' },
        { title: 'Client Focus', desc: 'We prioritize client satisfaction above all' },
      ],
    },
    ar: {
      title: 'عن بروكيز',
      subtitle: 'تقديم التميز في الخدمات الاحترافية',
      mission: 'مهمتنا',
      missionText: 'توفير خدمات احترافية عالمية المستوى تمكن الشركات والأفراد من تحقيق أهدافهم.',
      vision: 'رؤيتنا',
      visionText: 'أن نكون المزود الرائد للحلول المبتكرة والشريك الموثوق به في الصناعة.',
      values: 'قيمنا',
      valuesList: [
        { title: 'النزاهة', desc: 'نحافظ على أعلى معايير الصدق والشفافية' },
        { title: 'التميز', desc: 'نسعى للتحسين المستمر والجودة' },
        { title: 'الابتكار', desc: 'نحتضن التغيير ونبحث عن حلول إبداعية' },
        { title: 'التركيز على العميل', desc: 'نعطي الأولوية لرضا العميل فوق كل شيء' },
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
        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {currentContent.mission}
                </Typography>
                <Typography color="textSecondary">{currentContent.missionText}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {currentContent.vision}
                </Typography>
                <Typography color="textSecondary">{currentContent.visionText}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textAlign: isArabic ? 'right' : 'left',
            }}
          >
            {currentContent.values}
          </Typography>

          <Grid container spacing={3}>
            {currentContent.valuesList.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#667eea' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {value.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isArabic ? 'هل أنت مهتم بعملنا؟' : 'Interested in Working with Us?'}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            {isArabic ? 'تواصل معنا' : 'Get in Touch'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
