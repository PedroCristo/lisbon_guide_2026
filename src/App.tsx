import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Eat from './pages/Eat';
import Detail from './pages/Detail';
import About from './pages/About';
import Contact from './pages/Contact';
import LocationPage from './pages/LocationPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-50 selection:text-orange-500">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/eat" element={<Eat />} />
            <Route path="/details/:id" element={<Detail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/around/:location/:type" element={<LocationPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </div>
    </Router>
  );
}
