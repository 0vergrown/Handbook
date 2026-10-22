---
title: "Modify Projectile Divergence (Power Type)"
description: "Changes how far the projectiles the entity shoots stray from where it aims."
navigation_title: "Modify Projectile Divergence"
---

Changes how far the projectiles the entity with the power shoots stray from where it aims. Every projectile gets a random nudge when it is launched, and divergence is how big that nudge can be.

Type ID: `apoli:modify_projectile_divergence`

It covers every projectile the entity launches through the game's aiming code: arrows from bows and crossbows, tridents, snowballs, eggs, ender pearls, thrown potions and the projectiles of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile). A player's bows and throws have a divergence of `1`. Mobs can hold the power as well, so a skeleton with it can be made a better shot.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the divergence. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the divergence. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the modifiers only apply when the shooter and the projectile pass this condition. The actor is the shooter and the target is the projectile. |

The result is never lower than `0`, which means no stray at all. The side arrows of a Multishot crossbow keep their fixed angle, since that isn't divergence.

## Examples

```json
{
    "type": "apoli:modify_projectile_divergence",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

Everything the player shoots or throws flies exactly where they aim.

```json
{
    "type": "apoli:modify_projectile_divergence",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:snowball"
        }
    },
    "modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 4
    }
}
```

The player's snowballs spray five times as wide as usual, while their arrows stay as accurate as ever.
