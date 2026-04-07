import React from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import reviews from "../data/lisbon/reviews.json";

const ReviewsCarousel = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);

  const currentReview = reviews[currentReviewIndex];

  React.useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(reviewTimer);
  }, []);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t("home.reviews_title")}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="relative max-w-2xl mx-auto h-[350px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white p-8 md:p-12 rounded-[32px] shadow-xl shadow-slate-200/50 flex flex-col justify-center"
            >
              <div className="absolute -top-4 right-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <Quote size={24} fill="currentColor" />
              </div>

              <div className="flex items-center space-x-6 mb-8">
                <img
                  src={currentReview.image}
                  alt={currentReview.name}
                  className="w-30 h-30 rounded-full object-cover border-4 border-orange-100 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {currentReview.name}
                  </h4>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                    {
                      currentReview.city[
                        currentLang as keyof typeof currentReview.city
                      ]
                    }
                  </p>
                </div>
              </div>

              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < currentReview.rating
                        ? "text-yellow-400 fill-yellow-300"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-600 italic leading-relaxed">
                "
                {
                  currentReview.review[
                    currentLang as keyof typeof currentReview.review
                  ]
                }
                "
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReviewIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentReviewIndex === index
                  ? "bg-orange-500 w-8"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;