---
title: "apoli:explode"
description: "Creates an explosion in the world, with control over where it originates and how it interacts with blocks."
---

Creates an explosion in the world, with control over where it originates and how it interacts with blocks. Damage attribution and kill credit go to the **actor**.

Type ID: `apoli:explode`

## Fields

| Field              | Type                                                                                                    | Default     | Description                                                                                                   |
|--------------------|---------------------------------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------|
| `power`            | [Float](/docs/datapack/data-types/float)                               | *required*  | The blast radius/power of the explosion                                                                        |
| `destruction_type` | [String](/docs/datapack/data-types/string)                             | `"destroy"` | How the explosion affects blocks. Accepted values: `"none"`, `"break"`, `"destroy"`                           |
| `create_fire`      | [Boolean](/docs/datapack/data-types/boolean)                           | `false`     | Whether the explosion places fire in the blast area                                                            |
| `at_target`        | [Boolean](/docs/datapack/data-types/boolean)                          | `false`     | If `true`, the explosion originates at the **target's** position; otherwise it originates at the **actor's**  |
| `indestructible`   | Block Condition                 | *optional*  | Block condition for blocks that are protected from the explosion regardless of `destruction_type`              |
| `destructible`     | Block Condition                 | *optional*  | Block condition for blocks that are explicitly allowed to be destroyed, taking priority over `indestructible`  |

## Block Destruction Logic

Block protection is resolved in this order:

1. If `destructible` is set and a block matches it, that block **can** be destroyed regardless of `indestructible`.
2. If `indestructible` is set and a block matches it, that block is **protected**.
3. Otherwise, `destruction_type` governs normal explosion block destruction.

## Examples

```json
{
    "type": "apoli:explode",
    "power": 3.0,
    "destruction_type": "break",
    "create_fire": false
}
```
Explosion at the actor's position, breaking blocks.

