# `<fwc-main>`

## Example usage

### Standard

```html
<script type="module">
    import 'fortit/fwc-main';
</script>

<fwc-main>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button slot="primary" @click="${() => this.addDialog.open()}" unelevated>
    ${msg('Erstellen')}
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### With back button

```html
<script type="module">
    import 'fortit/fwc-main';
</script>

<fwc-main back>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button slot="primary" @click="${() => this.addDialog.open()}" unelevated>
    ${msg('Erstellen')}
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### Slots

| Name       | Description                  |
| ---------- | ---------------------------- |
| `title`    | Display the main title. |
| `primary`  | Primary button at the right top. |
| `content`  | Display the main content. |
