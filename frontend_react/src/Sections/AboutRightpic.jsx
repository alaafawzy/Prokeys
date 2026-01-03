import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from "@emotion/react";
import { useNavigate } from 'react-router-dom';
import { getAltText } from '../utils/getAltText';
export default function SkillsImprovementSection({ data ,imageOnRight=false}) {
    const theme = useTheme();
    const navigate = useNavigate();
  const benefits = [
    'ورش عمل تفاعلية في المحاسبة والإدارة المالية',
    'دورات تدريبية معتمدة في الأنظمة المحاسبية الحديثة',
    'استشارات إدارية لتحسين الأداء المؤسسي',
    'برامج تطوير المهارات القيادية',
    'تدريب على أفضل الممارسات العالمية',
    'شهادات معتمدة دوليًا'
  ];
  imageOnRight=theme.direction=='rtl'?(!imageOnRight):(imageOnRight)
  const lang=theme.direction=='rtl'?'rtl':'ltr';
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      direction: theme.direction=='rtl'?'rtl':'ltr',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className='about-section'>
        {/* Left Side - Image */}
        <div className='change-the-direction' style={{
          // order: imageOnRight ? 2 : 1
        }}>
          <img
            src={data?.section_image}
            alt={getAltText(data, theme.direction === 'rtl', data?.english_title)}
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
          textAlign: lang=='rtl'?'right':'left'
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

          {/* Description */}
                <div 
                style={{
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: 1.8,
                  marginBottom: '2rem'
                }}
                dangerouslySetInnerHTML={{ __html: data?.description }}
                />
                
          
          {/* CTA Button */}
          <button
            onClick={() => navigate('/ContactUs')}
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