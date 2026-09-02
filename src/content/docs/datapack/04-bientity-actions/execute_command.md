---
title: "Execute Command (Bi-Entity Action Type)"
description: "Runs a command as the actor, with the actor's and target's UUIDs substituted into it."
navigation_title: "Execute Command"
---

Executes a command on the server as the **actor** entity, replacing placeholders in the command string with the actor's and target's UUIDs first.

Type ID: `apoli:execute_command`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `command` | [String](/docs/datapack/data-types/string) | _required_ | The command to run, without a leading `/`. |
| `actor_selector` | [String](/docs/datapack/data-types/string) | `"%a"` | The text replaced with the actor's UUID. |
| `target_selector` | [String](/docs/datapack/data-types/string) | `"%t"` | The text replaced with the target's UUID. |
| `arguments` | Macro Arguments | *optional* | Values for `$(key)` placeholders in `command`. See [Macro arguments](#macro-arguments). |

## How it works

- The command runs **as the actor**, at permission level 4 with output suppressed, so `@s` inside the command is the actor.
- Every occurrence of `actor_selector` is replaced with the actor's UUID and every occurrence of `target_selector` with the target's UUID, before the command is parsed.
- Change the placeholders when the defaults would collide with the command text — set `actor_selector` to `"{actor}"` and `%a` stays literal.
- Setting a selector to `""` disables that substitution.

## Examples

Teleport the actor to the target:

```json
"bientity_action": {
  "type": "apoli:execute_command",
  "command": "tp %a %t"
}
```

Give the actor an item, using a custom placeholder:

```json
"bientity_action": {
  "type": "apoli:execute_command",
  "command": "give {actor} minecraft:gunpowder",
  "actor_selector": "{actor}"
}
```

Because the command runs as the actor, `execute at` is how you move execution to the target:

```json
"bientity_action": {
  "type": "apoli:execute_command",
  "command": "execute at %t run summon minecraft:lightning_bolt"
}
```

> Commands are far slower than the equivalent action types and skip Apoli's own bookkeeping. Reach for [apoli:damage](/docs/datapack/bientity-actions/damage), [apoli:mount](/docs/datapack/bientity-actions/mount) and friends first, and keep this for things Apoli has no action for.

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
