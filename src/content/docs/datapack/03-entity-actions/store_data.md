---
title: "Store Data (Entity Action Type)"
description: "Writes the entity's ID, position and NBT into a command storage so commands and function macros can read it back."
navigation_title: "Store Data"
---

Writes the entity's ID, position and NBT into a [command storage](https://minecraft.wiki/w/Commands/data). From there, `/data get storage`, a function macro or the `arguments` of [apoli:execute_command](/docs/datapack/entity-actions/execute_command) can read it back.

Type ID: `apoli:store_data`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The command storage to write into, such as `example:scratch`. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A key path inside that storage, separated by dots, such as `"grabbed"` or `"last.hit"`. Empty writes at the root. |
| `nbt` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to include the entity's full NBT under `nbt`. Serialising an entity isn't cheap, so turn it off in anything that runs every tick. |
| `merge` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Merges into whatever is already at `path` instead of replacing it. |

## What gets written

| Key | Type | Value |
| --- | --- | --- |
| `id` | String | The entity type ID, such as `minecraft:zombie`. |
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

Then read it back straight away, with no function macro:

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
