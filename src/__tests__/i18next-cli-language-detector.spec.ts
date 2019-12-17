import { Services } from 'i18next';
import I18nextCLILanguageDetector from '../i18next-cli-language-detector';

const mockServices = {
  languageUtils: {
    formatLanguageCode: jest.fn((lng: string) => {
      return lng;
    }),
    isWhitelisted: jest.fn((lng: string) => {
      return lng;
    }),
  },
} as Services;

describe('I18nextCLILanguageDetector ', () => {
  let languageDetector: I18nextCLILanguageDetector;

  beforeEach(() => {
    languageDetector = new I18nextCLILanguageDetector();
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

    languageDetector.init(
      mockServices,
      { checkWhitelist: true },
      { fallbackLng: 'ja-JP' },
    );

    const language = languageDetector.detect();
    expect(language).toBe('ja-JP');
  });

  it('fallbacks when LC=C passed', () => {
    process.env.LC_ALL = 'C';

    languageDetector.init(mockServices, {}, { fallbackLng: 'en' });

    const language = languageDetector.detect();
    expect(language).toBe('en');
  });
});
