import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { COLORS, CATEGORIES } from '../../constants/calendar';

interface FormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  category: string;
}

interface CalendarModalProps {
  showModal: boolean;
  editingEvent: any;
  formData: FormData;
  darkMode: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: Partial<FormData>) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  showModal,
  editingEvent,
  formData,
  darkMode,
  onClose,
  onSubmit,
  onFormDataChange
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [showModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showModal, onClose]);

  if (!showModal) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${darkMode ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className={`w-full max-w-md max-h-[90vh] rounded-lg shadow-2xl animate-fade-in overflow-hidden flex flex-col ${darkMode ? 'bg-gray-850 border border-gray-700' : 'bg-white border border-gray-200'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h3>
            <button 
              onClick={onClose} 
              className={`p-1 rounded-md transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-4 space-y-3 overflow-y-auto flex-1">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onFormDataChange({ title: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
              placeholder="Team Meeting"
              required
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormDataChange({ description: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
              rows={2}
              placeholder="Discuss project updates..."
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => onFormDataChange({ date: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Start Time *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => onFormDataChange({ startTime: e.target.value })}
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                End Time *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => onFormDataChange({ endTime: e.target.value })}
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.slice(1).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onFormDataChange({ category: cat })}
                  className={`px-3 py-1.5 rounded-md text-xs capitalize transition-all
                    ${formData.category === cat 
                      ? `${darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-900 text-white'}` 
                      : `${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onFormDataChange({ color })}
                  className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${formData.color === color ? 'ring-2 ring-offset-2' : 'ring-1'} ${darkMode ? formData.color === color ? 'ring-gray-400 ring-offset-gray-850' : 'ring-gray-700' : formData.color === color ? 'ring-gray-600 ring-offset-white' : 'ring-gray-300'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t flex-shrink-0" style={{ borderColor: darkMode ? '#374151' : '#E5E7EB' }}>
            <button
              type="submit"
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
            >
              {editingEvent ? 'Update' : 'Add Event'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarModal;
