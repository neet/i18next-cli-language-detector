import { Services } from 'i18next';
import { I18nextCLILanguageDetector } from '../i18next-cli-language-detector';

const mockServices = {
  languageUtils: {
    formatLanguageCode: jest.fn((lng: string) => {
      return lng;
    }),
    isWhitelisted: jest.fn((_lng: string) => {
      return true;
    }),
  },
} as Services;

describe('I18nextCLILanguageDetector ', () => {
  let languageDetector: I18nextCLILanguageDetector;

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
    languageDetector.init(mockServices, {}, {});
    expect(languageDetector.cacheUserLanguage()).toBeUndefined();
  });

  it('detects shell language', () => {
    process.env.LC_ALL = 'en.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en');
  });

  it('detects shell language with region', () => {
    process.env.LC_ALL = 'en_US.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language with prioriy', () => {
    process.env.LC_ALL = 'en_US.UTF-8:ja_JP.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language via LC_MESSAGES', () => {
    process.env.LC_MESSAGES = 'en_US.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language via LANG', () => {
    process.env.LANG = 'en_US.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('detects shell language via LANGUAGE', () => {
    process.env.LANGUAGE = 'en_US.UTF-8';
    languageDetector.init(mockServices, {}, {});
    const language = languageDetector.detect();
    expect(language).toBe('en-US');
  });

  it('fallbacks when invalid LC passed', () => {
    process.env.LC_ALL = '';
    languageDetector.init(mockServices, {}, { fallbackLng: 'ja-JP' });
    const language = languageDetector.detect();
    expect(language).toBe('ja-JP');
  });

  it('fallbacks when the shell loale was blacklisted', () => {
    (mockServices.languageUtils.isWhitelisted as jest.Mock).mockImplementation(
      lng => lng !== 'en-US',
    );

    process.env.LC_ALL = 'en_US.UTF-8';
    languageDetector.init(mockServices, {}, { fallbackLng: 'ja-JP' });
    const language = languageDetector.detect();
    expect(language).toBe('ja-JP');
  });

  it('fallbacks when LC=C passed', () => {
    process.env.LC_ALL = 'C';
    languageDetector.init(mockServices, {}, { fallbackLng: 'en' });
    const language = languageDetector.detect();
    expect(language).toBe('en');
  });

  it('fallbacks the 1st element from the array when multiple fallbackLng passed', () => {
    process.env.LC_ALL = 'C';
    languageDetector.init(mockServices, {}, { fallbackLng: ['zh', 'en'] });
    const language = languageDetector.detect();
    expect(language).toBe('zh');
  });

  it('fallbacks the 1st element from the array of `default` key when object passed to the fallbackLng', () => {
    process.env.LC_ALL = 'C';

    languageDetector.init(
      mockServices,
      {},
      { fallbackLng: { default: ['fr', 'en'] } },
    );

    const language = languageDetector.detect();
    expect(language).toBe('fr');
  });
});
