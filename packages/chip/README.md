# `<fwc-chip>` [![Published on npm](https://img.shields.io/npm/v/@fortit/fwc-chip.svg)](https://www.npmjs.com/package/@fortit/fwc-chip)

## Installation

```sh
npm i @fortit/fwc-chip
```

## Example usage

### Standard

```html
<script type="module">
  import '@fortit/fwc-chip';
</script>

<fwc-chip
  icon="lightbulb"
  text="Strategisches Ziel"
  @remove="${() => this.remove()}"
  action
></fwc-chip>
```

## API

### Slots

None

### Properties/Attributes

| Name     | Type      | Default | Description                      |
| -------- | --------- | ------- | -------------------------------- |
| `icon`   | `string`  | `''`    | Icon to display left             |
| `text`   | `string`  | `''`    | Text to display                  |
| `action` | `boolean` | `false` | Display delete icon on the right |

### Methods

None

### Events

| Event Name | Target     | Detail | Description              |
| ---------- | ---------- | ------ | ------------------------ |
| `remove`   | `fwc-chip` | none   | Fired icon button click. |
