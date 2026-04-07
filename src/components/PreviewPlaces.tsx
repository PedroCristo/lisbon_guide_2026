import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import seePlaces from "../data/lisbon/see.json";
import PlaceCard from "../components/PlaceCard";

type PlaceType = (typeof seePlaces)[0];

const PreviewPlaces = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const previewPlaces = useMemo(() => {
    const saved = sessionStorage.getItem("previewPlaces");

    if (saved) return JSON.parse(saved);

    const shuffled = shuffleArray(seePlaces).slice(0, 3);
    sessionStorage.setItem("previewPlaces", JSON.stringify(shuffled));

    return shuffled;
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          {t("explore.title")}
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previewPlaces.map((place: PlaceType) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            title={place.title[currentLang as keyof typeof place.title]}
            shortDescription={
              place.shortDescription[
                currentLang as keyof typeof place.shortDescription
              ]
            }
            image={`../${place.image}`}
            category={
              place.category[currentLang as keyof typeof place.category]
            }
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/explore"
          className="text-orange-500 font-bold hover:underline underline-offset-8"
        >
          {t("home.cta")} →
        </Link>
      </div>
    </section>
  );
};

export default PreviewPlaces;