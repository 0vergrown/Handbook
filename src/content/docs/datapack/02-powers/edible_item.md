---
title: "Edible Item (Power Type)"
description: "Makes an item edible for the entity that has the power."
navigation_title: "Edible Item"
---

Makes an item edible for the entity that has the power. The item can be one that isn't food at all, or a food whose vanilla values you want to replace. Only the entity with the power can eat it, and nobody else's stack changes.

Type ID: `apoli:edible_item`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they eat the item. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item the player eats. |
| `result_item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the item given to the player after eating. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, only items that pass this condition become edible and run the actions. |
| `food_component` | [Food Component](/docs/datapack/data-types/food-component) | | The food values the item gives when eaten. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, this item stack is given to the player. |
| `consume_animation` | [String](/docs/datapack/data-types/string) | `"eat"` | The animation while consuming: `"eat"`, which shows particles based on the item, or `"drink"`, which shows none. |
| `consume_sound` | [Identifier](/docs/datapack/data-types/identifier) | `"minecraft:entity.generic.eat"` | The sound event played when the item is eaten. Sounds that only a resource pack defines work too. |
| `consuming_time_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to how long the item takes to eat, in ticks. |
| `consuming_time_modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to how long the item takes to eat, in ticks. |

## How it behaves

Right-clicking a matching stack starts the eating animation, exactly as if the item were food. When it finishes:

1. `consume_sound` plays (`minecraft:entity.generic.eat` unless you change it).
2. The hunger and saturation from `food_component` are applied, and its effects roll.
3. `item_action` runs on the stack being eaten, then `entity_action` runs on the eater.
4. One item is consumed.
5. If `result_stack` is set, `result_item_action` runs on it and the player gets it. It replaces the stack in hand if that stack is now empty, and otherwise goes into the inventory, or drops if the inventory is full.

`item_condition` is what limits the power to particular items. Without it, every item in the game becomes edible for the entity, which is almost never what you want.

`always_edible` on the food component decides whether the item can be eaten on a full hunger bar. `snack` halves the eating time (16 ticks instead of 32) before `consuming_time_modifier` is applied.

> [!NOTE]
> This power takes priority over vanilla food, so it can replace an existing food's values. It doesn't affect other players or mobs eating the same item.

> [!TIP]
> To scale food values instead of replacing them, such as doubling the nutrition of a whole tag, use [apoli:modify_food](/docs/datapack/powers/modify_food). It also applies on top of anything `apoli:edible_item` makes edible, so the two work together.

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

This lets the player eat a bucket of axolotl. It gives 4 hunger points and 8 saturation (4 * 1 * 2), counts as meat, uses the eating animation and leaves a water bucket behind.

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

This replaces the food values of cookies. A cookie takes 3 times as long to eat and gives 4 hunger points and 3.2 saturation (4.0 * 0.4 * 2).
