---
title: "Modify Falling (Power Type)"
description: "Modifies the falling velocity of the entity that has the power; can determine whether the entity should take fall damage or not."
navigation_title: "Modify Falling"
---

Modifies the falling velocity of the entity that has the power; can determine whether the entity should take fall damage or not.

Type ID: `apoli:modify_falling`

> By default, the player falls at a speed of 0.08, or 0.01 if a Slow Falling status effect is present.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`velocity` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The falling gravity to use. The lowest value wins when several `apoli:modify_falling` powers apply at once, and vanilla gravity is one of the candidates, so this can only slow a fall down.
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the gravity that survives the `velocity` step. Unlike `velocity` this can speed a fall up.
`modifiers` | array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order.
`take_fall_damage` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Determines whether the entity should take fall damage or not.

`velocity` runs first and clamps the gravity down; the modifiers from every applying power are then
gathered and applied to the result, so a power with only modifiers scales vanilla gravity directly. A
power with neither field does nothing but still honours `take_fall_damage`.

`take_fall_damage: false` cancels the damage on the landing tick, and only then. The fall distance
keeps counting up all the way down, so [apoli:fall_distance](/docs/datapack/entity-conditions/fall_distance),
the `fall_distance` expression variable and
[apoli:action_on_land](/docs/datapack/powers/action_on_land) all still see a real fall.

## Examples

```json
{
    "type": "apoli:modify_falling",
    "velocity": 1.0,
    "take_fall_damage": false,
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

This example will make the player fall faster and not take fall damage if they're sneaking.

Gravity as a fraction of vanilla, which a plain `velocity` cannot express:

```json
{
    "type": "apoli:modify_falling",
    "modifier": {
        "operation": "multiply_base_multiplicative",
        "value": -0.5
    }
}
```

An expression reads the entity's own state, so a fall can get gentler the emptier a resource is:

```json
{
    "type": "apoli:modify_falling",
    "velocity": "0.08 * (1 - resource('mypack:glide_charge') / 20)",
    "take_fall_damage": false
}
```
