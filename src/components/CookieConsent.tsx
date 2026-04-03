import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay the display of the component
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000); // 8 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-3xl shadow-2xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-opacity-95">
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="p-3 bg-orange-500 rounded-2xl hidden md:block">
                <Cookie size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center justify-center md:justify-start gap-2">
                  <Cookie size={20} className="md:hidden text-orange-500" />
                  {t('cookies.title')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('cookies.message')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20"
              >
                {t('cookies.accept')}
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="hidden md:block text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
