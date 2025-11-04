import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" opacity="0.1"/>
      
      {/* Calendar grid pattern background */}
      <g opacity="0.2">
        <rect x="12" y="16" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
        <rect x="22" y="16" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
        <rect x="32" y="16" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
        <rect x="12" y="26" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
        <rect x="22" y="26" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
        <rect x="32" y="26" width="8" height="8" rx="1" fill="url(#logoGradient)"/>
      </g>
      
      {/* Stylized "P" letter */}
      <path 
        d="M 20 14 L 20 38 L 24 38 L 24 30 L 32 30 L 36 26 L 36 18 L 24 18 L 24 22 L 28 22 L 28 26 L 24 26 L 24 14 Z" 
        fill="url(#logoGradient)"
      />
      
      {/* Calendar ring accent */}
      <circle 
        cx="32" 
        cy="32" 
        r="28" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.3"
      />
    </svg>
  );
};

export default Logo;

