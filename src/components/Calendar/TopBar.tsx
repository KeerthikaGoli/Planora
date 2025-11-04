import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Menu, Sun, Moon } from 'lucide-react';
import { MONTH_NAMES, CATEGORIES } from '../../constants/calendar';

interface TopBarProps {
  darkMode: boolean;
  currentDate: Date;
  today: Date;
  searchQuery: string;
  selectedCategory: string;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  onAddEvent: () => void;
  onNavigateMonth: (direction: number) => void;
  onGoToToday: () => void;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  darkMode,
  currentDate,
  today,
  searchQuery,
  selectedCategory,
  onToggleSidebar,
  onToggleDarkMode,
  onAddEvent,
  onNavigateMonth,
  onGoToToday,
  onSearchChange,
  onCategoryChange
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <div className={`app-panel elevated border border-app border-t-0 -mt-px mb-4 md:mb-6 overflow-visible`}>
      <div className={`p-2 md:p-6 bg-gray-900 text-white`}>
        {/* Mobile compact header: icons only */}
        <div className="md:hidden flex items-center justify-between mb-2">
          <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-800/40 rounded-lg transition" title="Menu">
            <Menu className="w-6 h-6 text-gray-200" />
          </button>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="p-2 hover:bg-gray-800/40 rounded-lg transition" title="Search">
              <Search className="w-5 h-5 text-gray-200" />
            </button>
            <button onClick={onToggleDarkMode} className="p-2 hover:bg-gray-800/40 rounded-lg transition" title="Theme">
              {darkMode ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onAddEvent} className="p-2 btn-accent rounded-lg transition-all duration-200 flex items-center justify-center elevated" title="Add Event">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showMobileSearch && (
          <div className="md:hidden mb-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-accent/80" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 rounded-lg transition-all border text-sm ${darkMode ? 'bg-gray-700 text-accent placeholder-accent/50 border-gray-700' : 'bg-white/90 text-gray-800 placeholder-gray-500 border-gray-200'}`}
              />
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-800/40 rounded-lg transition">
                <Menu className="w-6 h-6 text-gray-200" />
              </button>
              <div>
                <h1 className={`text-white text-2xl md:text-3xl font-semibold`}>Planora</h1>
                <p className="text-xs md:text-sm opacity-80 mt-1 text-gray-200">Manage your schedule efficiently</p>
              </div>
            </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 hover:bg-gray-800/40 rounded-lg transition-all duration-200"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={onAddEvent}
              className="px-3 py-1.5 md:px-4 md:py-2 btn-accent rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2 elevated">
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          <div className="hidden md:block flex-1 min-w-56 md:min-w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-accent/80" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 md:py-2.5 rounded-lg transition-all border text-sm md:text-base ${darkMode ? 'bg-gray-700 text-accent placeholder-accent/50 border-gray-700' : 'bg-white/90 text-gray-800 placeholder-gray-500 border-gray-200'}`}
            />
          </div>
          
          {/* Desktop: category chips */}
          <div className="hidden md:flex gap-1.5 md:gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm font-semibold transition-all duration-200 capitalize elevated border 
                  ${selectedCategory === cat 
                    ? 'btn-accent border-accent ring-accent' 
                    : `${darkMode ? 'bg-gray-800/60 text-gray-200 hover:bg-gray-700 border-app' : 'bg-white text-gray-700 hover:bg-gray-50 border-app'}`}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile: category select */}
          <div className="flex md:hidden w-full sm:w-auto relative z-10">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={`w-auto max-w-[180px] px-3 py-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className={`p-4 md:p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigateMonth(-1)}
            className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          <div className="text-center">
            <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={onGoToToday}
              className={`text-sm mt-1 transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-300 hover:text-gray-200'}`}
            >
              Go to Today
            </button>
          </div>
          
          <button
            onClick={() => onNavigateMonth(1)}
            className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronRight className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
