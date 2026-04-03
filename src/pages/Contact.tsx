import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Building } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = t('contact.validation.required');
    if (!formData.email) {
      newErrors.email = t('contact.validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.validation.email');
    }
    if (!formData.subject) newErrors.subject = t('contact.validation.required');
    if (!formData.message) newErrors.message = t('contact.validation.required');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          {t('contact.title')}
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">{t('contact.subtitle')}</p>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Company Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Building className="text-orange-500" size={32} />
            <h2 className="text-2xl font-bold tracking-tight">{t('contact.info.company')}</h2>
          </div>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            {t('contact.info.description')}
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white/10 rounded-lg text-orange-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('contact.info.labels.address')}</p>
                <p className="text-white">{t('contact.info.address')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white/10 rounded-lg text-orange-500">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('contact.info.labels.phone')}</p>
                <p className="text-white">{t('contact.info.phone')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white/10 rounded-lg text-orange-500">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('contact.info.labels.email')}</p>
                <p className="text-white">{t('contact.info.email')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-100 text-green-700 p-8 rounded-2xl text-center"
            >
              <p className="font-bold text-xl mb-2">{t('contact.form.success')}</p>
              <p className="text-sm">{t('contact.form.success_subtitle')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  />
                  {errors.name && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                  />
                  {errors.email && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.subject ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                />
                {errors.subject && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                />
                {errors.message && <p className="mt-1 text-[10px] text-red-500 font-bold uppercase">{errors.message}</p>}
              </div>

              {/* Mock reCAPTCHA */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input type="checkbox" id="recaptcha" className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="recaptcha" className="text-sm text-gray-600 font-medium">{t('contact.form.recaptcha')}</label>
                <div className="flex-grow" />
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-6 h-6 opacity-50" />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20"
              >
                <span>{t('contact.form.submit')}</span>
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
