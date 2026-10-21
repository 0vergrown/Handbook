---
title: "Store Data (Item Action Type)"
description: "Writes the item's ID, count and NBT into a command storage."
navigation_title: "Store Data"
---

Writes the item stack's ID, count and NBT into a [command storage](https://minecraft.wiki/w/Commands/data), so a later command or function macro can rebuild it.

Type ID: `apoli:store_data`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The command storage to write into, such as `example:scratch`. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A key path inside that storage, separated by dots. Empty writes at the root. |
| `nbt` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to include the stack's saved NBT under `nbt`. |
| `merge` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Merges into whatever is already at `path` instead of replacing it. |

## What gets written

| Key | Type | Value |
| --- | --- | --- |
| `id` | String | The item ID, such as `minecraft:diamond_sword`. |
| `count` | Int | The stack size. |
| `name` | String | The stack's display name. |
| `nbt` | Compound | The stack's saved NBT, when `nbt` is `true`. On 1.21 that is the component form, and on 1.20.1 the `tag` form. |

## Examples

Store the held item, then give the player another one of the same item:

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
