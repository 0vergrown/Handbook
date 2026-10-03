---
title: "Modify Use Slowdown (Power Type)"
description: "Changes how much using an item, like raising a shield or drawing a bow, slows the player down."
navigation_title: "Modify Use Slowdown"
---

Changes how much using an item slows the player down. Raising a shield, drawing a bow, eating and anything else with a use action multiply the player's movement input by `0.2`; this power modifies that number.

Type ID: `apoli:modify_use_slowdown`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A modifier applied to the slowdown factor.
`modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the slowdown factor.
`item_condition` | Item Condition Type | _optional_ | If specified, the power only applies while the item being used passes this condition. Without it, every use action is affected.

The factor starts at vanilla's `0.2` and the result is clamped between `0` and `1`: `1.0` means no slowdown at all, `0.0` means the player cannot move while using anything. When several of these powers apply, each one's modifiers are applied to the same value in turn.

## Examples

```json
{
    "type": "apoli:modify_use_slowdown",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": { "item": "minecraft:shield" }
    },
    "modifier": {
        "operation": "set_total",
        "value": 1.0
    }
}
```

The player walks at full speed with a shield raised.

```json
{
    "type": "apoli:modify_use_slowdown",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": { "item": "minecraft:bow" }
    },
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

Drawing a bow costs far less speed: the factor goes from `0.2` to `0.6`.

> Vanilla slows the movement *input* rather than the movement speed attribute, so an [apoli:attribute](/docs/datapack/powers/attribute) power on `minecraft:generic.movement_speed` cannot cancel this slowdown cleanly. The slowdown is worked out on the player's own client, so the power's `condition` and `item_condition` must be things the client can check — powers, resources, equipment and item conditions all work. The power only affects players.
