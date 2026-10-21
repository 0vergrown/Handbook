---
title: "Execute Command (Bi-Entity Action Type)"
description: "Runs a command as the actor, with the actor's and target's UUIDs filled into it."
navigation_title: "Execute Command"
---

Runs a command on the server as the actor, after replacing placeholders in the command with the actor's and the target's UUIDs.

Type ID: `apoli:execute_command`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | [String](/docs/datapack/data-types/string) | _required_ | The command to run, without a leading `/`. |
| `actor_selector` | [String](/docs/datapack/data-types/string) | `"%a"` | The text replaced with the actor's UUID. |
| `target_selector` | [String](/docs/datapack/data-types/string) | `"%t"` | The text replaced with the target's UUID. |
| `arguments` | Macro Arguments | _optional_ | Values for `$(key)` placeholders in `command`, including live resource values off either entity. See [Macro arguments](#macro-arguments). |

## How it works

- The command runs as the actor, at permission level 4 with its output hidden, so `@s` inside the command is the actor.
- Every occurrence of `actor_selector` is replaced with the actor's UUID, and every occurrence of `target_selector` with the target's UUID, before the command is parsed.
- Change the placeholders when the defaults would clash with the command text. Set `actor_selector` to `"{actor}"` and `%a` stays as it is.
- Setting a selector to `""` turns that replacement off.

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

The command runs as the actor, so `execute at` is how you move it to the target:

```json
"bientity_action": {
  "type": "apoli:execute_command",
  "command": "execute at %t run summon minecraft:lightning_bolt"
}
```

> [!WARNING]
> Commands are much slower than the matching action types and skip Apoli's own bookkeeping. Use [apoli:damage](/docs/datapack/bientity-actions/damage), [apoli:mount](/docs/datapack/bientity-actions/mount) and the other actions first, and keep this for things Apoli has no action for.

## Macro arguments

`arguments` fills `$(key)` placeholders in `command` before the command is parsed. It has the same shape as a vanilla function macro, but Apoli does the filling, so it works on every version whether or not the game has function macros.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Reads the values from this command storage. |
| `path` | [String](/docs/datapack/data-types/string) | `""` | A key path inside that storage, separated by dots. |
| `resources` | Resource map | _optional_ | Resource values read live off the entity the command runs as. See [Resources in a command](#resources-in-a-command). |
| `values` | NBT Compound | _optional_ | Inline values. They are applied last, so they win when a key clashes. |

Values are written out the way a function macro writes them: strings bare, numbers as numbers, and compounds and lists as SNBT. If a `$(key)` in the command has no matching value, the command is skipped instead of running malformed, and Apoli logs one line naming the missing key, so a typo or an absent resource doesn't fail silently.

## Resources in a command

`resources` puts [`apoli:resource`](/docs/datapack/powers/resource) and [`apoli:cooldown`](/docs/datapack/powers/cooldown) values straight into the command, read at the moment it runs. Write it as `key: id` pairs:

```json
"arguments": {
  "resources": {
    "mana": "example:mana"
  }
}
```

Or write it as a plain list, which keys each resource by the last segment of its path, so `example:mana` becomes `$(mana)`:

```json
"arguments": {
  "resources": ["example:mana"]
}
```

> [!WARNING]
> `resources` takes either an object of `key: id` pairs or a plain list of IDs, never a mix. `"resources": ["mana": "example:mana"]` isn't valid JSON, and a data pack file that contains it fails to parse completely, so the power never loads. Check the log for `Couldn't parse data file` if a power seems to do nothing.

When a `$(key)` can't be filled, the command is skipped and one line is logged naming the key and the reason: the power ID isn't loaded, the holder doesn't have it, or the power it names isn't a resource. Turn on [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) and that line is also sent to you in chat, every time, instead of once to the log.

Each key also gets `_max` and `_min` companions wherever the resource declares those limits, so a readout needs no second lookup:

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "say mana: $(mana)/$(mana_max)",
  "arguments": {
    "resources": ["example:mana"]
  }
}
```

That prints `mana: 7/10` in chat, which is the quickest way to watch a resource move while you build the power that changes it. With [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on, every `apoli:execute_command` also echoes its finished command to you with the macros already expanded, so you can see exactly what ran.

`resources` reads the actor. The bi-entity form adds `target_resources`, with the same two spellings, which reads the target, so one command can print both sides:

```json
"bientity_action": {
  "type": "apoli:execute_command",
  "command": "say %a has $(mana) mana, %t has $(hp) health left",
  "arguments": {
    "resources": ["example:mana"],
    "target_resources": ["example:hp"]
  }
}
```

[apoli:store_data](/docs/datapack/entity-actions/store_data) is the usual way to fill that storage. It writes `id`, `pos`, `x`, `y` and `z`, and for blocks a `state` string that `/setblock` accepts as it is:

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
