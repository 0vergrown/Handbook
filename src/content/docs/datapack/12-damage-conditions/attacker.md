---
title: "Attacker (Damage Condition Type)"
description: "Checks whether the damage came from an entity, optionally one that passes a condition."
navigation_title: "Attacker"
---

Checks whether the damage came from an entity, optionally one that passes an entity condition.

Type ID: `apoli:attacker`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The attacker must pass this condition. |

## Examples

```json
"damage_condition": {
    "type": "apoli:attacker",
    "entity_condition": {
        "type": "apoli:entity_type",
        "entity_type": "minecraft:zombie"
    }
}
```

This checks whether the attacker is a zombie, using [apoli:entity_type](/docs/datapack/entity-conditions/entity_type).
