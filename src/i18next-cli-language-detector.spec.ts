/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import { I18nextCLILanguageDetector } from './i18next-cli-language-detector';

describe('I18nextCLILanguageDetector ', () => {
  let languageDetector: I18nextCLILanguageDetector;

  beforeAll(() => {
    i18next.init();
  });

  beforeEach(() => {
    languageDetector = new I18nextCLILanguageDetector();
  });

  afterEach(() => {
    delete process.env.LC_ALL;
    delete process.env.LC_MESSAGES;
    delete process.env.LANG;
    delete process.env.LANGUAGE;
  });

  it('has nothing to do with cache feature yet', () => {
    languageDetector.init(i18next.services, {}, {});
    expect(languageDetector.cacheUserLanguage()).toBeUndefined();
  });

  it('detects shell language', () => {
    process.env.LC_ALL = 'en.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en');
  });

  it('detects shell language with region', () => {
    process.env.LC_ALL = 'en_US.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language with prioriy', () => {
    process.env.LC_ALL = 'en_US.UTF-8:ja_JP.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toEqual(['en-US', 'ja-JP']);
  });

  it('detects shell language via LC_MESSAGES', () => {
    process.env.LC_MESSAGES = 'en_US.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language via LANG', () => {
    process.env.LANG = 'en_US.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language via LANGUAGE', () => {
    process.env.LANGUAGE = 'en_US.UTF-8';
    languageDetector.init(i18next.services, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('fallbacks when invalid LC passed', () => {
    process.env.LC_ALL = '';
    languageDetector.init(i18next.services, {}, { fallbackLng: 'ja-JP' });
    const language = languageDetector.detect();
    expect(language).toBe('ja-JP');
  });

  it('fallbacks when LC=C passed', () => {
    process.env.LC_ALL = 'C';
    languageDetector.init(i18next.services, {}, { fallbackLng: 'en' });
    const language = languageDetector.detect();
    expect(language).toBe('en');
  });

  it('fallbacks when multiple fallbackLng passed', () => {
    process.env.LC_ALL = 'C';
    languageDetector.init(i18next.services, {}, { fallbackLng: ['zh', 'en'] });
    const language = languageDetector.detect();
    expect(language).toEqual(['zh', 'en']);
  });
});
