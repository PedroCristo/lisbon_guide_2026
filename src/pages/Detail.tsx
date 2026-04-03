import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "motion/react";
import seePlaces from "../data/see.json";
import eatPlaces from "../data/eat.json";

import { Place } from "../types/place";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  // Combine both data sources to find the place
  const allPlaces = [...seePlaces, ...eatPlaces];
  const place = allPlaces.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="pt-32 pb-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("details.not_found")}</h1>
        <Link to="/explore" className="text-orange-600 hover:underline">
          {t("details.go_back_explore")}
        </Link>
      </div>
    );
  }

  const title = place.title[currentLang as keyof typeof place.title];
  const fullDescription =
    place.fullDescription[currentLang as keyof typeof place.fullDescription];
  const category = place.category[currentLang as keyof typeof place.category];
  const typeLabel = t(`details.types.${place.type}`);

  // Determine back path based on location and type
  let backPath = "/explore";
  if (place.location === "lisbon") {
    backPath = place.type === "eat" ? "/eat" : "/explore";
  } else {
    backPath = `/around/${place.location}/${place.type}`;
  }

  const locationLabel =
    place.location === "lisbon"
      ? "Lisbon, Portugal"
      : `${t(`nav.${place.location}`)}, Portugal`;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={place.image_bg}
          alt={title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-8 left-4 md:left-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">{t("details.back")}</span>
          </button>
        </div>

        <div className="absolute bottom-8 left-4 md:left-8 right-4 md:right-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {typeLabel}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/30">
                {category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 text-orange-600 mb-8">
            <MapPin size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">
              {locationLabel}
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="whitespace-pre-line">{fullDescription}</p>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                {t("details.type")}
              </p>
              <p className="font-bold text-gray-900">{typeLabel}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                {t("details.category")}
              </p>
              <p className="font-bold text-gray-900">{category}</p>
            </div>

            {place.address && (
              <div className="md:col-span-2 flex items-start space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                    {t("details.address")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {place.address}
                  </p>
                </div>
              </div>
            )}

            {place.phone && (
              <div className="md:col-span-2 flex items-start space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                    {t("details.phone")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {place.phone}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="underline underline-offset-4">
                {t("details.back")}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Detail;
