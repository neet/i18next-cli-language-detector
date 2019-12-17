import { LanguageDetectorModule, Services, InitOptions } from "i18next";

export default class I18nextCliLanguageDetector implements LanguageDetectorModule {
  type = "languageDetector" as const;

  private readonly services: Services;
  private readonly detectorOptions: any;
  private readonly i18nextOptions: InitOptions;

  constructor(
    services: Services,
    detectorOptions: any,
    i18nextOptions: InitOptions
  ) {
    this.services = services;
    this.detectorOptions = detectorOptions;
    this.i18nextOptions = i18nextOptions;
    this.init(services, detectorOptions, i18nextOptions);
  }

  init(_services: Services, _detectorOptions: any, _i18nextOptions: InitOptions) {
    return;
  }

  detect() {
    const shellLocale =
      process.env.LC_ALL ||
      process.env.LC_MESSAGES ||
      process.env.LANG ||
      process.env.LANGUAGE;

    const formattedLangauge = this.formatShellLocale(shellLocale);

    if (!formattedLangauge || !this.checkIfWhitelisted(formattedLangauge)) {
      return this.getFallbackLng();
    }

    return formattedLangauge;
  }

  cacheUserLanguage() {
    return;
  }

  private formatShellLocale(lc?: string) {
    if (!lc) return;
    const splittedLC = lc.split(".");
    if (!Array.isArray(splittedLC)) return;
    if (splittedLC.length < 0) return;

    return this.services.languageUtils.formatLanguageCode(splittedLC[0]);
  }

  private checkIfWhitelisted(language: string) {
    return (
      !this.detectorOptions.checkWhitelist ||
      this.services.languageUtils.isWhitelisted(language)
    );
  }

  private getFallbackLng() {
    if (Array.isArray(this.i18nextOptions.fallbackLng)) {
      return this.i18nextOptions.fallbackLng[0];
    }

    if (typeof this.i18nextOptions.fallbackLng === "string") {
      return this.i18nextOptions.fallbackLng;
    }

    return (
      typeof this.i18nextOptions.fallbackLng === "object" &&
      this.i18nextOptions.fallbackLng.default &&
      this.i18nextOptions.fallbackLng.default[0]
    );
  }
}
