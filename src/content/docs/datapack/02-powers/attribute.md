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

## Reach on 1.20.1

`minecraft:player.block_interaction_range` and `minecraft:player.entity_interaction_range` are the attributes that control how far a player can reach. They were added to the game in 1.20.5, so on **1.20.1** they do not exist and a power naming them used to do nothing at all — silently, because a modifier on an unknown attribute is skipped.

Since Apoli 1.38.0 the 1.20.1 build **registers both of them itself** (as `apoli:player.block_interaction_range` and `apoli:player.entity_interaction_range`, with vanilla's `4.5` and `3.0` defaults) and answers to the `minecraft:` names as aliases, so the same power JSON works unchanged on 1.20.1, 1.21.1 and NeoForge:

```json
{
    "type": "apoli:attribute",
    "modifiers": [
        {
            "name": "Extra Reach block reach",
            "attribute": "minecraft:player.block_interaction_range",
            "value": 1.5,
            "operation": "addition"
        },
        {
            "name": "Extra Reach entity reach",
            "attribute": "minecraft:player.entity_interaction_range",
            "value": 1.5,
            "operation": "addition"
        }
    ]
}
```

> The backport drives the same four places vanilla 1.21 does: the client's block raycast, the client's entity pick range, and the server's block-use, block-break and entity-interaction distance checks. Server checks keep vanilla's leniency (block reach + 1.5, entity reach + 3.0), so with no modifier applied the limits are byte-for-byte vanilla's `36.0`.
>
> One 1.20.1-only limit: the client finds candidate entities inside the block raycast, so entity reach is effectively capped by block reach. Raise both together — as the example does — and it behaves as expected.

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
