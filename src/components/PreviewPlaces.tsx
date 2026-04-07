import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import seePlaces from "../data/lisbon/see.json";
import PlaceCard from "../components/PlaceCard";

type PlaceType = (typeof seePlaces)[0];
type PreviewPlacesProps = {
  detailPage?: boolean;
};


const PreviewPlaces = ({ detailPage = false }: PreviewPlacesProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

// Randomize the cards any time the user opens the new browser page
//   const shuffleArray = (array: any[]) => {
//     return [...array].sort(() => Math.random() - 0.5);
//   };

//   const previewPlaces = useMemo(() => {
//     const saved = sessionStorage.getItem("previewPlaces");

//     if (saved) return JSON.parse(saved);

//     const shuffled = shuffleArray(seePlaces).slice(0, 3);
//     sessionStorage.setItem("previewPlaces", JSON.stringify(shuffled));

//     return shuffled;
//   }, []);

// This logic selects 3 random places to display, and caches the result in sessionStorage.
// The cached data is reused for up to 30 seconds to avoid reshuffling on every render,
// improving performance while still refreshing the content periodically.

const shuffleArray = (array: any[]) => {
  // Creates a new array and randomly shuffles its elements
  return [...array].sort(() => Math.random() - 0.5);
};

const previewPlaces = useMemo(() => {
  // Retrieve previously saved places and their timestamp from sessionStorage
  const saved = sessionStorage.getItem("previewPlaces");
  const savedTime = sessionStorage.getItem("previewPlacesTime");

  const now = Date.now();
  const THIRTY_SECONDS = 30 * 1000;

  // If cached data exists AND is not older than 30 seconds, reuse it
  if (saved && savedTime && now - Number(savedTime) < THIRTY_SECONDS) {
    return JSON.parse(saved);
  }

  // Otherwise, shuffle the full dataset and take the first 3 items
  const shuffled = shuffleArray(seePlaces).slice(0, 3);

  // Save the newly generated places and the current timestamp in sessionStorage
  sessionStorage.setItem("previewPlaces", JSON.stringify(shuffled));
  sessionStorage.setItem("previewPlacesTime", now.toString());

  // Return the newly generated preview places
  return shuffled;
}, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          {t("feature.title")}
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-8">
          {t("feature.subtitle")}
        </p>
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
            image={place.image}
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

           {detailPage ? t("feature.cta") : t("home.cta")}
        </Link>
      </div>
    </section>
  );
};

export default PreviewPlaces;
