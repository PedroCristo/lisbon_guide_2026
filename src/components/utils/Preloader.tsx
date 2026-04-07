import React from "react";
import logo from "../../assets/images/suport/lisbon-guide-favicon250X250-no-bg.png";

const Preloader = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      
      {/* Spinner */}
      <div className="w-50 h-50 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />

      {/* Logo (centered above spinner) */}
      <img
        src={logo}
        alt="Lisbon Guide"
        className="absolute w-40 h-40 object-contain"
      />

    </div>
  );
};

export default Preloader;