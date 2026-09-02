---
title: "Store Data (Entity Action Type)"
description: "Writes the entity's id, position and NBT into a command storage so commands and function macros can read it back."
navigation_title: "Store Data"
---

Writes the entity's id, position and NBT into a [command storage](https://minecraft.wiki/w/Commands/data), where `/data get storage`, a function macro, or [apoli:execute_command](/docs/datapack/entity-actions/execute_command)'s own `arguments` can read it back.

Type ID: `apoli:store_data`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | | The command storage to write into, e.g. `example:scratch`. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A dot-separated key path inside that storage, e.g. `"grabbed"` or `"last.hit"`. Empty writes at the root. |
| `nbt` | Boolean | `true` | Whether to include the entity's full NBT under `nbt`. Serialising an entity is not cheap — turn it off in anything that runs every tick. |
| `merge` | Boolean | `false` | Merge into whatever is already at `path` instead of replacing it. |

## What gets written

| Key | Type | Value |
|-----|------|-------|
| `id` | String | The entity type id, e.g. `minecraft:zombie`. |
| `uuid` | String | The entity's UUID. |
| `name` | String | The entity's display name. |
| `x`, `y`, `z` | Double | The entity's position. |
| `pos` | String | `"x y z"`, ready to paste into a command. |
| `dimension` | String | The dimension the entity is in. |
| `nbt` | Compound | The entity's NBT, when `nbt` is `true`. |

## Examples

```json
"entity_action": {
  "type": "apoli:store_data",
  "storage": "example:scratch",
  "path": "victim",
  "nbt": false
}
```

Then read it back straight away, without needing function macros at all:

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "summon minecraft:lightning_bolt $(pos)",
  "arguments": {
    "storage": "example:scratch",
    "path": "victim"
  }
}
```
