---
title: "Share Effects (Power Type)"
description: "When the entity with the power gains a status effect, nearby entities you pick gain a copy of it."
navigation_title: "Share Effects"
---

When the entity with the power gains a status effect, nearby entities you pick gain a copy of it, with the same level and duration.

Type ID: `apoli:share_effects`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `radius` | [Vector](/docs/datapack/data-types/vector) | `8` | How far from the entity's hitbox others can be and still get the effect: a single number, or `{"x":.., "y":.., "z":..}` for a separate distance on each axis. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, only entities that pass this condition get the effect. The actor is the entity with the power and the target is the entity that would get it. |
| `effects` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Only shares these effects. An entry starting with `#` names an effect tag. Leave it out to share every effect. `effect` is accepted as another spelling. |
| `category` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | _optional_ | Only shares effects in these categories: `beneficial`, `harmful` or `neutral`. |
| `include_ambient` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether effects from beacons and conduits are shared too. |

## How it behaves

- An effect counts as gained when it is applied, and also when an effect the entity already has is replaced by a stronger or longer one.
- Entities that can't have the effect, such as an undead mob and poison, are skipped.
- A copy that an entity gets this way is never passed on again, so two entities with the power can't bounce an effect back and forth.

## Examples

```json
{
    "type": "apoli:share_effects",
    "radius": {
        "x": 8,
        "y": 2,
        "z": 8
    },
    "bientity_condition": {
        "type": "apoli:all_of",
        "conditions": [
            {
                "type": "apoli:owner"
            },
            {
                "type": "apoli:target_condition",
                "condition": {
                    "type": "apoli:tamed"
                }
            }
        ]
    }
}
```

When the player drinks a potion or gains any other effect, their tamed wolves, cats and parrots within 8 blocks get it too.

```json
{
    "type": "apoli:share_effects",
    "radius": 5,
    "category": "beneficial",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:player"
        }
    }
}
```

Every beneficial effect the player gains is also given to the other players within 5 blocks.
