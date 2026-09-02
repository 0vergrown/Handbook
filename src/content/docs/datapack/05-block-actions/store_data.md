---
title: "Store Data (Block Action Type)"
description: "Writes the block's id, state string, position and block-entity NBT into a command storage."
navigation_title: "Store Data"
---

Writes the block's id, full state string, position and block-entity NBT into a [command storage](https://minecraft.wiki/w/Commands/data), so a later command can place it back, copy it, or hand it to a function macro.

Type ID: `apoli:store_data`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | | The command storage to write into, e.g. `example:scratch`. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A dot-separated key path inside that storage. Empty writes at the root. |
| `nbt` | Boolean | `true` | Whether to include the block entity's NBT under `nbt`, when the block has one. |
| `merge` | Boolean | `false` | Merge into whatever is already at `path` instead of replacing it. |

## What gets written

| Key | Type | Value |
|-----|------|-------|
| `id` | String | The block id, e.g. `minecraft:oak_log`. |
| `state` | String | The block id **with its properties**, e.g. `minecraft:oak_log[axis=y]` — exactly what `/setblock` wants. |
| `properties` | Compound | Each block-state property as a string, e.g. `{axis: "y"}`. |
| `x`, `y`, `z` | Int | The block position. |
| `pos` | String | `"x y z"`, ready to paste into a command. |
| `dimension` | String | The dimension the block is in. |
| `nbt` | Compound | The block entity's NBT, when there is one and `nbt` is `true`. |

## Examples

Store the block a power just interacted with, then place a copy of it in front of the player:

```json
"block_action": {
  "type": "apoli:store_data",
  "storage": "example:scratch",
  "path": "block"
}
```

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "setblock ^ ^ ^2 $(state)",
  "arguments": {
    "storage": "example:scratch",
    "path": "block"
  }
}
```

`$(state)` carries the block's properties with it, so a log placed this way keeps its axis. `arguments` is [apoli:execute_command](/docs/datapack/entity-actions/execute_command)'s own macro substitution, so this works on every version — no function macros required. If you would rather use a real function macro, the same storage is readable with `/function example:place with storage example:scratch block`.
