---
title: "Prevent Bee Anger (Power Type)"
description: "Stops bees from turning on the entity that has the power when their hive is disturbed."
navigation_title: "Prevent Bee Anger"
---

Stops bees from turning on the entity that has the power when their hive is disturbed. It covers both ways vanilla angers a hive: breaking or otherwise disturbing a beehive block, and harvesting honey from one.

Type ID: `apoli:prevent_bee_anger`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only hives that fulfill this condition are affected — everything else angers its bees as usual.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the bees are only calmed when this condition holds. The **actor** is the entity that has the power and the **target** is the bee that would have been angered, so it is tested once per bee.
`bientity_action` | Bi-entity Action Type | _optional_ | Executed for each bee that was stopped from getting angry, with the same actor and target. Only runs when the hive is harvested, not when it is disturbed.

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

Bees four or more blocks away stay calm when this entity takes honey, and each of them is given Regeneration for five seconds. Bees closer than that still swarm.

> Only the bees that vanilla would have angered are considered — bees that were already hostile for another reason keep their target.
