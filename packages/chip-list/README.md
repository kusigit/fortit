# `<fwc-chip-list>` [![Published on npm](https://img.shields.io/npm/v/@fortit/fwc-chip-list.svg)](https://www.npmjs.com/package/@fortit/fwc-chip-list)

## Installation

```sh
npm i @fortit/fwc-chip-list
```

## Example usage

### Standard

```html
<script type="module">
  import '@fortit/fwc-chip-list';
</script>

<fwc-chip-list
  icon="quiz"
  .all="${this.allItems}"
  .selected="${this.selectedItems}"
></fwc-chip-list>
```

## API

### Slots

None

### Properties/Attributes

| Name       | Type               | Default | Description                        |
| ---------- | ------------------ | ------- | ---------------------------------- |
| `added`    | `any[]` (readonly) | `[]`    | Array of added items               |
| `all`      | `any[]`            | `[]`    | Array of all items (id, name)      |
| `icon`     | `string`           | `''`    | Icon to display left               |
| `removed`  | `any[]` (readonly) | `[]`    | Array of removed items             |
| `selected` | `any[]`            | `[]`    | Array of selected items (id, name) |

### Methods

None

### Events
 
None

## Additional references

- [Angular Material](https://material.angular.io/components/chips/examples)