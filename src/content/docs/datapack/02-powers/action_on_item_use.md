---
title: "Action On Item Use (Power Type)"
description: "Runs an entity action or an item action when the player uses an item, such as eating food or drinking a potion."
navigation_title: "Action On Item Use"
---

Runs an entity action or an item action when the player uses an item, such as eating food or drinking a potion.

Type ID: `apoli:action_on_item_use`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player after they use an item. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item that remains after use. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item passes this condition before it is used. |
| `trigger` | [String](/docs/datapack/data-types/string) | `"finish"` | When the actions run. The table below lists the values. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | The order when several of these powers fire on the same trigger (higher runs first), and which phase the power runs in. A `priority` of 0 or more runs before the vanilla item logic at the trigger point, and a negative `priority` runs after it. |

## Triggers

| Name | Description |
|------|-------------|
| `finish` | Runs when the entity finishes using an item that has a use duration, such as eating food. |
| `start` | Runs when the entity starts using an item that has a use duration. |
| `stop` | Runs when the entity stops using an item that has a use duration before reaching the maximum use duration. Unlike `finish`, this can detect shooting a bow, for example. |
| `during` | Runs every tick while the entity is using an item that has a use duration. |
| `instant` | Doesn't run for items with a use duration. It runs when the entity uses an item whose effect is instant, such as an ender pearl or a splash potion. |

## Notes

- The actions run on the server only.
- `instant` and `start` powers with a negative `priority`, which run after vanilla, only fire if the use succeeded. With the default priority they fire when the use is attempted.
- Items blocked by `apoli:prevent_item_use` don't fire `instant` or `start` powers.

## Examples

```json
{
    "type": "apoli:action_on_item_use",
    "entity_action": {
        "type": "apoli:feed",
        "food": 1.0,
        "saturation": 1.0
    },
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:potion"
        }
    }
}
```

This gives the player half a shank of hunger and 1 point of saturation whenever they drink any potion.

```json
{
    "type": "apoli:action_on_item_use",
    "trigger": "instant",
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:invisibility",
            "duration": 400,
            "amplifier": 0
        }
    },
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:ender_pearl"
        }
    }
}
```

This gives the player 20 seconds of invisibility whenever they throw an ender pearl.
