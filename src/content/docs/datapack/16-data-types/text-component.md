---
title: "Text Component (Data Type)"
description: "A String, Array, or Object used for displaying text with formatting, translations, keybinds, and the other Minecraft JSON-text features."
navigation_title: "Text Component"
---

A [String](/docs/datapack/data-types/string), [Array](/docs/datapack/data-types/array), or [Object](/docs/datapack/data-types/object) used for displaying text with formatting, translations, keybinds, and the other Minecraft JSON-text features. Accepts everything vanilla's text component format accepts.

## Auto-fallback translation keys

If a power omits the `name` or `description` field, Apoli falls back to the auto-generated translation key:

  Field         |  Auto key
----------------|--------------
  `name`        |  `power.<namespace>.<path>.name`
  `description` |  `power.<namespace>.<path>.description`

For example, a power at `data/mymod/powers/fly.json` with no `name` field is displayed as `power.mymod.fly.name`. Add this key to a language file in a resource pack to translate it.

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

A composite component built from a list — formatting on the first element inherits to the rest.

```json
"name": {
    "translate": "power.mymod.fly.name"
}
```

An explicit translation key. Equivalent to omitting the field entirely (when the auto-key matches the power's id).
