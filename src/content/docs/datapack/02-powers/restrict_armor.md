---
title: "Restrict Armor (Power Type)"
description: "Stops the entity from equipping chosen items as armor in each armor slot."
navigation_title: "Restrict Armor"
aliases: ["conditioned_restrict_armor"]
---

Stops the entity that has the power from equipping chosen items as armor, whether by right-clicking, by a dispenser or by dragging the item into the slot. Each armor slot has its own condition.

Type ID: `apoli:restrict_armor`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `head` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, items that pass this condition can't be equipped in the head slot. |
| `chest` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, items that pass this condition can't be equipped in the chest slot. |
| `legs` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, items that pass this condition can't be equipped in the legs slot. |
| `feet` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, items that pass this condition can't be equipped in the feet slot. |

## What restricted means

The armor never goes on in the first place. Right-clicking it, dragging it into the slot and shift-clicking it into the slot are all refused, and nothing is thrown on the ground.

Armor that is already worn when the power is gained, or when its [`condition`](/docs/datapack/introduction/anatomy-of-a-power) turns on, is taken off and put back in the entity's own inventory. It is only dropped at the entity's feet if the inventory is full.

## Examples

```json
{
    "type": "apoli:restrict_armor",
    "head": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 2
    },
    "chest": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 5
    },
    "legs": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 4
    },
    "feet": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 1
    }
}
```

This stops the entity from equipping any armor with more defense than chainmail.

```json
{
    "type": "apoli:restrict_armor",
    "head": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:turtle_helmet"
        }
    },
    "chest": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:elytra"
        }
    }
}
```

This stops the entity from equipping a turtle shell or an Elytra.

> [!NOTE]
> `apoli:conditioned_restrict_armor` is this power. It is an alias for packs ported from the original Apoli, where the conditioned variant was a separate type. Every power here already accepts a top-level `condition`, so the alias can't do anything this type can't. A `tick_rate` field on an old power is ignored.
