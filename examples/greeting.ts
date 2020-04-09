/* eslint-disable */
import i18next from 'i18next';
import I18nextCLILanguageDetector from 'i18next-cli-language-detector';

i18next.use(I18nextCLILanguageDetector).init({
  resources: {
    ja: { translations: { greeting: '🇯🇵こんにちは' } },
    en: { translations: { greeting: '🇬🇧Hello' } },
    zh: { translations: { greeting: '🇨🇳你好' } },
    fr: { translations: { greeting: '🇫🇷Bonjour' } },
  },
});

console.log(i18next.t('translations:greeting'));
