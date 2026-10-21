---
title: "Projectile (Damage Condition Type)"
description: "Checks whether the damage came from a projectile, optionally of a given type or one that passes a condition."
navigation_title: "Projectile"
---

Checks whether the damage came from a projectile, optionally of a given entity type or one that passes an entity condition.

Type ID: `apoli:projectile`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `projectile` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The projectile must be of this entity type. |
| `projectile_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The projectile must pass this condition. |

## Examples

```json
"damage_condition": {
    "type": "apoli:projectile",
    "projectile": "minecraft:spectral_arrow"
}
```

This checks whether the damage came from a spectral arrow.

```json
"damage_condition": {
    "type": "apoli:projectile",
    "projectile_condition": {
      "type": "apoli:and",
      "conditions": [
        {
          "type": "apoli:entity_type",
          "entity_type": "minecraft:arrow"
        },
        {
          "type": "apoli:on_fire"
        }
      ]
    }
}
```

This checks whether the damage came from a burning arrow.
