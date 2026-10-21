---
title: "Action On Land (Power Type)"
description: "Runs an entity action when the entity lands after falling."
navigation_title: "Action On Land"
---

Runs an entity action when the entity lands on the ground after being in the air.

Type ID: `apoli:action_on_land`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | | The action to run on the entity. |

The action runs on the tick the entity touches the ground after an actual fall, just before any fall damage is dealt. Anything that only cancels the damage still lets the action run, such as `take_fall_damage: false` on [apoli:modify_falling](/docs/datapack/powers/modify_falling), Slow Falling or Feather Falling. Anything that resets the fall distance in mid-air means there is no fall left to land from, so the action doesn't run. That includes entering water, an [apoli:set_fall_distance](/docs/datapack/entity-actions/set_fall_distance) of `0` and climbing a ladder.

## Examples

```json
{
    "type": "apoli:action_on_land",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "fill ~1 ~-1 ~1 ~-1 ~-1 ~-1 minecraft:air replace minecraft:grass_block"
    },
    "condition": {
        "type": "apoli:fall_distance",
        "comparison": ">",
        "compare_to": 4
    }
}
```

When the entity lands after falling more than 4 blocks, this uses [apoli:execute_command](/docs/datapack/entity-actions/execute_command) to run a `/fill` that replaces the grass blocks in a 3 by 3 area under its feet with air.
