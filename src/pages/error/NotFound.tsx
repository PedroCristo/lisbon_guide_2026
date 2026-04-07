import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background image */}
      <div
        className="page404 absolute inset-0 bg-cover bg-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2x2">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          404
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-8">
          {t("page404.message")}
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          {t("page404.cta")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;