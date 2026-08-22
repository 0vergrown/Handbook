---
title: "Origin (Entity Condition Type)"
description: "Entity condition — passes when the player has a given origin."
navigation_title: "Origin"
---

Passes when the player currently has a given origin — on one specific [layer](/docs/datapack/origins/layers), or on any layer at all.

Type ID: `origins:origin` — an [entity condition](/docs/datapack/entity-conditions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only passes for players; any other entity fails.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `origin` | origin pattern, or a list of them | _required_ | The origin(s) to look for. Passes if **any** of them matches. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only check this layer. Omit to pass if a match is held on **any** layer. |
| `selection` | [String](/docs/datapack/data-types/string) | `main` | Where to look: `main` (the chosen origin), `active` (the swapped-in origin, falling back to the chosen one), `pool` (origins sitting in a [swap pool](/docs/datapack/origins/swapping)) or `all` (any of the three). |

An **origin pattern** is an [identifier](/docs/datapack/data-types/identifier) that may use `*` as a wildcard in its namespace or its path — `my_pack:aliens/*` matches every origin whose path starts with `aliens/`, at any depth. Without a `*` it is an ordinary identifier and must match exactly.

## Examples

Is this player a Phantom on the main layer?

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

Anywhere at all — including a copy layer they picked it up on:

```json
{
  "type": "origins:origin",
  "origin": "origins:merling"
}
```

Any of a whole family, without listing them one by one:

```json
{
  "type": "origins:origin",
  "layer": "origins:origin",
  "origin": [
    "my_pack:base",
    "my_pack:aliens/*"
  ]
}
```

> Use the list form instead of wrapping several `origins:origin` checks in an `origins:or`. It reads better, and — since `"inverted": true` applies to the whole condition — one inverted copy of it gives you the exact complement, which is what a [derived layer](/docs/datapack/origins/layers#derived-layers) needs for its other branch.

## Gating one power on several origins

This is how a power behaves differently depending on which origin the player picked. Grant the power broadly, then branch inside it:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": {
    "type": "apoli:if_else",
    "condition": { "type": "origins:origin", "origin": "origins:merling" },
    "if_action": { "type": "apoli:gain_air", "value": 4 },
    "else_action": { "type": "apoli:feed", "food": 1, "saturation": 0.5 }
  }
}
```

## Notes

- This reads the player's **current** choice. To test an origin saved earlier, use [`origins:stored_origin`](/docs/datapack/origins/stored_origin).
- It works on both sides: the server reads the player's origin state, the client reads its synced copy, so it's safe in render- and HUD-side conditions.

## Checking a swap pool

`selection` decides which of a player's origins count. By default only their **chosen** origin does, which is why a swapped-in origin used to read as absent:

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "selection": "active"
}
```

That passes while the player is actually playing as a Phantom, swapped in or not. Use `pool` to ask "could they swap to it?", and `all` to mean "do they have it at all?".
