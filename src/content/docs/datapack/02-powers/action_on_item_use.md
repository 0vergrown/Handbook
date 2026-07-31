---
title: "Action On Item Use (Power Type)"
description: "Executes an Entity Action Type or an Item Action Type when the player uses an item (e.g: eating food or drinking a potion)."
navigation_title: "Action On Item Use"
---

Executes an Entity Action Type or an Item Action Type when the player uses an item (e.g: eating food or drinking a potion).

Type ID: `apoli:action_on_item_use`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player after they use an item.
`item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the _remaining_ item.
`item_condition` | Item Condition Type | _optional_ | If specified, the actions will only execute if this condition is fulfilled by the item _before use._
`trigger` | [String](/docs/datapack/data-types/string) | `"finish"` | Defines when the action is executed, see below table for accepted values.
`priority` | Integer | `0` | Determines execution order when several of these powers fire on the same trigger (higher runs first), and which phase the power runs in: `priority >= 0` runs **before** the vanilla item logic of the trigger point, `priority < 0` runs **after** it.

## Triggers

Name | Description
-----|------------
`finish` | The action will execute when the entity finishes (as in, completes) using an item which has a use duration, such as eating food.
`start` | The action will execute when the entity starts using an item which has a use duration.
`stop` | The action will execute when the entity stops using an item which has a use duration, before the maximum use duration has been reached. Compared to `finish`, this can be used to detect shooting a bow, for example.
`during` | The action will be called every tick while the entity is using an item which has a use duration.
`instant` | The action will not fire for items with a use duration, but will instead fire when an item is used which triggers its effect instantly, such as an ender pearl or splash potion.

## Notes

- Actions run **server-side only**.
- `instant`/`start` powers with a negative `priority` (the after-vanilla phase) only fire if the use actually succeeded; the default before-phase fires when the use is attempted.
- Items blocked by `apoli:prevent_item_use` do not fire `instant`/`start` powers.

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

This example will give half a shank of hunger, and 1 saturation point if the player drinks any kind of potion.

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

This example will give the player 20 seconds of invisibility whenever they throw an ender pearl.
