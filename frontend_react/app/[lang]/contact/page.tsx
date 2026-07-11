'use client';

import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ContactPageProps {
  params: {
    lang: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { lang } = params;
  const [mounted, setMounted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isArabic = lang === 'ar';

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you. Get in touch with our team.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
      },
      info: {
        address: 'Address',
        addressValue: '123 Business Street, Tech City, TC 12345',
        phone: 'Phone',
        phoneValue: '+1 (555) 123-4567',
        email: 'Email',
        emailValue: 'hello@prokeys.com',
        hours: 'Business Hours',
        hoursValue: 'Mon - Fri: 9:00 AM - 6:00 PM',
      },
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'نود أن نسمع منك. تواصل مع فريقنا.',
      form: {
        name: 'الاسم الكامل',
        email: 'عنوان البريد الإلكتروني',
        phone: 'رقم الهاتف',
        message: 'الرسالة',
        submit: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
      },
      info: {
        address: 'العنوان',
        addressValue: '123 شارع الأعمال، مدينة التكنولوجيا، TC 12345',
        phone: 'الهاتف',
        phoneValue: '+1 (555) 123-4567',
        email: 'البريد الإلكتروني',
        emailValue: 'hello@prokeys.com',
        hours: 'ساعات العمل',
        hoursValue: 'الإثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً',
      },
    },
  };

  const currentContent = content[isArabic ? 'ar' : 'en'];

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      toast.loading('Sending message...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success(isArabic ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!');
      reset();
    } catch (error) {
      toast.error(isArabic ? 'حدث خطأ أثناء الإرسال' : 'Error sending message');
    }
  };

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
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label={currentContent.form.name}
                      {...register('name', { required: true })}
                      error={!!errors.name}
                      variant="outlined"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />

                    <TextField
                      fullWidth
                      label={currentContent.form.email}
                      type="email"
                      {...register('email', { required: true })}
                      error={!!errors.email}
                      variant="outlined"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />

                    <TextField
                      fullWidth
                      label={currentContent.form.phone}
                      {...register('phone', { required: true })}
                      error={!!errors.phone}
                      variant="outlined"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />

                    <TextField
                      fullWidth
                      label={currentContent.form.message}
                      multiline
                      rows={5}
                      {...register('message', { required: true })}
                      error={!!errors.message}
                      variant="outlined"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        py: 1.5,
                      }}
                    >
                      {currentContent.form.submit}
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#667eea' }}>
                    {currentContent.info.address}
                  </Typography>
                  <Typography color="textSecondary">{currentContent.info.addressValue}</Typography>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#667eea' }}>
                    {currentContent.info.phone}
                  </Typography>
                  <Typography color="textSecondary">{currentContent.info.phoneValue}</Typography>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#667eea' }}>
                    {currentContent.info.email}
                  </Typography>
                  <Typography color="textSecondary">{currentContent.info.emailValue}</Typography>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#667eea' }}>
                    {currentContent.info.hours}
                  </Typography>
                  <Typography color="textSecondary">{currentContent.info.hoursValue}</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
