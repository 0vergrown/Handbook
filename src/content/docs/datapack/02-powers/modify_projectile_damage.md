---
title: "Modify Projectile Damage (Power Type)"
description: "Changes how much damage the entity's projectiles deal."
navigation_title: "Modify Projectile Damage"
---

Changes how much damage projectiles fired by the entity with the power deal.

Type ID: `apoli:modify_projectile_damage`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | If set, the modifiers and actions only apply when the damage passes this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the damage. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the damage. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, the modifiers and actions only apply when the entity that was hit passes this condition. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity with the power whenever the modifiers are applied. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity that was hit whenever the modifiers are applied. |

## Examples

```json
{
    "type": "apoli:modify_projectile_damage",
    "damage_condition": {
        "type": "apoli:projectile",
        "projectile": "minecraft:spectral_arrow"
    },
    "modifier": {
        "operation": "addition",
        "value": 8.0
    }
}
```

This makes spectral arrows shot by the entity deal 4 extra hearts of damage.
