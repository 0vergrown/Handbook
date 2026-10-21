---
title: "Origin (Entity Condition Type)"
description: "Checks whether the player has a given origin."
navigation_title: "Origin"
---

Checks whether the player currently has a given origin, on one [layer](/docs/datapack/origins/layers) or on any layer.

Type ID: `origins:origin`

> [!NOTE]
> This condition comes from the Origins mod. It only passes for players, and any other entity fails it.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `origin` | Origin pattern, or an [Array](/docs/datapack/data-types/array) of them | _required_ | The origins to look for. The condition passes if any of them matches. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only checks this layer. Leave it out to pass when a match is held on any layer. |
| `selection` | [Selection](/docs/datapack/data-types/selection) | `main` | Where to look: `main` (the chosen origin), `active` (the swapped-in origin, or the chosen one when the player isn't swapped), `pool` (origins in a [swap pool](/docs/datapack/origins/swapping)) or `all` (any of the three). |

An origin pattern is an [identifier](/docs/datapack/data-types/identifier) that can use `*` as a wildcard in its namespace or its path. `my_pack:aliens/*` matches every origin whose path starts with `aliens/`, at any depth. Without a `*`, it is an ordinary identifier and must match exactly.

## Examples

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

This checks whether the player is a Phantom on the main layer.

```json
{
  "type": "origins:origin",
  "origin": "origins:merling"
}
```

This checks for a Merling on any layer, including a copy layer the player picked it up on.

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

This matches a whole family of origins without listing them one by one.

> [!TIP]
> Use the list form instead of wrapping several `origins:origin` checks in an `origins:or`. It reads better, and because `"inverted": true` applies to the whole condition, one inverted copy of it gives you the exact complement, which is what a [derived layer](/docs/datapack/origins/layers#derived-layers) needs for its other branch.

## Gating one power on several origins

A power can behave differently depending on which origin the player picked. Grant the power broadly, then branch inside it:

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

Every second, a Merling regains some air, and any other origin gets some food instead.

## Notes

- This reads the player's current choice. To test an origin saved earlier, use [`origins:stored_origin`](/docs/datapack/origins/stored_origin).
- It works on both sides. The server reads the player's origin state and the client reads its synced copy, so it is safe in render and HUD conditions.

## Checking a swap pool

`selection` decides which of a player's origins count. By default only their chosen origin does, so a swapped-in origin reads as absent unless you widen it:

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "selection": "active"
}
```

This passes while the player is actually playing as a Phantom, swapped in or not. Use `pool` to ask whether they could swap to it, and `all` to ask whether they have it at all.
