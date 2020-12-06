import { Services, InitOptions } from 'i18next';

export class I18nextCLILanguageDetector {
  static type = 'languageDetector' as const;

  private services!: Services;
  private detectorOptions!: {};
  private i18nextOptions!: InitOptions;

  init(services: Services, detectorOptions: {}, i18nextOptions: InitOptions) {
    this.services = services;
    this.detectorOptions = detectorOptions;
    this.i18nextOptions = i18nextOptions;
  }

  detect() {
    const shellLocale =
      process.env.LC_ALL ??
      process.env.LC_MESSAGES ??
      process.env.LANG ??
      process.env.LANGUAGE;

    const formattedLanguage = this.formatShellLocale(shellLocale);

    if (!formattedLanguage || !this.checkIfWhitelisted(formattedLanguage)) {
      return this.getFallbackLng();
    }

    return formattedLanguage;
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

    const LC = LCs[0]
      // Get `en_US` part from `en_US.UTF-8`
      .split('.')[0]
      // transforms `en_US` to `en-US`
      .replace('_', '-');

    // https://unix.stackexchange.com/questions/87745/what-does-lc-all-c-do
    if (LC === 'C') return;

    return this.services.languageUtils.formatLanguageCode(LC);
  }

  private checkIfWhitelisted(language: string) {
    return this.services.languageUtils.isWhitelisted(language);
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
