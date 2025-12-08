import React from 'react';
import { useTheme } from "@emotion/react";
export default function DescriptionSection({ }) {
    const theme = useTheme();
  const isRTL = theme.direction=='rtl'? false :true;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      direction: isRTL ? 'rtl' : 'ltr',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Title */}
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        اختر باقتك المثالية
      </h2>

      {/* Content Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left Side - Circular Image */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              alt="Professional"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div style={{
          position: 'relative'
        }}>
          <p style={{
            fontSize: '1.35rem',
            color: '#333',
            lineHeight: 1.8,
            marginBottom: '2rem',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            باقاتنا المحاسبية مصممة خصيصًا لتلبية احتياجات
            شركتك بدقة وفعالية، لتسهيل إدارة الجوانب المالية
            بطريقة متكاملة ومتخصصة
          </p>

          {/* CTA Button */}
          {/* <button
            style={{
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0,188,212,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              position: 'absolute',
              bottom: '-20px',
              left: isRTL ? 'auto' : '0',
              right: isRTL ? '0' : 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00acc1';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,188,212,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00bcd4';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,188,212,0.4)';
            }}
          >
            <span style={{ fontSize: '0.95rem' }}>احجز</span>
            <span style={{ fontSize: '0.95rem' }}>جلستك الآن</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}