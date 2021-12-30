# `<fwc-main>` [![Published on npm](https://img.shields.io/npm/v/@fortit/fwc-main.svg)](https://www.npmjs.com/package/@fortit/fwc-main)

## Installation

```sh
npm i @fortit/fwc-main
```

## Example usage

### Standard

```html
<script type="module">
  import '@fortit/fwc-main';
</script>

<fwc-main>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button
    slot="primary"
    label="${msg('Erstellen')}"
    @click="${() => this.addDialog.open()}"
    unelevated
  >
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### With back button

```html
<script type="module">
  import '@fortit/fwc-main';
</script>

<fwc-main back>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button
    slot="primary"
    label="${msg('Erstellen')}"
    @click="${() => this.addDialog.open()}"
    unelevated
  >
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### With primary and secondary button

```html
<script type="module">
  import 'fortit/fwc-main';
</script>

<fwc-main>
  <h1 slot="title">${this.goal.name}</h1>
  <mwc-button
    slot="primary"
    label="${msg('Erstellen')}"
    @click="${() => this.editDialog.open(id)}"
    unelevated
  >
  </mwc-button>
  <mwc-button
    slot="secondary"
    label="${msg('Canvas')}"
    @click="${() => this.canvasDialog.open(id)}"
  >
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

## API

### Slots

| Name        | Description                        |
| ----------- | ---------------------------------- |
| `content`   | Display the main content.          |
| `primary`   | Primary button at the right top.   |
| `secondary` | Secondary button at the right top. |
| `title`     | Display the main title.            |

### Properties/Attributes

| Name   | Type      | Default | Description             |
| ------ | --------- | ------- | ----------------------- |
| `back` | `boolean` | `false` | Display the back button |

### Methods

None

### Events

None
