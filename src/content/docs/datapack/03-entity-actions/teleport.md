---
title: "Teleport (Entity Action Type)"
description: "Teleports the entity to a set of coordinates, optionally in another dimension."
navigation_title: "Teleport"
aliases: ["teleport_to"]
---

Teleports the entity to a set of coordinates, optionally in another dimension. It is `/teleport` in power form: the coordinates can be absolute or relative, and the teleport can be refused unless the destination passes a condition.

Type ID: `apoli:teleport` (alias `apoli:teleport_to`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `x`, `y`, `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | The destination, read as an offset from the entity's current position unless `relative` is `false`. |
| `relative` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether `x`, `y` and `z` are an offset from the entity (`true`) or world coordinates (`false`). `relative_to_position` is accepted as an alias. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | Which axes a relative offset is measured along. `local` turns with the entity, so `z: 5` is five blocks in front of it. Ignored when `relative` is `false`. |
| `dimension` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The dimension to teleport into. Defaults to the one the entity is already in. |
| `yaw`, `pitch` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The rotation to arrive with. Left as it is if not given. |
| `landing_block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The teleport only happens when the block below the destination passes this condition. |
| `landing_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The teleport only happens when the entity would pass this condition at the destination. It is tested as though the entity were already standing there, so everything that depends on where the entity is gets read at the destination: the fluid around it ([apoli:fluid_height](/docs/datapack/entity-conditions/fluid_height), [apoli:submerged_in](/docs/datapack/entity-conditions/submerged_in)), the block under it ([apoli:on_block](/docs/datapack/entity-conditions/on_block)), the blocks it overlaps and the sky above it. Skipped when the destination is in another dimension. |
| `loaded_chunks_only` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the teleport is refused when the destination chunk isn't loaded. Keep this on unless you know the chunk is loaded, because teleporting into unloaded terrain forces chunk generation on the server thread. |
| `success_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity once it has arrived. |
| `fail_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity when the teleport is refused by a condition, an unloaded chunk, a missing dimension or [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport). |

## Examples

```json
"entity_action": {
    "type": "apoli:teleport",
    "space": "local",
    "z": 5
}
```

A short blink, five blocks in the direction the entity is facing.

```json
"entity_action": {
    "type": "apoli:teleport",
    "y": 5,
    "landing_condition": {
        "type": "apoli:and",
        "conditions": [
            {
                "type": "apoli:in_block",
                "block_condition": { "type": "apoli:block", "block": "minecraft:air" }
            },
            {
                "type": "apoli:in_block",
                "block_condition": {
                    "type": "apoli:offset",
                    "y": 1,
                    "condition": { "type": "apoli:block", "block": "minecraft:air" }
                }
            }
        ]
    },
    "fail_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.note_block.bass"
    }
}
```

This teleports five blocks straight up, but only if both blocks the entity would occupy there are air. Otherwise nothing moves and a note plays.

```json
"entity_action": {
    "type": "apoli:teleport",
    "relative": false,
    "x": 0,
    "y": 64,
    "z": 0,
    "dimension": "minecraft:the_nether",
    "yaw": 180
}
```

This drops the entity at the Nether's origin, facing north.

> [!TIP]
> The coordinates are expressions, so they can read the entity. `"y": "y + 3"` is three blocks up in absolute terms, and `"x": "resource('example:anchor_x')"` reads a resource. See [Expressions](/docs/datapack/data-types/expression).
