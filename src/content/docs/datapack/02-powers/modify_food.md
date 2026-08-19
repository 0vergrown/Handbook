---
title: "Modify Food (Power Type)"
description: "Modifies the food values of items the holder eats."
navigation_title: "Modify Food"
---

Modifies the food the holder eats, without replacing it. Where [apoli:edible_item](/docs/datapack/powers/edible_item) hands one specific item a whole new food component, this scales the values an item already has — so a single power can double the nutrition of every item in a tag, halve everyone's eating time, or strip the effects off raw meat.

Type ID: `apoli:modify_food`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`item_condition` | Item Condition Type | _optional_ | If specified, the power only applies to items fulfilling this condition. **Omit it and the power applies to everything the holder eats.**
`food_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the item's nutrition (hunger shanks).
`food_modifiers` | [Array](/docs/datapack/data-types/array) of Attribute Modifier | _optional_ | Several modifiers applied to the item's nutrition.
`saturation_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the item's saturation modifier.
`saturation_modifiers` | [Array](/docs/datapack/data-types/array) of Attribute Modifier | _optional_ | Several modifiers applied to the item's saturation modifier.
`eat_ticks_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to how long the item takes to eat, in ticks.
`eat_ticks_modifiers` | [Array](/docs/datapack/data-types/array) of Attribute Modifier | _optional_ | Several modifiers applied to the eating time.
`always_edible` | Boolean | `false` | If `true`, the matching items can be eaten on a full hunger bar. Also accepted as `can_always_eat`.
`prevent_effects` | Boolean | `false` | If `true`, the status effects the food would apply are dropped.
`replace_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | If specified, the holder is left with this stack after eating instead of whatever the food would normally leave (bowls, bottles, nothing).
`entity_action` | Entity Action Type | _optional_ | Executed on the holder after eating a matching item.
`item_action` | Item Action Type | _optional_ | Executed on the stack that was eaten.

> The singular and plural spellings are the same field — `food_modifier` is read as a one-entry `food_modifiers`. Write whichever reads better; do not write both.

## How it behaves

The power hooks eating itself, so it applies to **vanilla food, modded food and [apoli:edible_item](/docs/datapack/powers/edible_item) food alike**. Every matching power on the holder is applied in turn, so two powers that each double nutrition quadruple it.

Order of operations when the holder finishes eating something:

1. Every `apoli:modify_food` on the holder whose `condition` and `item_condition` pass is collected.
2. `food_modifiers` and `saturation_modifiers` are applied to the item's own values.
3. `prevent_effects` drops the effect list; `replace_stack` overrides what the item converts into.
4. Hunger and saturation are restored, then the surviving effects roll.
5. `item_action` runs on the eaten stack, then `entity_action` on the eater.

`eat_ticks_modifiers` are applied earlier — when the eating animation starts — because that is when the game asks how long the item takes.

> `replace_stack` uses vanilla's "using converts to" slot, which only players get. A non-player holder eats the item normally and receives nothing back.

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

Doubles both the hunger and the saturation of every item in the `minecraft:fishes` tag.

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

Halves the eating time of anything edible, and lets the holder eat on a full hunger bar.

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

Meat is half as filling, its own effects never apply, and eating it makes the holder nauseous.
