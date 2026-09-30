---
title: "Raycast (Entity Condition Type)"
description: "Casts a ray to the direction where the entity is looking."
navigation_title: "Raycast"
---

Casts a ray to the direction where the entity is looking.

Type ID: `apoli:raycast`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`distance` | Float | _optional_ | Determines the maximum distance the raycast will travel, for both blocks and entities. When absent, the ray reaches as far as the entity can interact, exactly as for the [raycast action](/docs/datapack/entity-actions/raycast#notes).
`block` | Boolean | `true` | Determines whether the raycast should include blocks.
`entity` | Boolean | `true` | Determines whether the raycast should include entities.
`shape_type` | Shape Type | `"visual"` | Determines how the raycast will handle blocks.
`fluid_handling` | Fluid Handling | `"any"` | Determines how the raycast will handle fluids.
`space` | Space | `"world"` | Determines how the direction will be calculated. **Only used if &lt;code>direction&lt;/code> is specified.**
`direction` | Vector | _optional_ | If specified, determines the direction of the raycast. Otherwise, defaults to the direction at the entity is facing (as if `space` is `"local"`.)
`match_bientity_condition` | Bi-entity Condition Type | _optional_ | Decides which entities the ray can hit, with the checked entity as the actor and the candidate as the target. An entity that fails it is ignored — the ray passes through it.
`hit_bientity_condition` | Bi-entity Condition Type | _optional_ | Tested on the entity the ray hits, when that is the nearest hit. The condition passes only if this holds.
`entity_distance` | Float | _optional_ | Determines the distance of the raycast for entities if `entity` is set to `true`. Overrides `distance`; with neither set, the entity's `minecraft:player.entity_interaction_range` is used (3 for a player without reach bonuses).
`block_condition` | Block Condition Type | _optional_ | Tested on the block the ray hits, when that is the nearest hit. The condition passes only if this holds.
`block_distance` | Float | _optional_ | Determines the distance of the raycast for blocks if `block` is set to `true`. Overrides `distance`; with neither set, the entity's `minecraft:player.block_interaction_range` is used (4.5 for a player without reach bonuses).

The condition judges the **nearest** thing the ray hits: the closest entity that passes `match_bientity_condition`, or the first block, whichever comes first. It passes when that hit passes its own test — `hit_bientity_condition` for an entity, `block_condition` for a block — and fails when nothing is hit. A block always stops the ray, whether or not it passes `block_condition`, so an entity behind a wall is never seen.

## Examples

```json
"condition": {
    "type": "apoli:raycast",
    "distance": 6,
    "block": true,
    "entity": true,
    "shape_type": "visual",
    "fluid_handling": "any",
    "match_bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:wolf"
        }
    },
    "hit_bientity_condition": {
        "type": "apoli:owner"
    }
}
```

This example will check if a wolf mob is tamed by the entity that has fired the raycast. The raycast will ignore tamable mobs other than wolves.
