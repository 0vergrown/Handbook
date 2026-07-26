---
title: "apoli:modify_falling"
description: "Modifies the falling velocity of the entity that has the power; can determine whether the entity should take fall damage or not."
---

Modifies the falling velocity of the entity that has the power; can determine whether the entity should take fall damage or not.

Type ID: `apoli:modify_falling`

> By default, the player falls at a speed of 0.08, or 0.01 if a Slow Falling status effect is present.


## Fields

Field | Type | Default | Description
------|------|---------|------------
`velocity` | [Float](/docs/datapack/data-types/float) | | Determines the speed of the falling velocity.
`take_fall_damage` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Determines whether the entity should take fall damage or not.


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
