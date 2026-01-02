import React, { useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import imge from "../assets/bundlesection.png";
import api from '../../Api';

export default function DescriptionSection({ }) {
    const theme = useTheme();
    const isRTL = theme.direction=='rtl'? false :true;
    const [descriptionData, setDescriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        try {
          const response = await api.get('/bundle/description-section/'); // Adjust endpoint as needed
          if (Array.isArray(response.data)) {
            setDescriptionData(response.data[0]);
          } else {
            // Set data to an empty array if the response is not an array
            setDescriptionData([]);
          }
          // setBundles(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    }

    // Use fetched data or fallback to defaults
    const title = 
         (isRTL ? descriptionData?.english_title : descriptionData?.arabic_title)
        // : (isRTL ? 'Our Accounting Bundles' : 'باقاتنا المحاسبية');
    
    const description = descriptionData
        ? (isRTL ? descriptionData?.english_description : descriptionData?.arabic_description)
        : (isRTL
            ? 'Discover our tailored accounting bundles designed to meet the unique needs of your business. Whether you are a startup, a growing enterprise, or an established company, we have the perfect solution for you. Our bundles offer a comprehensive range of services including bookkeeping, tax preparation, financial reporting, and more. Each package is crafted to provide maximum value and efficiency, ensuring that your financial operations run smoothly and effectively.'
            : 'اكتشف باقاتنا المحاسبية المصممة لتلبية الاحتياجات الفريدة لعملك. سواء كنت شركة ناشئة، أو مؤسسة نامية، أو شركة راسخة، لدينا الحل المثالي لك. تقدم باقاتنا مجموعة شاملة من الخدمات بما في ذلك مسك الدفاتر، إعداد الضرائب، التقارير المالية، والمزيد. تم تصميم كل حزمة لتوفير أقصى قيمة وكفاءة، مما يضمن أن عملياتك المالية تسير بسلاسة وفعالية.');

    const imageUrl = descriptionData?.image || imge;
    const altText = descriptionData?.image_alt_text || 'Professional';

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      // direction: isRTL ? 'ltr' : 'rtl',
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
        {title}
      </h2>

      {/* Content Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left Side - Circular Image */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: isMobile ? 1 : (isRTL ? 2 : 1)
        }}>
          <div style={{
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            maxWidth: '100%',
            width: isMobile ? 'min(350px, 100%)' : '350px',
            height: isMobile ? 'min(350px, 100%)' : '350px'
          }}>
            <img
              src={imageUrl}
              alt={altText}
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
          position: 'relative',
          order: isMobile ? 2 : (isRTL ? 1 : 2)
        }}>
          <p style={{
            fontSize: '1.35rem',
            color: '#333',
            lineHeight: 1.8,
            marginBottom: '2rem',
            textAlign: isRTL ? 'left' : 'right'
          }}>
            {description}
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