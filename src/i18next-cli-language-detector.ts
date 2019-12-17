/* eslint-disable @typescript-eslint/no-explicit-any */
import { Services, InitOptions } from 'i18next';

class I18nextCLILanguageDetector {
  static type = 'languageDetector' as const;

  private services!: Services;
  private detectorOptions!: any;
  private i18nextOptions!: InitOptions;

  init(services: Services, detectorOptions: any, i18nextOptions: InitOptions) {
    this.services = services;
    this.detectorOptions = detectorOptions;
    this.i18nextOptions = i18nextOptions;
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

  /**
   * @see http://www.gnu.org/software/gettext/manual/html_node/The-LANGUAGE-variable.html
   */
  private formatShellLocale(rawLC?: string) {
    if (!rawLC) return;

    // Get array of available languages
    const LCs = rawLC.split(':');
    if (LCs.length < 1) return;

    const LC = LCs[0]
      .split('.')[0] // Get `en_US` part from `en_US.UTF-8`
      .replace('_', '-'); // transforms `en_US` to `en-US`

    // https://unix.stackexchange.com/questions/87745/what-does-lc-all-c-do
    if (LC === 'C') return;

    return this.services.languageUtils.formatLanguageCode(LC);
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

    if (typeof this.i18nextOptions.fallbackLng === 'string') {
      return this.i18nextOptions.fallbackLng;
    }

    return (
      typeof this.i18nextOptions.fallbackLng === 'object' &&
      this.i18nextOptions.fallbackLng.default &&
      this.i18nextOptions.fallbackLng.default[0]
    );
  }
}

export default I18nextCLILanguageDetector;
