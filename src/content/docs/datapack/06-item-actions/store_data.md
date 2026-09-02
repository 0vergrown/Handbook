---
title: "Store Data (Item Action Type)"
description: "Writes the item's id, count and NBT into a command storage."
navigation_title: "Store Data"
---

Writes the item stack's id, count and NBT into a [command storage](https://minecraft.wiki/w/Commands/data), so a later command or function macro can rebuild it.

Type ID: `apoli:store_data`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | | The command storage to write into, e.g. `example:scratch`. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A dot-separated key path inside that storage. Empty writes at the root. |
| `nbt` | Boolean | `true` | Whether to include the stack's saved NBT under `nbt`. |
| `merge` | Boolean | `false` | Merge into whatever is already at `path` instead of replacing it. |

## What gets written

| Key | Type | Value |
|-----|------|-------|
| `id` | String | The item id, e.g. `minecraft:diamond_sword`. |
| `count` | Int | The stack size. |
| `name` | String | The stack's display name. |
| `nbt` | Compound | The stack's saved NBT, when `nbt` is `true`. On 1.21 that is the component form; on 1.20.1 it is the `tag` form. |

## Examples

```json
"item_action": {
  "type": "apoli:store_data",
  "storage": "example:scratch",
  "path": "held"
}
```

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "give @s $(id)",
  "arguments": {
    "storage": "example:scratch",
    "path": "held"
  }
}
```
