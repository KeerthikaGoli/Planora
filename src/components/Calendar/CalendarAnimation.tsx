import React from 'react';

interface CalendarAnimationProps {
  darkMode: boolean;
}

const CalendarAnimation: React.FC<CalendarAnimationProps> = ({ darkMode }) => {
  return (
    <div className={`relative w-full overflow-hidden transition-opacity duration-300 ${darkMode ? 'bg-gray-850' : 'bg-gray-50'}`} style={{ minHeight: '180px', maxHeight: '250px' }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="calendar-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="currentColor" className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                <animate attributeName="r" values="1.5;3;1.5" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#calendar-pattern)" />
        </svg>
      </div>

      {/* Floating calendar icons */}
      <div className="absolute inset-0 flex items-center justify-center py-8">
        {/* Main calendar icon */}
        <div className="relative z-10">
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} opacity-40`}
            style={{ 
              animation: 'float-main 4s ease-in-out infinite',
            }}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="14" r="0.8" fill="currentColor" />
            <circle cx="15" cy="14" r="0.8" fill="currentColor" />
            <circle cx="9" cy="18" r="0.8" fill="currentColor" />
            <circle cx="15" cy="18" r="0.8" fill="currentColor" />
          </svg>
        </div>

        {/* Floating date numbers */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => {
          const angle = (index * 45) * (Math.PI / 180);
          const radius = 70;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={num}
              className={`absolute text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-600' : 'text-gray-300'} opacity-25`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `float 5s ease-in-out infinite`,
                animationDelay: `${index * 0.25}s`
              }}
            >
              {num}
            </div>
          );
        })}

        {/* Floating decorative elements */}
        {[...Array(12)].map((_, index) => {
          const angle = (index * 30) * (Math.PI / 180);
          const radius = 110;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={index}
              className={`absolute w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} opacity-15`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 4s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          );
        })}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-main {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) scale(1.05);
            opacity: 0.5;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-15px) scale(1.1);
            opacity: 0.35;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0.3;
          }
        }
      `}</style>

      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${
          darkMode 
            ? 'bg-gradient-to-t from-gray-850 via-transparent to-gray-850' 
            : 'bg-gradient-to-t from-gray-50 via-transparent to-gray-50'
        }`}
      />
    </div>
  );
};

export default CalendarAnimation;

