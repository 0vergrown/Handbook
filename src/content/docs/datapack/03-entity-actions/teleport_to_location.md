---
title: "Teleport To Location (Entity Action Type)"
description: "Teleports the entity back to a position it saved earlier."
navigation_title: "Teleport To Location"
---

Teleports the entity back to a position recorded by [apoli:save_location](/docs/datapack/entity-actions/save_location), including its dimension and the rotation it was facing.

Type ID: `apoli:teleport_to_location`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | [String](/docs/datapack/data-types/string) | _required_ | The name the position was saved under. |
| `keep_rotation` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entity keeps facing the way it is now instead of using the saved rotation. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the saved position is forgotten once it has been used, for a recall that only works once. |
| `success_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity once it has arrived. |
| `fail_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity when nothing is saved under that name, when the saved dimension no longer exists, or when [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport) refuses the move. |

## Examples

```json
{
    "type": "apoli:action_on_key_press",
    "cooldown": 600,
    "entity_action": {
        "type": "apoli:teleport_to_location",
        "id": "example:recall",
        "success_action": {
            "type": "apoli:spawn_particles",
            "particle": "minecraft:portal",
            "count": 32
        },
        "fail_action": {
            "type": "apoli:execute_command",
            "command": "title @s actionbar {\"text\": \"Nowhere to recall to.\", \"color\": \"red\"}"
        }
    }
}
```

A recall to a saved anchor on a 30-second cooldown, with a message when there is nothing saved.

> [!TIP]
> Pair it with [apoli:has_location](/docs/datapack/entity-conditions/has_location) when you need to know before the key is pressed, for example to grey out a HUD icon or to make the power's own `condition` false while nothing is saved.
