---
title: Text component
description: How you write names and descriptions — plain strings or rich text.
---

A **text component** is any piece of displayed text — a power's `name`, an origin's `description`, the label on a resource bar. Apoli accepts text the same way vanilla Minecraft does, plus one convenience: a bare string.

## The easy way: a plain string

Most of the time you just write a string:

```json
{
  "type": "apoli:simple",
  "name": "Aquatic",
  "description": "You are at home in the water."
}
```

A bare string is treated as literal text. This is all you need for the vast majority of names and descriptions.

## The rich way: a text object

For colour, formatting or translation, use a vanilla text component object:

```json
{
  "name": { "text": "Aquatic", "color": "aqua", "italic": false }
}
```

Common keys:

| Key | Purpose |
| --- | --- |
| `text` | the literal string |
| `translate` | a translation key instead of literal text |
| `color` | a named colour or `#RRGGBB` |
| `bold`, `italic`, `underlined` | formatting flags |
| `extra` | a list of further components appended after |

## Translation keys

For a translatable name, reference a key from your language files:

```json
{ "name": { "translate": "power.my_pack.aquatic.name" } }
```

> If you omit `name`/`description` entirely, Apoli falls back to an automatic translation key derived from the power's id — so you can localise a power without setting `name` at all.

## Lists of components

Anywhere a text component is accepted, a **list** works too — the parts are concatenated:

```json
{
  "name": [
    { "text": "Aqua", "color": "aqua" },
    { "text": "tic", "color": "blue" }
  ]
}
```

## See also

- [`apoli:simple`](/docs/datapack/powers/simple) — a good place to try names out.
- [Origins » Overview](/docs/datapack/origins/overview) — origins use text components for their titles and lore.
