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
  today: _today,
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
    <div className={`app-panel elevated border border-app border-t-0 -mt-px mb-2 md:mb-6 overflow-visible`}>
      <div className={`p-2 md:p-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white`}>
        {/* Mobile header with Planora heading */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-800/40 rounded-lg transition" title="Menu">
                <Menu className="w-6 h-6 text-gray-200" />
              </button>
              <div>
                <h1 className={`text-xl font-semibold ${darkMode ? 'planora-gradient' : 'text-white'}`}>Planora</h1>
              </div>
            </div>
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
          
          {/* Mobile: category buttons centered in header */}
          <div className="flex md:hidden justify-center gap-1.5 mb-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 capitalize border 
                  ${selectedCategory === cat 
                    ? 'btn-accent border-accent' 
                    : 'bg-gray-800/60 text-gray-200 hover:bg-gray-700 border-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {showMobileSearch && (
          <div className="md:hidden mb-2">
            <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-white' : 'text-black'}`} />
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-white' : 'text-black'}`} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 rounded-lg transition-all border text-sm ${darkMode ? 'bg-gray-700 text-white placeholder-white/70 border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30' : 'bg-white text-black placeholder-black border-gray-200'}`}
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
                <h1 className={`text-2xl md:text-3xl font-semibold ${darkMode ? 'planora-gradient' : 'text-white'}`}>Planora</h1>
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
          <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-white' : 'text-gray-700'}`}/>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 md:py-2.5 rounded-lg transition-all border text-sm md:text-base ${darkMode ? 'bg-gray-700 text-white placeholder-white/70 border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30' : 'bg-white/90 text-gray-800 placeholder-gray-500 border-gray-200'}`}
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
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className={`p-3 md:p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
              className={`text-sm mt-1 transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-black-300 hover:text-gray-200'}`}
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
