# `base` [![Published on npm](https://img.shields.io/npm/v/@fortit/base.svg)](https://www.npmjs.com/package/@fortit/base)

## Installation

```sh
npm i @fortit/base
```

## API

### Slots

None

### Properties/Attributes

None

### Methods

| Name                                                                          | Description                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `debounce = (callback: DebounceCallbackFunction, debounceTime = 300) => void` | Debounce a function call                           |
| `dynMsg = (key: string) => string`                                            | Return message string from `client/i18n/messages`. |
| `formatDate = (timestamp?: number) => string`                                 | Format timestamp to `dd.MM.yyyy`.                  |
| `formatDateTime = (timestamp?: number) => string`                             | Format timestamp to `dd.MM.yyyy HH:mm`.            |

### Events

None
