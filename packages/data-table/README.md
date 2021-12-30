# `<fwc-data-table>` [![Published on npm](https://img.shields.io/npm/v/@fortit/fwc-data-table.svg)](https://www.npmjs.com/package/@fortit/fwc-data-table)

## Installation

```sh
npm i @fortit/fwc-data-table
```

## Example usage

### Standard

```html
<script type="module">
  import {DataTable} from '@fortit/fwc-data-table';

  export class MyDataTable extends DataTable {
    ...
  }
</script>
```

## API

### Slots

None

### Properties/Attributes

None

### Methods

| Name                                        | Description                                |
| ------------------------------------------- | ------------------------------------------ |
| `setData<T>(datas: T[]) => void`            | Set an array of items to render the table. |
| `sort(field: string) => void`               | Sorting items at the specific column.      |
| `setFilter(field = '', value = '') => void` | Filter items at the specific column.       |

### Events

None

## Additional references

- [Material Design](https://material.io/components/data-tables)
