---
title: "Prevent Bee Anger (Power Type)"
description: "Stops bees from turning on the entity that has the power when their hive is disturbed."
navigation_title: "Prevent Bee Anger"
---

Stops bees from turning on the entity that has the power when their hive is disturbed. It covers both ways vanilla angers a hive: breaking or otherwise disturbing a beehive block, and harvesting honey from one.

Type ID: `apoli:prevent_bee_anger`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, only hives that pass this condition are affected. Other hives anger their bees as usual. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, bees are only calmed while this condition holds. The actor is the entity with the power and the target is the bee that would have been angered, so the condition is tested once per bee. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs for each bee that was kept calm, with the same actor and target. It only runs when the hive is harvested, not when it is disturbed. |

## Examples

```json
{
    "type": "apoli:prevent_bee_anger"
}
```

Bees never turn on this entity, whatever it does to their hive.

```json
{
    "type": "apoli:prevent_bee_anger",
    "bientity_condition": {
        "type": "apoli:distance",
        "comparison": ">=",
        "compare_to": 4
    },
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:apply_effect",
            "effect": {
                "effect": "minecraft:regeneration",
                "duration": 100
            }
        }
    }
}
```

Bees four or more blocks away stay calm when this entity takes honey, and each of them gets Regeneration for five seconds. Bees closer than that still swarm.

> [!NOTE]
> Only the bees that vanilla would have angered are considered. Bees that were already hostile for another reason keep their target.
