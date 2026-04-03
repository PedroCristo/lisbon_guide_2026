import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Linkedin, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-orange-500 tracking-tighter">
                LISBON<span className="text-white font-light italic">guide</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-orange-500 hover:text-orange-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h3 className="text-lg font-semibold mb-6 text-orange-500">{t('footer.quick_links')}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/explore" className="hover:text-orange-500 transition-colors">{t('nav.explore')}</Link></li>
              <li><Link to="/eat" className="hover:text-orange-500 transition-colors">{t('nav.eat')}</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="md:text-right">
            <h3 className="text-lg font-semibold mb-6 text-orange-500">{t('footer.locations')}</h3>
            <div className="flex flex-col md:items-end text-slate-400 text-sm">
              <div className="flex items-center space-x-2 text-orange-500 mb-3">
                <MapPin size={20} />
              </div>
              <p className="whitespace-pre-line leading-relaxed">
                {t('footer.office_address')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col items-center">
            <p className="text-slate-500 text-xs uppercase tracking-widest text-center">
              © {year} Lisbonguide. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
