import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

interface PlaceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  category: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ id, title, shortDescription, image, category }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-orange-500 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {shortDescription}
        </p>
        <Link
          to={`/details/${id}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-orange-500 transition-colors duration-300"
        >
          {t('explore.view_details')}
        </Link>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
