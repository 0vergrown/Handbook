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
