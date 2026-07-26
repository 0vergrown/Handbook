---
title: "apoli:attacker"
description: "Checks whether the damage source is from an entity."
---

Checks whether the damage source is from an entity.

Type ID: `apoli:attacker`


## Fields

| Field              | Type                  | Default    | Description                                                                                                                  |
|--------------------|-----------------------|------------|------------------------------------------------------------------------------------------------------------------------------|
| `entity_condition` | Entity Condition Type | _optional_ | If set, the attacker entity must fulfill the provided entity condition type in order for this condition to evaluate to true. |

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
This example will check if the attacker is a Zombie entity, with the [apoli:entity_type](/docs/datapack/entity-conditions/entity_type).
