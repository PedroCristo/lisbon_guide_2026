import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Star, Camera } from "lucide-react";

import ReviewsCarousel from "../components/ReviewsCarousel";
import PreviewPlaces from "../components/PreviewPlaces";

import hero1 from "../assets/images/desktop/lisbon/lisbon-guide-torre-belem-1.avif";
import hero2 from "../assets/images/desktop/lisbon/lisbon-guide-jeronimos-monestery-3.jpg";
import bairroImg from "../assets/images/desktop/lisbon/lisbon-guide-bairro-alto-1.png";
import logoIcon from "../assets/images/suport/lisbon-guide-favicon250X250-no-bg.png";

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);

  const [currentHeroImage, setCurrentHeroImage] = React.useState(0);

  const heroImages = [hero1, hero2];

  React.useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(heroTimer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
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

          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.4)_100%)]" />
          <div className="absolute inset-0 bg-black/30" />
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
            {t("home.hero_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 font-light italic"
          >
            {t("home.hero_subtitle")}
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
              {t("home.cta")}
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
            <div className="flex flex-col items-start">
              <img
                src={logoIcon}
                alt="Lisbon Guide Logo"
                className="h-[80px] w-auto mb-4"
              />

              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
                {t("home.welcome_title")}
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-xl">
              {t("home.welcome_description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Star size={24} fill="currentColor" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {t("home.feature_top_rated")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("home.feature_top_rated_desc")}
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Camera size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {t("home.feature_photogenic")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("home.feature_photogenic_desc")}
                </p>
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
                src={bairroImg}
                alt="Lisbon Bairro Alto"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <PreviewPlaces />

      {/* Reviews Section */}
      <ReviewsCarousel />
    </div>
  );
};

export default Home;