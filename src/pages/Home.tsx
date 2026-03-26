import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import seePlaces from '../data/see.json';
import eatPlaces from '../data/eat.json';
import PlaceCard from '../components/PlaceCard';

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  // Show only first 3 places from 'see' as preview
  const previewPlaces = seePlaces.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="../src/assets/images/desktop/lisbon-guide-torre-belem-1.avif"
            alt="Lisbon View"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter"
          >
            {t('home.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 font-light italic"
          >
            {t('home.hero_subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/explore"
              className="inline-block px-10 py-4 bg-orange-600 text-white text-lg font-medium rounded-full hover:bg-orange-700 transition-all hover:scale-105 shadow-xl"
            >
              {t('home.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('explore.title')}
          </h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              id={place.id}
              title={place.title[currentLang as keyof typeof place.title]}
              shortDescription={place.shortDescription[currentLang as keyof typeof place.shortDescription]}
              image={place.image}
              category={place.category[currentLang as keyof typeof place.category]}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/explore"
            className="text-orange-600 font-bold hover:underline underline-offset-8"
          >
            {t('home.cta')} →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
