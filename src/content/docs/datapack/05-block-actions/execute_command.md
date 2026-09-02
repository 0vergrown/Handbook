---
title: "Execute Command (Block Action Type)"
description: "Executes a command at the position of the block."
navigation_title: "Execute Command"
---

Executes a command at the position of the block.

Type ID: `apoli:execute_command`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | String |  | The command to execute.
`arguments` | Macro Arguments | *optional* | Values for `$(key)` placeholders in `command`. See [Macro arguments](#macro-arguments).

## Examples

```json
"block_action": {
    "type": "apoli:execute_command",
    "command": "summon minecraft:item ~ ~ ~ {Item:{id:\"minecraft:wheat\",Count:1}}"
}
```

This example will summon a Wheat item entity at the position of the block action type.

## Macro arguments

`arguments` fills `$(key)` placeholders in `command` before the command is parsed — the same shape a vanilla function macro uses, but done by Apoli, so it works on every version whether or not the game has function macros.

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Read the values from this command storage. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A dot-separated key path inside that storage. |
| `values` | NBT Compound | *optional* | Inline values. Applied after `storage`, so they win on a key clash. |

Values are written out the way a function macro writes them: strings bare, numbers as numbers, compounds and lists as SNBT. If a `$(key)` in the command has no matching value, the command is skipped rather than run malformed.

[apoli:store_data](/docs/datapack/entity-actions/store_data) is the usual way to fill that storage — it writes `id`, `pos`, `x`/`y`/`z` and, for blocks, a `state` string that `/setblock` accepts as-is:

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "setblock $(pos) $(state)",
  "arguments": {
    "storage": "example:scratch",
    "path": "block"
  }
}
```
