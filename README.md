# i18next-cli-language-detector
![npm](https://img.shields.io/npm/v/i18next-cli-language-detector.svg)
![ci](https://github.com/neet/i18next-cli-language-detector/workflows/CI/badge.svg)
![codecov](https://codecov.io/gh/neet/i18next-cli-language-detector/branch/master/graph/badge.svg)

i18next third-party language detector for CLI.

https://user-images.githubusercontent.com/19276905/124214133-b8c69c80-db2c-11eb-82f3-d529c80456c7.mov

**[> See examples](https://github.com/neet/i18next-cli-language-detector/blob/master/examples/greeting.ts)**

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

### Supported environment variables
i18next-cli-language-detector refers following variables to determine which language to activate. 

- `LC_ALL`
- `LC_MESSAGES`
- `LANG`
- `LANGUAGE`

As for the format of these variables, see [documentation of Gettext](http://www.gnu.org/software/gettext/manual/html_node/The-LANGUAGE-variable.html).

## Related projects
- **[y18n](https://github.com/yargs/y18n)** - I18n utility, used by [yargs](https://github.com/yargs/yargs), a CLI framework for Node.js
- **[i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languagedetector)** - i18next language detector for browsers
- **[i18next-express-middleware](https://github.com/i18next/i18next-express-middleware)** - i18next language detector for express
- **[i18next-react-native-languageDetector](https://github.com/i18next/react-native-languageDetector)** - i18next language detector for React Native

## License
MIT
