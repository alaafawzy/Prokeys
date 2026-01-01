import React from 'react';

/**
 * Reusable CTA Button Component
 * @param {string} label - Button text/label
 * @param {function} onClick - Click handler function
 * @param {string} primaryColor - Primary button color (default: #00bcd4)
 * @param {string} hoverColor - Hover button color (default: #00acc1)
 * @param {object} sx - Additional Material-UI sx styling
 * @param {string} className - Additional CSS class names
 */
export default function CTAButton({
  label,
  onClick,
  primaryColor = '#00bcd4',
  hoverColor = '#00acc1',
  sx = {},
  className = '',
  ...props
}) {
  const baseStyles = {
    backgroundColor: primaryColor,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 12px ${primaryColor}4d`,
    ...sx
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = hoverColor;
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = `0 6px 16px ${hoverColor}66`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = primaryColor;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}4d`;
  };

  return (
    <button
      onClick={onClick}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {label}
    </button>
  );
}
