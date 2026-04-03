import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-xl text-orange-500 font-medium mb-6 italic">
            {t('about.mission')}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {t('about.description')}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-bold">01</div>
              <p className="text-gray-900 font-medium">{t('about.features.01')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-bold">02</div>
              <p className="text-gray-900 font-medium">{t('about.features.02')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-bold">03</div>
              <p className="text-gray-900 font-medium">{t('about.features.03')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1000"
              alt="Lisbon Streets"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
            <p className="text-4xl font-bold text-orange-500 mb-1">100%</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t('about.stats.authentic')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
