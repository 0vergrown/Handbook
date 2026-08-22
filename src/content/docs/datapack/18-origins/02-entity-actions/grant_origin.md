---
title: "Grant Origin (Entity Action Type)"
description: "Entity action — gives a player a specific origin, on a normal layer or into a swap pool."
navigation_title: "Grant Origin"
---

Gives a player one named origin. On a normal [layer](/docs/datapack/origins/layers) it becomes their pick; on a [swappable layer](/docs/datapack/origins/swapping) it is added to their swap pool.

Type ID: `origins:grant_origin` — an [entity action](/docs/datapack/entity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only runs for players.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The origin to grant. Unknown ids and `origins:empty` do nothing. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer to grant it on. |
| `to_pool` | [Boolean](/docs/datapack/data-types/boolean) | `false` | On a **normal** layer, put the origin in that layer's swap pool instead of making it the player's pick. Ignored on a swappable layer, where a grant is always a pool grant. _Also accepts the alias `swappable`._ |

## What "granting" means per layer kind

| `layer` is | Result |
| --- | --- |
| a normal layer | the origin becomes the player's pick there, exactly as [`/origin set`](/docs/datapack/commands/origin) would |
| a normal layer, with `to_pool: true` | the origin is added to the swap pool feeding that layer — the player can swap to it, but their own origin is untouched |
| a [swappable layer](/docs/datapack/origins/swapping) | the origin is added to that pool |

Pool grants are **per player** and are not checked against the layer's `origins` list, so a swappable layer can ship empty and be filled entirely at run time.

## Examples

Give the player the Phantom origin outright:

```json
{
  "type": "origins:grant_origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

Unlock an extra form they can swap into, without disturbing what they are now:

```json
{
  "type": "origins:grant_origin",
  "origin": "example:wolf_form",
  "layer": "origins:origin",
  "to_pool": true
}
```

> To take one back, use [`origins:revoke_origin`](/docs/datapack/origins/revoke_origin). To move one between two players, use [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin).
