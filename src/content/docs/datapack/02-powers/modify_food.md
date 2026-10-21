---
title: "Modify Food (Power Type)"
description: "Changes the food values of items the entity eats."
navigation_title: "Modify Food"
---

Changes the food the entity with the power eats, without replacing it. [apoli:edible_item](/docs/datapack/powers/edible_item) gives one item a whole new food component, while this power scales the values an item already has. One power can double the nutrition of every item in a tag, halve the eating time of everything, or strip the effects off raw meat.

Type ID: `apoli:modify_food`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the power only applies to items that pass this condition. Without it, the power applies to everything the entity eats. |
| `food_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the item's nutrition (hunger points). |
| `food_modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the item's nutrition. |
| `saturation_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the item's saturation modifier. |
| `saturation_modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the item's saturation modifier. |
| `eat_ticks_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to how long the item takes to eat, in ticks. |
| `eat_ticks_modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the eating time. |
| `always_edible` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, matching items can be eaten on a full hunger bar. `can_always_eat` is accepted too. |
| `prevent_effects` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, the status effects the food would apply are dropped. |
| `replace_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If set, the entity is left with this stack after eating instead of whatever the food would normally leave, such as a bowl, a bottle or nothing. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity after it eats a matching item. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | Runs on the stack that was eaten. |

> [!NOTE]
> The singular and plural spellings are the same field: `food_modifier` is read as a `food_modifiers` with one entry. Write whichever reads better, but not both.

## How it behaves

The power hooks into eating itself, so it applies to vanilla food, modded food and food from [apoli:edible_item](/docs/datapack/powers/edible_item) alike. Every matching power on the entity applies in turn, so two powers that each double nutrition quadruple it.

When the entity finishes eating something:

1. Every `apoli:modify_food` on the entity whose `condition` and `item_condition` pass is collected.
2. `food_modifiers` and `saturation_modifiers` are applied to the item's own values.
3. `prevent_effects` drops the effect list, and `replace_stack` overrides what the item turns into.
4. Hunger and saturation are restored, then the remaining effects roll.
5. `item_action` runs on the eaten stack, then `entity_action` runs on the eater.

`eat_ticks_modifiers` apply earlier, when the eating animation starts, because that is when the game asks how long the item takes.

> [!NOTE]
> `replace_stack` uses vanilla's "using converts to" slot, which only players have. Other entities eat the item normally and get nothing back.

## Examples

```json
{
    "type": "apoli:modify_food",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "minecraft:fishes"
        }
    },
    "food_modifiers": [
        {
            "operation": "multiply_base_multiplicative",
            "value": 1
        }
    ],
    "saturation_modifiers": [
        {
            "operation": "multiply_base_multiplicative",
            "value": 1
        }
    ]
}
```

This doubles both the hunger and the saturation of every item in the `minecraft:fishes` tag.

```json
{
    "type": "apoli:modify_food",
    "item_condition": {
        "type": "apoli:food"
    },
    "eat_ticks_modifier": {
        "operation": "multiply_base_multiplicative",
        "value": -0.5
    },
    "always_edible": true
}
```

This halves the eating time of anything edible and lets the entity eat on a full hunger bar.

```json
{
    "type": "apoli:modify_food",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "minecraft:meat"
        }
    },
    "prevent_effects": true,
    "food_modifiers": [
        {
            "operation": "multiply_base_multiplicative",
            "value": -0.5
        }
    ],
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:nausea",
            "duration": 100
        }
    }
}
```

Meat is half as filling, its own effects never apply, and eating it makes the entity nauseous.
