---
title: "Attribute (Power Type)"
description: "Modifies one or more attributes on the entity for as long as the power is held."
navigation_title: "Attribute"
aliases: ["conditioned_attribute"]
---

Modifies one or more attributes on the entity for as long as the power is held.

Type ID: `apoli:attribute` (type-alias: `apoli:conditioned_attribute` for back-compat with Apace's packs)

> In Apace's Apoli, `apoli:attribute` did not accept a `condition` field; he later added `apoli:conditioned_attribute` as a parallel type that did. In this rewrite, `condition` is a property of every power (see [Power JSON Format](/docs/datapack/introduction/powers)), so the same single type accepts conditions and the `conditioned_attribute` id is just an alias.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to its `attribute`. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Multiple modifiers applied to their respective `attribute` fields. |
| `update_health` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When the modifier touches `minecraft:generic.max_health`, scale the player's current health so their fill ratio is preserved. |

At least one of `modifier` or `modifiers` must be present; the `attribute` field inside each modifier is required when the modifier is used by this power (otherwise the codec rejects it with a clear error).

## Examples

Single modifier:

```json
{
    "type": "apoli:attribute",
    "modifier": {
        "name": "Max health increase",
        "attribute": "minecraft:generic.max_health",
        "value": 4,
        "operation": "addition"
    }
}
```

Multiple modifiers with a condition:

```json
{
    "type": "apoli:attribute",
    "condition": {
        "type": "apoli:status_effect",
        "effect": "minecraft:strength"
    },
    "modifiers": [
        {
            "attribute": "minecraft:generic.attack_damage",
            "operation": "multiply_total",
            "value": 0.25
        },
        {
            "attribute": "minecraft:generic.movement_speed",
            "operation": "multiply_total",
            "value": 0.1
        }
    ]
}
```

Modifier driven by a resource value (links a vanilla attribute to a [apoli:resource](/docs/datapack/powers/resource)):

```json
{
    "type": "apoli:attribute",
    "modifier": {
        "attribute": "minecraft:generic.attack_damage",
        "operation": "addition",
        "resource": "example:rage"
    }
}
```
