import React from "react";
import { useTranslation } from "react-i18next";
import legalData from "../data/legal/legal.json";

const Legal = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const legal = legalData.legal;

  return (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{legal.title[currentLang]}</h1>

      {/* Intro content */}
      <p className="text-gray-600 mb-10">{legal.content[currentLang]}</p>
      <span className="font-bold">{legal.lastUpdate[currentLang]}</span>
      <hr className="my-10 border-gray-300" />

      {/* Navigation */}
      <div className="flex gap-6 mb-12">
        <a
          href="#privacy"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          {legal.nav.privacy[currentLang]}
        </a>

        <a
          href="#cookies"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          {legal.nav.cookies[currentLang]}
        </a>

        <a
          href="#terms"
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
          {legal.nav.terms[currentLang]}
        </a>
      </div>

      {/* How we are */}
      <section id="privacy" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {legal.howWeAre.title[currentLang]}
        </h2>

        {legal.howWeAre.content[currentLang].map((item, index) => (
          <p key={index} className="mb-1 text-gray-700">
            {item}
          </p>
        ))}
      </section>

      {/* Privacy */}
      <section id="privacy" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {legal.privacy.title[currentLang]}
        </h2>

        {legal.privacy.content[currentLang].map((item, index) => (
          <p key={index} className="mb-1 text-gray-700">
            {item}
          </p>
        ))}
      </section>

      {/* Cookies */}
      <section id="cookies" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {legal.cookies.title[currentLang]}
        </h2>

        {legal.cookies.content[currentLang].map((item, index) => (
          <p key={index} className="mb-1 text-gray-700">
            {item}
          </p>
        ))}
      </section>

      {/* Terms */}
      <section id="terms" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {legal.terms.title[currentLang]}
        </h2>

        {legal.terms.content[currentLang].map((item, index) => (
          <p key={index} className="mb-1 text-gray-700">
            {item}
          </p>
        ))}
      </section>
    </div>
  );
};

export default Legal;
