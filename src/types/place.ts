export type Place = {
  id: string;
  type: string;
  location: string;
  title: { en: string; pt: string };
  shortDescription: { en: string; pt: string };
  fullDescription: { en: string; pt: string };
  image: string;
  image_bg: string; // ✅ ADD THIS
  category: { en: string; pt: string };
  address: string;
  phone: string;
};