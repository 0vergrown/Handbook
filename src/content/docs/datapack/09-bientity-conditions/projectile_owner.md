---
title: "Projectile Owner (Bi-Entity Condition Type)"
description: "Checks whether the target is a projectile the actor owns."
navigation_title: "Projectile Owner"
---

Checks whether the target is a projectile — an arrow, trident, snowball, fireball, potion or any other projectile — and the actor is the entity that owns it, usually whoever shot or threw it.

Type ID: `apoli:projectile_owner`

Anything that is not a projectile fails, even when the actor owns it: a tamed wolf does not pass, and neither does an arrow someone else fired. [`apoli:owner`](/docs/datapack/bientity-conditions/owner) is the wider check that also covers tamed animals.

## Fields

_None._

## Examples

```json
{
    "type": "apoli:action_on_hit",
    "self_action": {
        "type": "apoli:area_of_effect",
        "radius": 8,
        "bientity_condition": {
            "type": "apoli:projectile_owner"
        },
        "bientity_action": {
            "type": "apoli:target_action",
            "action": {
                "type": "apoli:execute_command",
                "command": "kill @s"
            }
        }
    }
}
```

Every melee hit clears away the holder's own arrows and thrown projectiles within 8 blocks, and leaves everybody else's alone.
