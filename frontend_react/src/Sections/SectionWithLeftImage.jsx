import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from "@emotion/react";
export default function SectionWithLeftImage({ data ,imageOnRight=false}) {
    const theme = useTheme();
  
  imageOnRight=theme.direction=='rtl'?(!imageOnRight):(imageOnRight)
  const lang=theme.direction=='rtl'?'rtl':'ltr';
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      // direction: theme.direction=='rtl'?'rtl':'ltr',
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
          order: lang=="ltr" ? 2 : 1
        }}>
          <img
            src={data?.image}
            alt="Business meeting"
            style={{
              width: '90%',
              height: 'auto',
            }}
          />
        </div>

        {/* Right Side - Content */}
        <div style={{
          // order: imageOnRight ? 1 : 2,
          textAlign: lang=='rtl'?'right':'left'
        }}>
          <div dangerouslySetInnerHTML={{ __html: theme.direction === "rtl" ? data?.arabic_content : data?.english_content }} />

        </div>
      </div>
    </div>
  );
}