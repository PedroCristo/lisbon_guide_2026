import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import seePlaces from "../data/lisbon/see.json";
import PlaceCard from "../components/PlaceCard";
import CategoryDropdown from "../components/CategoryDropdown";

const Explore = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // Get unique categories
  const categories = Array.from(
    new Set(
      seePlaces.map(
        (place) => place.category[currentLang as keyof typeof place.category]
      )
    )
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter places
  const filteredPlaces = seePlaces.filter((place) => {
    const isLisbon = place.location === "lisbon";
    const matchesCategory = selectedCategory
      ? place.category[currentLang as keyof typeof place.category] ===
        selectedCategory
      : true;

    return isLisbon && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          {t("explore.title")}
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl font-light mb-12">
          {t("explore.subtitle")}
        </p>

        {/* Filter Dropdown */}
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          allLabel={currentLang === "pt" ? "Todos" : "All"}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPlaces.map((place) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="
            px-4 py-2 bg-gray-200 rounded
            cursor-pointer
            hover:bg-orange-300
            active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="
            px-4 py-2 bg-gray-200 rounded
            cursor-pointer
            hover:bg-orange-300 hover:text-white
            active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
