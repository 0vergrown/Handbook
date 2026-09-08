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
| `arguments` | Macro Arguments | *optional* | Values for `$(key)` placeholders in `command`, including live resource values off either entity. See [Macro arguments](#macro-arguments). |

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
| `resources` | Resource map | *optional* | Resource values read live off the entity the command runs as. See [Resources in a command](#resources-in-a-command). |
| `values` | NBT Compound | *optional* | Inline values. Applied last, so they win on a key clash. |

Values are written out the way a function macro writes them: strings bare, numbers as numbers, compounds and lists as SNBT. If a `$(key)` in the command has no matching value, the command is skipped rather than run malformed — and Apoli logs one line naming the key that was missing, so a typo or an absent resource does not fail silently.

## Resources in a command

`resources` puts [`apoli:resource`](/docs/datapack/powers/resource) and [`apoli:cooldown`](/docs/datapack/powers/cooldown) values straight into the command, read at the moment it runs. Write it as `key: id`:

```json
"arguments": {
  "resources": {
    "mana": "example:mana"
  }
}
```

or as a plain list, which keys each resource by the last segment of its path — `example:mana` becomes `$(mana)`:

```json
"arguments": {
  "resources": ["example:mana"]
}
```

> `resources` takes **either** an object of `key: id` pairs **or** a plain list of ids — never a mix. `"resources": ["mana": "example:mana"]` is not valid JSON, and a data pack file that contains it fails to parse in full, so the power never loads at all. Check the log for `Couldn't parse data file` if a power seems to do nothing.

When a `$(key)` cannot be filled the command is skipped and one line is logged naming the key and the reason — the power id is not loaded, the holder does not have it, or the power it names is not a resource. Turn on [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) and that line is also sent to you in chat, every time, rather than once to the log.

Each key also gets `_max` and `_min` companions wherever the resource declares those bounds, so a readout needs no second lookup:

```json
"entity_action": {
  "type": "apoli:execute_command",
  "command": "say mana: $(mana)/$(mana_max)",
  "arguments": {
    "resources": ["example:mana"]
  }
}
```

That prints `mana: 7/10` in chat — which is the quickest way to watch a resource move while you are building the power that changes it. Turn on [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) and every `apoli:execute_command` also echoes its finished command to you, macros already expanded, so you can see exactly what ran.

`resources` reads the **actor**. The bi-entity form adds `target_resources`, with the same two spellings, reading the **target** — so one command can print both sides:

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
