---
title: Data types
description: The reusable value shapes that fields expect — modifiers, effects, text and more.
---

Powers, actions and conditions are the nouns and verbs of Apoli. **Data types** are the smaller pieces they're made of: the shape of an attribute modifier, a status effect, a bit of text, an item stack. Learn a data type once and you know it everywhere it appears.

## What counts as a data type

Anything a field expects that isn't just a raw number or string. Some are objects, some are strings with special meaning:

| Data type | Looks like | Used by |
| --- | --- | --- |
| [Identifier](#identifier) | `"apoli:heal"` | every `type`, power ids, tags |
| [Attribute modifier](/docs/datapack/data-types/attribute-modifier) | `{ operation, value, attribute }` | `apoli:attribute` |
| [Text component](/docs/datapack/data-types/text-component) | `"Fast"` or a JSON text object | `name`, `description` |
| [Status effect](/docs/datapack/data-types/status-effect-instance) | `{ effect, duration, amplifier }` | `apoli:apply_effect` |
| [Item stack](/docs/datapack/data-types/item-stack) | `{ item, count, components }` | item actions, `give` |
| [HUD render](/docs/datapack/data-types/hud-render) | `{ should_render, bar_index }` | resources & cooldowns |
| [Shape / Space](/docs/datapack/data-types/shape) | `"sphere"` · `"local"` | radius & velocity fields |
| [Comparison](#comparisons) | `"<="` with `compare_to` | `apoli:health`, resources |

## Identifier

An **identifier** names something in `namespace:path` form — `apoli:attribute`, `minecraft:diamond`, `my_pack:mana`. If you write just `path` with no namespace, Minecraft assumes `minecraft:`. Identifiers are case-sensitive and lowercase.

## Comparisons

Numeric conditions and resource checks share a comparison shape: a `comparison` operator and a `compare_to` value.

```json
{ "comparison": ">=", "compare_to": 10 }
```

Operators: `<`, `<=`, `==`, `>=`, `>`, `!=`.

## Single or list, almost everywhere

Many fields accept **either** a single value **or** a list of them. `apoli:attribute` takes `modifier` (one) or `modifiers` (many); `apoli:apply_effect` takes `effect` as one object or an array. When a page says "single or list", both forms are valid — use whichever reads better.

## Next

- [Attribute modifier](/docs/datapack/data-types/attribute-modifier) — every operation, in full.
- [Text component](/docs/datapack/data-types/text-component) — naming powers and origins.
