# i18next-cli-language-detector

i18next-cli-language-detector is a Third-party module for i18next to detecting user's language on CLI.

## Installation

```sh
yarn add i18next i18next-cli-language-detector
```

## Usage

Add `.use(I18nextCLILanguageDetector)` to your initialization part of i18next as following:

```js
import i18next from 'i18next';
import I18nextCLILanguageDetector from 'i18next-cli-language-detector';

i18next
  .use(I18nextCLILanguageDetector)
  .init();
```

## License
MIT
