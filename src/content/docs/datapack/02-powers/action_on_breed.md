---
title: "Action On Breed (Power Type)"
description: "Runs actions when animals the entity with the power fed have a baby."
navigation_title: "Action On Breed"
---

Runs actions when animals the entity with the power fed have a baby. The power belongs to the breeder: the player who put one of the parents in love, the same player the game credits with the breeding.

Type ID: `apoli:action_on_breed`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the breeder as the actor and the baby as the target. |
| `parents_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the parent that had the baby as the actor and its mate as the target. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions only run when the breeder and the baby pass this condition. |

## How it behaves

The actions run once the baby is in the world, after the parents have been given their breeding cooldown and the experience orbs have dropped. `bientity_action` runs first, then `parents_action`.

Only animals that give birth fire it. Frogs, turtles and sniffers lay eggs or spawn instead, so they don't.

A baby made by the power's own `parents_action`, for example with [apoli:breed](/docs/datapack/bientity-actions/breed), doesn't fire the same power again, so an extra baby can't turn into a chain of them. The breeder's other `action_on_breed` powers still fire for it.

## Examples

```json
{
    "type": "apoli:action_on_breed",
    "parents_action": {
        "type": "apoli:random_chance",
        "chance": 0.2,
        "action": {
            "type": "apoli:breed"
        }
    }
}
```

Animals the player breeds have a 20% chance of twins.

```json
{
    "type": "apoli:action_on_breed",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:sheep"
        }
    },
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:execute_command",
            "command": "data merge entity @s {Color:14}"
        }
    }
}
```

Lambs the player breeds are always born red.
