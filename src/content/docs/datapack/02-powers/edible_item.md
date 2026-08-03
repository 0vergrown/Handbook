---
title: "Edible Item (Power Type)"
description: "Makes an item edible."
navigation_title: "Edible Item"
---

Makes an item edible for the holder — either an item that isn't food at all, or an item whose vanilla food values you want to replace. Only the holder can eat it; nobody else's stack changes.

Type ID: `apoli:edible_item`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player upon consuming an item.
`item_action`| Item Action Type | _optional_ | If specified, this action will be executed on the item consumed by the player.
`result_item_action` | Item Action Type | _optional_ | If specified, this action will be executed on the item that is given to the player as a result of consuming an item.
`item_condition` | Item Condition Type | _optional_ | If specified, will only make the item edible and the specified actions will only be executed if this condition is fulfilled by the item.
`food_component`| [Food Component](/docs/datapack/data-types/food-component) |  | The food component that the item grants upon eating it.
`result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, this item stack will be given to the player.
`consume_animation` | [String](/docs/datapack/data-types/string) | `"eat"` | Determines whether the animation effect for consuming the item should be "eating" (`"eat"`, displays particle effects based on the item) or "drinking" (`"drink"`, no particle effects.)
`consume_sound` | [Identifier](/docs/datapack/data-types/identifier) | `"minecraft:entity.generic.eat"`  | If specified, the sound event with this namespace and ID will be played when the item is eaten.
`consuming_time_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | *optional* | If specified, this modifier will be applied on the maximum time the item is being consumed (in ticks).
`consuming_time_modifiers` | [Array](/docs/datapack/data-types/array) of Attribute Modifier | *optional* | If specified, these modifiers will be applied on the the maximum time the item is being consumed (in ticks).

## How it behaves

Right-clicking a matching stack starts the eating animation, exactly as if the item were food. When it finishes:

1. `consume_sound` plays (`minecraft:entity.generic.eat` unless you change it).
2. `food_component`'s hunger and saturation are applied, and its effects roll.
3. `item_action` runs on the stack being eaten, then `entity_action` on the eater.
4. One item is consumed.
5. If `result_stack` is set, `result_item_action` runs on it and it is given to the player — replacing the stack in hand if that stack is now empty, otherwise going to the inventory (or dropping if the inventory is full).

`item_condition` is what limits the power to particular items. **Omit it and every item in the game becomes edible** for the holder, which is almost never what you want.

`always_edible` on the food component controls whether you can eat on a full hunger bar; `snack` halves the eating time (16 ticks instead of 32) before `consuming_time_modifier` is applied.

> This power takes priority over vanilla food, so it can be used to *replace* an existing food's values. It does not affect other players or mobs eating the same item.

## Examples
```json
{
    "type": "apoli:edible_item",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:axolotl_bucket"
        }
    },
    "food_component": {
        "hunger": 4,
        "saturation": 1,
        "meat": true
    },
    "use_action": "eat",
    "result_stack": {
        "item": "minecraft:water_bucket",
        "amount": 1
    }
}
```

This example will grant the players the ability to eat axolotls in buckets. It will give 4 hunger shanks and 8 saturation (4 * 1 * 2), it also counts as meat. This returns a water bucket upon consumption and uses the eat action.

```json
{
    "type": "apoli:edible_item",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:cookie"
        }
    },
    "food_component": {
        "hunger": 4.0,
        "saturation": 0.4,
        "snack": true
    },
    "use_action": "eat",
    "consuming_time_modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 2
    },
    "priority": 1
}
```

This example will replace the food component of Cookies, making it take 3 times longer to eat while also giving 4 hunger shanks and 3.2 saturation (4.0 * 0.4 * 2).
