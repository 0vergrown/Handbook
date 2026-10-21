---
title: "Explode (Block Action Type)"
description: "Creates an explosion of a given power at the block's position."
navigation_title: "Explode"
---

Creates an explosion of a given power at the block's position.

Type ID: `apoli:explode`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Float](/docs/datapack/data-types/float) | _required_ | The power of the explosion. |
| `destruction_type` | [Destruction Type](/docs/datapack/data-types/destruction-type) | `"break"` | What the explosion does to the terrain. |
| `damage_targets` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether entities caught in the blast take damage. `false` still breaks blocks and applies knockback. |
| `indestructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Blocks that pass this condition aren't destroyed by the explosion. |
| `destructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Only blocks that pass this condition are destroyed by the explosion. |
| `create_fire` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the explosion starts fires. |

## Examples

```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "none",
    "create_fire": false
}
```

This creates an explosion at the block's position that neither damages the terrain nor starts fires.

```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "break",
    "destructible": {
        "type": "apoli:in_tag",
        "tag": "minecraft:impermeable"
    },
    "create_fire": false
}
```

This creates an explosion at the block's position that only destroys blocks in the `#minecraft:impermeable` block tag (`data/minecraft/tags/blocks/impermeable.json`).
