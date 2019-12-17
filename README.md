# i18next-cli-language-detector
![npm](https://img.shields.io/npm/v/i18next-cli-language-detector.svg)
![ci](https://github.com/neet/i18next-cli-language-detector/workflows/CI/badge.svg)
![codecov](https://codecov.io/gh/neet/i18next-cli-language-detector/branch/master/graph/badge.svg)

i18next third-party module for detecting user's language on CLI.

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
