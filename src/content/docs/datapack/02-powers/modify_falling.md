---
title: "Modify Falling (Power Type)"
description: "Changes how fast the entity falls, and whether it takes fall damage."
navigation_title: "Modify Falling"
---

Changes how fast the entity that has the power falls, and whether it takes fall damage. Vanilla gravity is 0.08, or 0.01 with Slow Falling.

Type ID: `apoli:modify_falling`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `velocity` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The gravity to fall with. When several `apoli:modify_falling` powers apply, the lowest value wins, and vanilla gravity is one of the candidates, so `velocity` can only slow a fall down. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the gravity left after the `velocity` step. Unlike `velocity`, a modifier can make a fall faster. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order. |
| `take_fall_damage` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the entity takes fall damage. |

`velocity` runs first and lowers the gravity. The modifiers from every power that applies are then gathered and applied to the result, so a power with only modifiers scales vanilla gravity directly. A power with neither field still applies `take_fall_damage`.

`take_fall_damage: false` cancels the damage on the landing tick and nowhere else. The fall distance keeps counting all the way down, so [apoli:fall_distance](/docs/datapack/entity-conditions/fall_distance), the `fall_distance` expression variable and [apoli:action_on_land](/docs/datapack/powers/action_on_land) all still see a real fall.

## Examples

```json
{
    "type": "apoli:modify_falling",
    "modifier": {
        "operation": "multiply_base_multiplicative",
        "value": 1.0
    },
    "take_fall_damage": false,
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

While sneaking, the player falls twice as fast and takes no fall damage.

Gravity as a fraction of vanilla, which `velocity` alone can't express:

```json
{
    "type": "apoli:modify_falling",
    "modifier": {
        "operation": "multiply_base_multiplicative",
        "value": -0.5
    }
}
```

An expression reads the entity's own state, so the fall gets gentler as the resource fills up:

```json
{
    "type": "apoli:modify_falling",
    "velocity": "0.08 * (1 - resource('mypack:glide_charge') / 20)",
    "take_fall_damage": false
}
```
