# `<fwc-chip>`

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

### Properties/Attributes

| Name     | Type      | Default | Description                  |
| -------- | --------- | ------- | --------------------- |
| `icon` | `string` | `''` | Icon to display |
| `text` | `string` | `''` | Text to display |
| `action` | `boolean` | `false` | Icon button to display |

### Events

| Event Name | Target               | Detail            | Description          |
| ---------- | -------------------- | ----------------- | -------------------- |
| `remove`   | `fwc-chip` | none              | Fired icon button click.    |
