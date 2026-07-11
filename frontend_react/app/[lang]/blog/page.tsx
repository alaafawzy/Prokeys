'use client';

import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface BlogPageProps {
  params: {
    lang: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { lang } = params;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isArabic = lang === 'ar';

  const content = {
    en: {
      title: 'Our Blog',
      subtitle: 'Insights and Updates from Our Team',
      posts: [
        {
          id: 1,
          title: 'Getting Started with Next.js 14',
          excerpt: 'Learn the basics of Next.js 14 and how to set up your first project...',
          date: 'March 15, 2024',
          author: 'John Doe',
          category: 'Tutorial',
          readTime: '5 min read',
        },
        {
          id: 2,
          title: 'Best Practices for Web Development',
          excerpt: 'Discover the essential practices that every web developer should follow...',
          date: 'March 10, 2024',
          author: 'Jane Smith',
          category: 'Development',
          readTime: '8 min read',
        },
        {
          id: 3,
          title: 'The Future of AI in Business',
          excerpt: 'Explore how artificial intelligence is transforming businesses today...',
          date: 'March 5, 2024',
          author: 'Mike Johnson',
          category: 'Technology',
          readTime: '6 min read',
        },
        {
          id: 4,
          title: 'Design Trends 2024',
          excerpt: 'Stay updated with the latest design trends shaping the industry...',
          date: 'February 28, 2024',
          author: 'Sarah Wilson',
          category: 'Design',
          readTime: '7 min read',
        },
        {
          id: 5,
          title: 'TypeScript Best Practices',
          excerpt: 'Master TypeScript and write more type-safe applications...',
          date: 'February 20, 2024',
          author: 'John Doe',
          category: 'Tutorial',
          readTime: '9 min read',
        },
        {
          id: 6,
          title: 'Remote Work Culture',
          excerpt: 'Building a successful remote team and maintaining productivity...',
          date: 'February 15, 2024',
          author: 'Emily Brown',
          category: 'Lifestyle',
          readTime: '6 min read',
        },
      ],
    },
    ar: {
      title: 'مدونتنا',
      subtitle: 'رؤى وتحديثات من فريقنا',
      posts: [
        {
          id: 1,
          title: 'البدء مع Next.js 14',
          excerpt: 'تعرف على أساسيات Next.js 14 وكيفية إعداد مشروعك الأول...',
          date: '15 مارس 2024',
          author: 'جون دو',
          category: 'دليل',
          readTime: '5 دقائق',
        },
        {
          id: 2,
          title: 'أفضل الممارسات لتطوير الويب',
          excerpt: 'اكتشف الممارسات الأساسية التي يجب على كل مطور ويب اتباعها...',
          date: '10 مارس 2024',
          author: 'جين سميث',
          category: 'التطوير',
          readTime: '8 دقائق',
        },
        {
          id: 3,
          title: 'مستقبل الذكاء الاصطناعي في الأعمال',
          excerpt: 'استكشف كيف يحول الذكاء الاصطناعي الأعمال اليوم...',
          date: '5 مارس 2024',
          author: 'مايك جونسون',
          category: 'التكنولوجيا',
          readTime: '6 دقائق',
        },
        {
          id: 4,
          title: 'اتجاهات التصميم 2024',
          excerpt: 'ابق محدثاً مع أحدث اتجاهات التصميم التي تشكل الصناعة...',
          date: '28 فبراير 2024',
          author: 'سارة ويلسون',
          category: 'التصميم',
          readTime: '7 دقائق',
        },
        {
          id: 5,
          title: 'أفضل ممارسات TypeScript',
          excerpt: 'أتقن TypeScript واكتب تطبيقات أكثر أماناً من الناحية النوعية...',
          date: '20 فبراير 2024',
          author: 'جون دو',
          category: 'دليل',
          readTime: '9 دقائق',
        },
        {
          id: 6,
          title: 'ثقافة العمل عن بعد',
          excerpt: 'بناء فريق عمل عن بعد ناجح والحفاظ على الإنتاجية...',
          date: '15 فبراير 2024',
          author: 'إميلي براون',
          category: 'أسلوب حياة',
          readTime: '6 دقائق',
        },
      ],
    },
  };

  const currentContent = content[isArabic ? 'ar' : 'en'];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Tutorial': '#667eea',
      'دليل': '#667eea',
      'Development': '#764ba2',
      'التطوير': '#764ba2',
      'Technology': '#5dd5e0',
      'التكنولوجيا': '#5dd5e0',
      'Design': '#f093fb',
      'التصميم': '#f093fb',
      'Lifestyle': '#4facfe',
      'أسلوب حياة': '#4facfe',
    };
    return colors[category] || '#667eea';
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
          {currentContent.posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
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
                {/* Placeholder Image */}
                <Box
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, ${getCategoryColor(post.category)} 0%, rgba(118, 75, 162, 0.5) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {post.category}
                  </Typography>
                </Box>

                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      minHeight: '50px',
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography color="textSecondary" sx={{ mb: 2, flex: 1 }}>
                    {post.excerpt}
                  </Typography>

                  {/* Meta Information */}
                  <Stack spacing={1} sx={{ mb: 2, fontSize: '0.85rem', color: 'textSecondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon size={16} />
                      <Typography variant="caption">{post.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <UserIcon size={16} />
                      <Typography variant="caption">{post.author}</Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={post.readTime}
                      size="small"
                      sx={{
                        backgroundColor: `${getCategoryColor(post.category)}20`,
                        color: getCategoryColor(post.category),
                      }}
                    />
                    <Button size="small" sx={{ color: '#667eea' }}>
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
