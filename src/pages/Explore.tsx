import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import seePlaces from "../data/lisbon/see.json";
import PlaceCard from "../components/PlaceCard";
import CategoryDropdown from "../components/CategoryDropdown";
import Pagination from "../components/Pagination";
import { section } from "motion/react-client";

const Explore = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // Ref for grid scroll
  const gridRef = useRef<HTMLDivElement | null>(null);

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

  // Scroll to grid when page changes
  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const yOffset = -450; // adjust for navbar height
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [currentPage]);

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

        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          allLabel={currentLang === "pt" ? "Todos" : "All"}
        />
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
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

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Explore;
