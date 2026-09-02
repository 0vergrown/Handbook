---
title: "Execute Command (Entity Action Type)"
description: "Executes a command with the entity as the source (i.e."
navigation_title: "Execute Command"
---

Executes a command with the entity as the source (i.e. `@s` will select the entity itself).

Type ID: `apoli:execute_command`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | [String](/docs/datapack/data-types/string) |  | The command to execute on the entity.
`arguments` | Macro Arguments | *optional* | Values for `$(key)` placeholders in `command`. See [Macro arguments](#macro-arguments).

## Examples

```json
"entity_action": {
    "type": "apoli:execute_command",
    "command": "tellraw @a {\"text\": \"Hello world!\", \"color\": \"green\"}"
}
```

This example will execute a `/tellraw` command that will print a green-colored "Hello world!" message to all players.

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

