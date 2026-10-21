---
title: Data types
description: The value shapes that fields expect, such as modifiers, effects and text.
---

Data types are the smaller values that powers, actions and conditions are built from, such as an attribute modifier, a status effect, a piece of text or an item stack. A data type has the same shape wherever a field uses it, so you only learn each one once.

## What counts as a data type

A data type is any value a field expects that is more than a plain number or string. Some are objects, and some are strings with a special meaning:

| Data type | Looks like | Used by |
| --- | --- | --- |
| [Identifier](#identifier) | `"apoli:heal"` | every `type`, power IDs, tags |
| [Attribute modifier](/docs/datapack/data-types/attribute-modifier) | `{ operation, value, attribute }` | `apoli:attribute` |
| [Text component](/docs/datapack/data-types/text-component) | `"Fast"` or a JSON text object | `name`, `description` |
| [Status effect](/docs/datapack/data-types/status-effect-instance) | `{ effect, duration, amplifier }` | `apoli:apply_effect` |
| [Item stack](/docs/datapack/data-types/item-stack) | `{ item, count, components }` | item actions, `give` |
| [HUD render](/docs/datapack/data-types/hud-render) | `{ should_render, bar_index }` | resources and cooldowns |
| [Shape](/docs/datapack/data-types/shape) and [Space](/docs/datapack/data-types/space) | `"sphere"`, `"local"` | radius and velocity fields |
| [Comparison](#comparisons) | `"<="` with `compare_to` | `apoli:health`, resources |

## Identifier

An identifier names something in `namespace:path` form, such as `apoli:attribute`, `minecraft:diamond` or `my_pack:mana`. If you leave out the namespace, Minecraft assumes `minecraft:`. Identifiers are lowercase and case-sensitive.

## Comparisons

Numeric conditions and resource checks share a comparison shape: a `comparison` operator and a `compare_to` value.

```json
{ "comparison": ">=", "compare_to": 10 }
```

The operators are `<`, `<=`, `==`, `>=`, `>` and `!=`.

On [apoli:resource](/docs/datapack/entity-conditions/resource), `compare_to` also accepts an [Expression](/docs/datapack/data-types/expression), so a resource can be compared with another resource or an entity stat instead of a fixed number:

```json
{ "comparison": ">=", "compare_to": "example:spell_cost" }
```

## Single values or lists

Many fields accept either a single value or a list. `apoli:attribute` takes `modifier` for one modifier or `modifiers` for several, and `apoli:apply_effect` takes `effect` as one object or an array. When a page says "single or list", both forms work.

## Next

- [Attribute modifier](/docs/datapack/data-types/attribute-modifier) covers every operation.
- [Text component](/docs/datapack/data-types/text-component) covers names for powers and origins.
