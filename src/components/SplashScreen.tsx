import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col items-center justify-center animate-fade-in" style={{ gap: '1.5rem' }}>
        {/* Logo - perfectly centered */}
        <div className="flex justify-center items-center w-full">
          <Logo size="lg" className="animate-pulse mx-auto" />
        </div>
        
        {/* Planora Title - perfectly centered */}
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent text-center">
          Planora
        </h1>
        
        {/* Tagline - perfectly centered */}
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center">
          Manage your schedule efficiently
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

