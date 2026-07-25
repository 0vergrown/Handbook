---
title: apoli:attribute
description: Change an entity's attributes — speed, max health, attack damage and more.
---

`apoli:attribute` applies one or more [attribute modifiers](/docs/datapack/data-types/attribute-modifier) to the entity for as long as the power is active. It's the workhorse behind most stat changes: extra hearts, faster movement, weaker punches.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifiers` | list of [attribute modifier](/docs/datapack/data-types/attribute-modifier) | `[]` | The modifiers to apply. |
| `modifier` | [attribute modifier](/docs/datapack/data-types/attribute-modifier) | — | Shorthand for a single modifier. |
| `update_health` | boolean | `true` | Rescale current health when max health changes. |

Use `modifier` for one, `modifiers` for several — you can mix both and they're combined.

## Example — more hearts

```json
{
  "type": "apoli:attribute",
  "name": "Sturdy",
  "description": "Five extra hearts.",
  "modifier": {
    "attribute": "minecraft:generic.max_health",
    "operation": "add_base_early",
    "value": 10
  }
}
```

`value` is in half-hearts here, so `10` is five hearts. With `update_health` left at its default, the entity's current health scales up too, so they don't have to eat to fill the new hearts.

## Example — faster, but only sprinting

Combine several modifiers, and gate the whole power with a top-level [condition](/docs/datapack/conditions/overview):

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    { "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_total_multiplicative", "value": 0.3 },
    { "attribute": "minecraft:generic.step_height",
      "operation": "add_base_early", "value": 0.5 }
  ],
  "condition": { "type": "apoli:sprinting" }
}
```

## Operations at a glance

The `operation` decides *how* the value is applied. The three you'll reach for most:

| Operation | Effect |
| --- | --- |
| `add_base_early` | Adds a flat amount (`+10` max health). |
| `multiply_base_additive` | Adds a percentage of the base value. |
| `multiply_total_multiplicative` | Scales the final value (`×1.3` speed). |

The [attribute modifier](/docs/datapack/data-types/attribute-modifier) page lists every operation and the legacy aliases (`addition`, `multiply_base`, `multiply_total`).

## See also

- [Attribute modifier](/docs/datapack/data-types/attribute-modifier) — the data type this power applies.
- [`apoli:multiple`](/docs/datapack/powers/multiple) — combine this with other powers.
