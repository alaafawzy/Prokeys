// Central definition of route path segments per language.
// Update the Arabic (ar) entries if you want different URL paths
// from the English (en) ones.

export const pagePaths = {
  en: {
    home: "", // index route
    about: "AboutUs",
    faq: "FQA",
    bundles: "Bundles",
    services: "Services",
    serviceDetails: "Services/:slug",
    contact: "ContactUs",
    blogs: "Blogs",
    blogDetails: "blog/:slug",
  },
  ar: {
    home: "", // index route
    // Arabic paths written in Arabic, using URL-safe slugs
    about: "من-نحن",
    faq: "الأسئلة-الشائعة",
    bundles: "الباقات",
    services: "الخدمات",
    serviceDetails: "الخدمات/:slug",
    contact: "اتصل-بنا",
    blogs: "المدونة",
    blogDetails: "المدونة/:slug",
  },
};

export function getPagePathsForLang(lang) {
  const normalized = lang === "en" ? "en" : "ar";
  return pagePaths[normalized];
}
