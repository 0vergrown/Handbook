---
title: "Text Component (Data Type)"
description: "A string, array or object for text with formatting, translations, keybinds and the other features of Minecraft's JSON text."
navigation_title: "Text Component"
---

A [String](/docs/datapack/data-types/string), [Array](/docs/datapack/data-types/array) or [Object](/docs/datapack/data-types/object) for showing text with formatting, translations, keybinds and the other features of Minecraft's JSON text. It accepts everything vanilla's text component format accepts.

## Automatic translation keys

If a power leaves out its `name` or `description` field, Apoli falls back to a generated translation key:

| Field | Generated key |
| --- | --- |
| `name` | `power.<namespace>.<path>.name` |
| `description` | `power.<namespace>.<path>.description` |

For example, a power at `data/mymod/powers/fly.json` with no `name` field is shown as `power.mymod.fly.name`. Add that key to a language file in a resource pack to translate it.

## Examples

```json
"name": "This is an example text string!"
```

A plain string.

```json
"name": {
    "text": "This is an example text string with a fancy color!",
    "color": "yellow"
}
```

A coloured component.

```json
"name": [
    "Press ",
    { "keybind": "key.attack" },
    " to attack!"
]
```

A component built from a list, where formatting on the first element carries over to the rest.

```json
"name": {
    "translate": "power.mymod.fly.name"
}
```

An explicit translation key. When the generated key matches the power's ID, this is the same as leaving the field out.
