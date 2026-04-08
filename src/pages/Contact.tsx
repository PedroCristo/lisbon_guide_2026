import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Send, MapPin, Mail, Building } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = t("contact.validation.required");

    if (!formData.email) {
      newErrors.email = t("contact.validation.required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.validation.email");
    }

    if (!formData.subject) newErrors.subject = t("contact.validation.required");
    if (!formData.message) newErrors.message = t("contact.validation.required");
    if (!captchaValue) newErrors.captcha = t("contact.validation.required");

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Always prevent default first

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await fetch("https://formsubmit.co/ajax/media.info.creations@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: "Lisbon Guide - Contact Form",
          _template: "table",
          _captcha: "false",
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to send:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
          {t("contact.title")}
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="contact-details bg-gray-900 text-white rounded-3xl p-8 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Building className="text-orange-500" size={32} />
            <h2 className="text-2xl font-bold">{t("contact.info.company")}</h2>
          </div>

          <p className="text-gray-400 mb-12">{t("contact.info.description")}</p>

          <div className="space-y-6">
            <div className="flex space-x-4">
              <MapPin className="text-orange-500" />
              <p>{t("contact.info.address")}</p>
            </div>

            <div className="flex space-x-4">
              <Mail className="text-orange-500" />
              <p>{t("contact.info.email")}</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          {submitted ? (
            <div className="bg-green-100 border border-green-300 text-green-800 text-center font-semibold text-lg p-6 rounded-xl">
              {t("contact.validation.message_success")}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/media.info.creations@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* FormSubmit config */}
              <input
                type="hidden"
                name="_subject"
                value="Lisbon Guide - Contact Form"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" value="localhost:3000" />

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t("contact.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl focus:outline-none border-gray-200"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("contact.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl focus:outline-none border-gray-200"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                required
                placeholder={t("contact.form.subject")}
                value={formData.subject}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl focus:outline-none border-gray-200"
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject}</p>
              )}

              {/* Message */}
              <textarea
                name="message"
                required
                placeholder={t("contact.form.message")}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl focus:outline-none border-gray-200"
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message}</p>
              )}

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  key={currentLang}
                  sitekey="6Le6x6wsAAAAAM8X0IcCJ-07I6bCxFPDY27JFb9O"
                  onChange={(value) => setCaptchaValue(value)}
                  hl={currentLang}
                />
              </div>
              {errors.captcha && (
                <p className="text-xs text-red-500 text-center">
                  {t("contact.validation.captcha_required")}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                // disabled={!captchaValue}
                className={`w-full flex justify-center items-center space-x-2 py-3 rounded-xl relative overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                  !captchaValue
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 text-white"
                }`}
              >
                {/* Overlay */}
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>

                <span className="relative z-10 flex items-center space-x-2">
                  <span>{t("contact.validation.send_btn")}</span>
                  <Send size={18} />
                </span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
