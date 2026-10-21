---
title: "Attribute (Power Type)"
description: "Changes one or more attributes on the entity for as long as it has the power."
navigation_title: "Attribute"
aliases: ["conditioned_attribute", "modify_attribute"]
---

Changes one or more attributes on the entity for as long as it has the power.

Type ID: `apoli:attribute` (type alias: `apoli:conditioned_attribute`, for packs written for Apace's Apoli)

`apoli:conditioned_attribute` resolves to this type. In Apace's Apoli, `apoli:attribute` takes no `condition`, and `apoli:conditioned_attribute` is the separate type that does. Here every power accepts `condition` (see [Powers](/docs/datapack/introduction/powers)), so one type covers both.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier, applied to its `attribute`. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, each applied to its own `attribute`. |
| `update_health` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When a modifier changes `minecraft:generic.max_health`, scales the player's current health so the bar stays as full as it was. |

At least one of `modifier` or `modifiers` must be present. The `attribute` field inside each modifier is required for this power, and the codec rejects a modifier without one with a clear error.

## Reach on 1.20.1

`minecraft:player.block_interaction_range` and `minecraft:player.entity_interaction_range` are the attributes that control how far a player can reach. Vanilla added them in 1.20.5, so 1.20.1 doesn't have them.

The 1.20.1 build registers both itself, as `apoli:player.block_interaction_range` and `apoli:player.entity_interaction_range` with vanilla's defaults of `4.5` and `3.0`, and answers to the `minecraft:` names as aliases. The same power JSON works on 1.20.1, 1.21.1 and NeoForge:

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

> [!NOTE]
> On 1.20.1 these attributes control the same four checks vanilla 1.21 uses them for: the client's block raycast, the client's entity pick range, and the server's distance checks for using and breaking blocks and for interacting with entities. The server checks keep vanilla's leniency (block reach plus 1.5, entity reach plus 3.0), so with no modifier applied the limits match vanilla's `36.0` exactly.
>
> One limit is specific to 1.20.1: the client looks for entities inside the block raycast, so entity reach can't go past block reach. Raise both together, as the example does, and reach works as expected.

## Examples

A single modifier:

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

Several modifiers with a condition:

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

A modifier driven by an [apoli:resource](/docs/datapack/powers/resource) value, which links a vanilla attribute to the resource:

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

> [!NOTE]
> `apoli:modify_attribute` is this power, with the attribute moved out of the modifiers and written once at the top level. It is an alias kept for packs ported from the original Apoli, and [its page](/docs/datapack/powers/modify_attribute) shows the shape it takes. Prefer `apoli:attribute` in new packs, because when each modifier names its own attribute, one power can change several at once.
>
> `apoli:conditioned_attribute` is the same type as well, and the `condition` field it implies is available on every power.
