---
title: "origins:raycast"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Casts a ray to the direction where the entity is looking.

Type ID: `origins:raycast`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`distance` | Float | _optional_ | Determines the maximum distance the ray-cast will travel.
`block` | Boolean | `true` | Determines whether the ray-cast should include blocks.
`entity` | Boolean | `true` | Determines whether the ray-cast should include entities.
`shape_type` | Shape Type | `"visual"` | Determines how the ray-cast will handle blocks.
`fluid_handling` | Fluid Handling | `"any"` | Determines how the ray-cast will handle fluids.
`space` | Space | `"world"` | Determines how the direction will be calculated. **Only used if &lt;code>direction&lt;/code> is specified.**
`direction` | Vector | _optional_ | If specified, determines the direction of the raycast. Otherwise, defaults to the direction at the entity is facing (as if `space` is `"local"`.)
`match_bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the entity condition type will check if this bi-entity condition type is fulfilled by either or both the 'actor' (the entity being checked by the entity condition type) and 'target' (entity that the ray-cast has gone through). If not, the entity will be ignored.
`hit_bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the entity condition type will check if this bi-entity condition type is fulfilled by either or both the 'actor' (the entity being checked by the entity condition type) and 'target' (the entity that has hit by the ray-cast).
`entity_distance` | Float | _optional_ | Determines the distance of the raycast for entities if `entity` is set to `true`. If absent, it will use the higher value between the entity's attack range (with Reach Entity Attributes compatibility) or the `distance` field.
`block_condition` | Block Condition Type | _optional_ | If specified, the entity condition type will check if the block that was hit by the ray-cast fulfills this block condition type.
`block_distance` | Float | _optional_ | Determines the distance of the raycast for blocks if `block` is set to `true`. If absent, it will use the higher value between the entity's block reach (with Reach Entity Attributes compatibility) or the `distance` field.


## Examples

```json
"condition": {
    "type": "origins:raycast",
    "distance": 6,
    "block": true,
    "entity": true,
    "shape_type": "visual",
    "fluid_handling": "any",
    "match_bientity_condition": {
        "type": "origins:target_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:wolf"
        }
    },
    "hit_bientity_condition": {
        "type": "origins:owner"
    }
}
```

This example will check if a wolf mob is tamed by the entity that has fired the ray-cast. The ray-cast will ignore tamable mobs other than wolves.

