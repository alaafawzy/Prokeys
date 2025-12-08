import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from "@emotion/react";
const testimonials = [
  {
    id: 1,
    name: 'نايف شاولي',
    subtitle: 'TRI FITNESS BOX',
    rating: 5,
    text: 'احترافية الفصل وجودة عملاء ممتازة وسريعة الاستجابة وتفاوض مناسب وسعر صحيح',
    date: '2025.03.02',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
  },
  {
    id: 2,
    name: 'نايف شاولي',
    subtitle: 'TRI FITNESS BOX',
    rating: 5,
    text: 'احترافية الفصل وجودة عملاء ممتازة وسريعة الاستجابة وتفاوض مناسب وسعر صحيح',
    date: '2025.03.02',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
  },
  {
    id: 3,
    name: 'نايف شاولي',
    subtitle: 'TRI FITNESS BOX',
    rating: 5,
    text: 'احترافية الفصل وجودة عملاء ممتازة وسريعة',
    date: '2025.03.02',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };
const theme = useTheme();
  return (
    <div style={{
      // maxWidth: '1200px',
      margin: '0 auto',
      
      padding: '2rem',
      // direction: 'rtl',
      fontFamily: 'Open sans'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative'
      }}>
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <ChevronLeft size={32} color="#333" />
        </button>
        {/* Testimonials Container */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          overflow: 'hidden',
          flex: 1
        }}>
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{
                flex: '0 0 calc(45% - 0.67rem)',
                backgroundColor: index === 1 ? 'white' : '#2c3e7d',
                color: index === 1 ? '#000000' : 'white',
                border: index === 1 ? '2px solid #2c3e7d' : 'none',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                textAlign: 'end',
                transition: 'all 0.3s ease',
                minHeight: '220px'
              }}
            >
              {/* Avatar */}
              {/* <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  marginBottom: '0.5rem',
                  border: `3px solid ${index === 1 ? 'white' : '#2c3e7d'}`
                }}
              /> */}

              {/* Name */}
              <h3 style={{
                fontWeight: '600',
                marginBottom: '0.25rem',
                fontSize: '1.5rem',
                margin: '0 0 0.25rem 0'
              }}>
                {testimonial.name}
              </h3>

              {/* Subtitle */}
              <p style={{
                marginBottom: '1rem',
                opacity: 0.8,
                fontSize: '0.8rem',
                margin: '0 0 1rem 0',
                fontWeight:"600",
                color:"#B9B9B9"
              }}>
                {testimonial.subtitle}
              </p>

              {/* Stars */}
              <div style={{
                display: 'flex',
                gap: '0.20rem',
                marginTop:"-10px",
                marginBottom: '1rem'
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#FFD700"
                    color="#FFD700"
                  />
                ))}
              </div>

              {/* Text */}
              <p style={{
                marginBottom: '1rem',
                lineHeight: 1.6,
                fontSize: '1.1rem',
                margin: '0 0 1rem 0',
                fontWeight:"500",
                fontFamily:"Cairo",
              }}>
                {testimonial.text}
              </p>

              {/* Date */}
              <p style={{
                marginTop: 'auto',
                opacity: 0.7,
                fontSize: '0.75rem',
                margin: 'auto 0 0 0'
              }}>
                {testimonial.date}
              </p>
            </div>
          ))}
        </div>

        
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <ChevronRight size={32} color="#333" />
        </button>

      </div>

      {/* Dots Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1.5rem'
      }}>
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#2c3e7d' : '#d0d0d0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}