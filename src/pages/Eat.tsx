import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import eatPlaces from '../data/lisbon/eat.json';
import PlaceCard from '../components/PlaceCard';
import CategoryDropdown from '../components/CategoryDropdown';

const Eat = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(eatPlaces.map(place => place.category[currentLang as keyof typeof place.category])));

  const filteredPlaces = eatPlaces.filter(place => {
    const isLisbon = place.location === 'lisbon';
    const matchesCategory = selectedCategory ? place.category[currentLang as keyof typeof place.category] === selectedCategory : true;
    return isLisbon && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          {t('eat.title')}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl font-light mb-12">
          {t('eat.subtitle')}
        </p>

        {/* Filter Dropdown */}
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          allLabel={currentLang === 'pt' ? 'Todos' : 'All'}
        />
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

export default Eat;
