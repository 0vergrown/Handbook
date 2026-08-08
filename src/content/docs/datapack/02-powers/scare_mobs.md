---
title: "Scare Mobs (Power Type)"
description: "Nearby mobs flee from the entity that has the power, the way creepers run from cats."
navigation_title: "Scare Mobs"
---

Nearby mobs run away from the entity that has the power, the way creepers flee from cats. Only mobs that can pathfind are affected.

Type ID: `apoli:scare_mobs`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | *optional* | Which mobs are scared. The **actor** is the entity with the power, the **target** is the mob deciding whether to flee. Without it, every mob flees.
`radius` | Double | `6.0` | How close the mob has to be before it starts fleeing.
`speed` | Double | `1.0` | Movement speed multiplier while fleeing.

> A creeper that is fleeing never reaches you, so it never ignites — but it will still retaliate normally if you attack it first.

> The check is skipped outright while nobody in the game has this power, so it costs nothing on servers that do not use it.

## Examples

```json
{
    "type": "apoli:scare_mobs",
    "radius": 6.0,
    "speed": 1.2,
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:creeper"
        }
    }
}
```

Creepers within 6 blocks flee, slightly faster than they walk.
