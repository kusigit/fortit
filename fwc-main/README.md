# `<fwc-main>`

## Example usage

### Standard

```html
<script type="module">
  import 'fortit/fwc-main';
</script>

<fwc-main>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button 
    slot="primary" 
    @click="${() => this.addDialog.open()}"
    unelevated>
    ${msg('Erstellen')}
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### With primary button

```html
<script type="module">
  import 'fortit/fwc-main';
</script>

<fwc-main back>
  <h1 slot="title">${msg(`Benutzer`)}</h1>
  <mwc-button 
    slot="primary" 
    @click="${() => this.addDialog.open()}" 
    unelevated>
    ${msg('Erstellen')}
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

<fwc-main back>
  <h1 slot="title">${this.goal.name}</h1>
  <mwc-button
    slot="primary"
    @click="${() => this.editDialog.open(id)}"
    unelevated>
    ${msg(`Bearbeiten`)}
  </mwc-button>
  <mwc-button
    slot="secondary"
    @click="${() => this.canvasDialog.open(id)}">
    ${msg(`Canvas`)}
  </mwc-button>
  <fwc-card slot="content" padded>
    <div>Some content</div>
  </fwc-card>
</fwc-main>
```

### Slots

| Name        | Description                        |
| ----------- | ---------------------------------- |
| `title`     | Display the main title.            |
| `primary`   | Primary button at the right top.   |
| `secondary` | Secondary button at the right top. |
| `content`   | Display the main content.          |
