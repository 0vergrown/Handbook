---
title: "Raycast (Entity Condition Type)"
description: "Casts a ray where the entity is looking and checks what it hits first."
navigation_title: "Raycast"
---

Casts a ray in the direction the entity is looking and checks what it hits first.

Type ID: `apoli:raycast`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The maximum distance the ray travels, for both blocks and entities. Without it, the ray reaches as far as the entity can interact, exactly as for the [raycast action](/docs/datapack/entity-actions/raycast#notes). |
| `block` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the ray can hit blocks. |
| `entity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the ray can hit entities. |
| `shape_type` | [Shape Type](/docs/datapack/data-types/shape-type) | `"visual"` | Which block shape the ray collides with. |
| `fluid_handling` | [Fluid Handling](/docs/datapack/data-types/fluid-handling) | `"any"` | How the ray treats fluids. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | How the direction is worked out. Only used when `direction` is set. |
| `direction` | [Vector](/docs/datapack/data-types/vector) | _optional_ | The direction of the ray. Without it, the ray goes the way the entity is facing, as if `space` were `"local"`. |
| `match_bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Decides which entities the ray can hit, with the checked entity as the actor and the candidate as the target. An entity that fails it is ignored, and the ray passes through it. |
| `hit_bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Tested on the entity the ray hits, when that is the nearest hit. The condition only passes if this holds. |
| `entity_distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The distance of the ray for entities, when `entity` is `true`. It overrides `distance`, and with neither set, the entity's `minecraft:player.entity_interaction_range` is used (3 for a player without reach bonuses). |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Tested on the block the ray hits, when that is the nearest hit. The condition only passes if this holds. |
| `block_distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The distance of the ray for blocks, when `block` is `true`. It overrides `distance`, and with neither set, the entity's `minecraft:player.block_interaction_range` is used (4.5 for a player without reach bonuses). |

The condition judges the nearest thing the ray hits: the closest entity that passes `match_bientity_condition`, or the first block, whichever comes first. It passes when that hit passes its own test (`hit_bientity_condition` for an entity, `block_condition` for a block) and fails when nothing is hit. A block always stops the ray, whether or not it passes `block_condition`, so an entity behind a wall is never seen.

The three distance fields accept an [expression](/docs/datapack/data-types/expression), evaluated against the entity the condition tests.

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

This checks whether the wolf the entity is looking at is tamed by that entity. The ray ignores every mob that isn't a wolf.
