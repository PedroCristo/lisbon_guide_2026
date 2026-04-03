import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import seePlaces from '../data/lisbon/see.json';
import PlaceCard from '../components/PlaceCard';

const Explore = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(seePlaces.map(place => place.category[currentLang as keyof typeof place.category])));

  const filteredPlaces = seePlaces.filter(place => {
    const isLisbon = place.location === 'lisbon';
    const matchesCategory = selectedCategory ? place.category[currentLang as keyof typeof place.category] === selectedCategory : true;
    return isLisbon && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          {t('explore.title')}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl font-light mb-12">
          {t('explore.subtitle')}
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
              selectedCategory === null
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                : 'bg-white text-gray-400 border border-gray-100 hover:border-orange-200'
            }`}
          >
            {currentLang === 'pt' ? 'Todos' : 'All'}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-orange-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map((place) => (
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
    </div>
  );
};

export default Explore;
