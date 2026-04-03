import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryDropdownProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
  allLabel: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategory,
  onSelect,
  allLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-full md:w-64 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold tracking-widest uppercase text-slate-900 hover:border-orange-500 transition-all focus:outline-none"
        >
          <span className="truncate">
            {selectedCategory || allLabel}
          </span>
          <ChevronDown
            className={`ml-2 h-5 w-5 text-orange-500 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-full md:w-64 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-gray-50"
          >
            <div className="py-2 max-h-64 overflow-y-auto">
              <button
                onClick={() => {
                  onSelect(null);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-6 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                  selectedCategory === null
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{allLabel}</span>
                {selectedCategory === null && <Check size={16} />}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onSelect(category);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-6 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate">{category}</span>
                  {selectedCategory === category && <Check size={16} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropdown;
