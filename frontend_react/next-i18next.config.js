const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  ns: [
    'common',
    'navigation',
    'footer',
    'home',
    'about',
    'bundles',
    'blog',
    'contact',
    'services',
    'auth',
  ],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  localeStructure: '{{lng}}/{{ns}}.json',
  fallbackLng: 'en',
};
