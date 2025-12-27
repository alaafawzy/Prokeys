import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from "@emotion/react";
export default function SectionsWithLeftPic({ data ,imageOnRight=true}) {
    const theme = useTheme();
  const benefits = [
    'ورش عمل تفاعلية في المحاسبة والإدارة المالية',
    'دورات تدريبية معتمدة في الأنظمة المحاسبية الحديثة',
    'استشارات إدارية لتحسين الأداء المؤسسي',
    'برامج تطوير المهارات القيادية',
    'تدريب على أفضل الممارسات العالمية',
    'شهادات معتمدة دوليًا'
  ];
  // const lang=theme.direction=='rtl'?'rtl':'ltr';
  // const rol=
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      direction: theme.direction=='rtl'?'rtl':'ltr',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        // order: imageOnRight ? 2 : 1
      }}>
        {/* Left Side - Image */}
        <div style={{
          // order: imageOnRight ? 2 : 1
        }}>
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop"
            alt="Business meeting"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Right Side - Content */}
        <div style={{
          // order: imageOnRight ? 1 : 2,
          // textAlign: lang=='rtl'?'right':'left'
        }}>
          {/* Title */}
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1a237e',
            marginBottom: '1rem',
            lineHeight: 1.3
          }}>
            {data?.title}
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.25rem',
            color: '#333',
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            {data?.subtitle}
          </p>

          {/* Description */}
          <p style={{
            fontSize: '1rem',
            color: '#666',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            {data?.description}
          </p>

          {/* Benefits List */}
          <div style={{
            marginBottom: '2.5rem'
          }}>
            {data?.benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#1a237e',
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '1rem',
                  color: '#333',
                  lineHeight: 1.6
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            style={{
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,188,212,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00acc1';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,188,212,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00bcd4';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,188,212,0.3)';
            }}
          >
            {theme.direction=='rtl'?'احجز جلستك المجانية':'Book Your Free Session'}
          </button>
        </div>
      </div>
    </div>
  );
}