import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isAroundOpen, setIsAroundOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.explore'), path: '/explore' },
    { name: t('nav.eat'), path: '/eat' },
  ];

  const aroundLinks = [
    { 
      label: t('nav.cascais'), 
      items: [
        { name: t('around.monuments'), path: '/around/cascais/see' },
        { name: t('around.eat'), path: '/around/cascais/eat' }
      ]
    },
    { 
      label: t('nav.sintra'), 
      items: [
        { name: t('around.monuments'), path: '/around/sintra/see' },
        { name: t('around.eat'), path: '/around/sintra/eat' }
      ]
    }
  ];

  // Determine if we should use transparent mode
  // We only want transparency on the home page when not scrolled
  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent py-6' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500 tracking-tighter">
              LISBON<span className={`${isTransparent ? 'text-white' : 'text-gray-900'} font-light italic transition-colors duration-300`}>guide</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-orange-500 ${
                  location.pathname === link.path 
                    ? 'text-orange-500' 
                    : isTransparent ? 'text-white' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Around Lisbon Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsAroundOpen(true)}
              onMouseLeave={() => setIsAroundOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:text-orange-500 ${
                  location.pathname.startsWith('/around') 
                    ? 'text-orange-500' 
                    : isTransparent ? 'text-white' : 'text-gray-600'
                }`}
              >
                <span>{t('nav.around_lisbon')}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isAroundOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isAroundOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 grid grid-cols-1 gap-4">
                      {aroundLinks.map((group) => (
                        <div key={group.label}>
                          <p className="text-[10px] font-bold text-white bg-orange-500 rounded px-2 py-0.5 inline-block uppercase tracking-widest mb-2">
                            {group.label}
                          </p>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="block px-2 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/about"
              className={`text-sm font-medium transition-all duration-300 hover:text-orange-500 ${
                location.pathname === '/about' 
                  ? 'text-orange-500' 
                  : isTransparent ? 'text-white' : 'text-gray-600'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-all duration-300 hover:text-orange-500 ${
                location.pathname === '/contact' 
                  ? 'text-orange-500' 
                  : isTransparent ? 'text-white' : 'text-gray-600'
              }`}
            >
              {t('nav.contact')}
            </Link>

            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:text-orange-500 ${
                isTransparent ? 'text-white' : 'text-gray-600'
              }`}
            >
              <Globe size={16} />
              <span className="uppercase">{i18n.language.startsWith('en') ? 'PT' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 hover:text-orange-500 focus:outline-none ${
                isTransparent ? 'text-white' : 'text-gray-600'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === link.path ? 'text-orange-500' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Around Lisbon */}
              <div className="py-2">
                <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {t('nav.around_lisbon')}
                </p>
                <div className="space-y-4 pl-3">
                  {aroundLinks.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-bold text-white bg-orange-500 rounded px-2 py-0.5 inline-block mb-1">{group.label}</p>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 text-sm text-gray-600 hover:text-orange-500"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === '/about' ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === '/contact' ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                {t('nav.contact')}
              </Link>

              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 flex items-center space-x-2 text-base font-medium text-gray-600"
              >
                <Globe size={20} />
                <span className="uppercase">{i18n.language.startsWith('en') ? 'PT' : 'EN'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
