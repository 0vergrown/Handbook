---
title: "Action On Tame (Power Type)"
description: "Runs a bi-entity action when the entity with the power tames an animal."
navigation_title: "Action On Tame"
---

Runs a bi-entity action when the entity with the power tames an animal. The actor is the tamer and the target is the animal, which already belongs to the tamer when the action runs.

Type ID: `apoli:action_on_tame`

It fires when a wolf, cat or parrot accepts the food it is offered, and when a horse, donkey, mule or llama stops bucking its rider off. Modded animals tamed through the same vanilla code fire it too. Animals tamed with [apoli:tame](/docs/datapack/bientity-actions/tame) or by commands don't.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | The action to run on the tamer, the animal or both. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the action only runs when the tamer and the animal pass this condition. |

## Examples

```json
{
    "type": "apoli:action_on_tame",
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:execute_command",
            "command": "attribute @s minecraft:generic.max_health modifier add example:tamer_bonus 0.3 add_multiplied_total"
        }
    }
}
```

Every animal the player tames gets 30% more maximum health for good. The modifier has a fixed ID, so taming the same animal again can't stack it. On 1.20.1 the command takes a UUID and a name in place of the ID, and `multiply` in place of `add_multiplied_total`.

```json
{
    "type": "apoli:action_on_tame",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:parrot"
        }
    },
    "bientity_action": {
        "type": "apoli:actor_action",
        "action": {
            "type": "apoli:add_xp",
            "points": 10
        }
    }
}
```

Taming a parrot gives the player 10 experience points.
