/* eslint-disable */
const i18next = require('i18next');
const I18nextCLILanguageDetector = require('../dist/index');

i18next.use(I18nextCLILanguageDetector).init({
  resources: {
    ja: { translations: { greeting: '🇯🇵こんにちは' } },
    en: { translations: { greeting: '🇬🇧Hello' } },
    zh: { translations: { greeting: '🇨🇳你好' } },
    fr: { translations: { greeting: '🇫🇷Bonjour' } },
  },
});

// std out
console.log(i18next.t('translations:greeting'));
