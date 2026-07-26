---
title: "apoli:projectile"
description: "Checks whether the damage source was projectile damage, and optionally the type of projectile it was (if specified)."
---

Checks whether the damage source was projectile damage, and optionally the type of projectile it was (if specified).

Type ID: `apoli:projectile`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`projectile` | Identifier | _optional_ | If set, the check will only pass if the projectile was of an entity type with the specified namespace and ID.
`projectile_condition` | Entity Condition Type | _optional_ | If set, the check will only pass if the projectile entity fulfills this condition.

## Examples

```json
"damage_condition": {
    "type": "apoli:projectile",
    "projectile": "minecraft:spectral_arrow"
}
```

This example will check if the damage source is a Spectral Arrow projectile entity.

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

This example will check if the damage source is a burning arrow.
