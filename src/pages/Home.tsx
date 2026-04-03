import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Star, Camera, Quote } from 'lucide-react';
import seePlaces from '../data/lisbon/see.json';
import eatPlaces from '../data/lisbon/eat.json';
import reviews from '../data/lisbon/reviews.json';
import PlaceCard from '../components/PlaceCard';

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);
  const [currentHeroImage, setCurrentHeroImage] = React.useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1548705085-101177834f47?auto=format&fit=crop&q=80&w=2000"
  ];

  // Show only first 3 places from 'see' as preview
  const previewPlaces = seePlaces.slice(0, 3);
  const currentReview = reviews[currentReviewIndex];

  React.useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => {
      clearInterval(reviewTimer);
      clearInterval(heroTimer);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroImage}
              src={heroImages[currentHeroImage]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              alt="Lisbon View"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
          {/* Fog Effect */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        </motion.div>

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
              className="inline-block px-10 py-4 bg-orange-500 text-white text-lg font-medium rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              {t('home.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              {t('home.welcome_title')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-xl">
              {t('home.welcome_description')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Star size={24} fill="currentColor" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('home.feature_top_rated')}</h3>
                <p className="text-gray-500 text-sm">{t('home.feature_top_rated_desc')}</p>
              </div>
              
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Camera size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('home.feature_photogenic')}</h3>
                <p className="text-gray-500 text-sm">{t('home.feature_photogenic_desc')}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1548705085-101177834f47?auto=format&fit=crop&q=80&w=1000" 
                alt="Lisbon View" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-orange-500 p-8 rounded-3xl shadow-2xl text-white"
            >
              <p className="text-4xl font-black mb-1">{t('home.sunny_days')}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-90">{t('home.sunny_days_label')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('explore.title')}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
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
            className="text-orange-500 font-bold hover:underline underline-offset-8"
          >
            {t('home.cta')} →
          </Link>
        </div>
      </section>
      {/* Reviews Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {t('home.reviews_title')}
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="relative max-w-2xl mx-auto h-[350px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white p-8 md:p-12 rounded-[32px] shadow-xl shadow-slate-200/50 flex flex-col justify-center"
              >
                <div className="absolute -top-4 right-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Quote size={24} fill="currentColor" />
                </div>
                
                <div className="flex items-center space-x-6 mb-8">
                  <img 
                    src={currentReview.image} 
                    alt={currentReview.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-100 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{currentReview.name}</h4>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                      {currentReview.city[currentLang as keyof typeof currentReview.city]}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < currentReview.rating ? "text-orange-500 fill-orange-500" : "text-gray-200"} 
                    />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-600 italic leading-relaxed">
                  "{currentReview.review[currentLang as keyof typeof currentReview.review]}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-12">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentReviewIndex === index ? 'bg-orange-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
