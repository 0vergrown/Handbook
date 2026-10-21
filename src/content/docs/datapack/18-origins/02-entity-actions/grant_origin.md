---
title: "Grant Origin (Entity Action Type)"
description: "Gives a player a specific origin, on a normal layer or into a swap pool."
navigation_title: "Grant Origin"
---

Gives a player one named origin. On a normal [layer](/docs/datapack/origins/layers) it becomes their pick, and on a [swappable layer](/docs/datapack/origins/swapping) it is added to their swap pool.

Type ID: `origins:grant_origin`

> [!NOTE]
> This action comes from the Origins mod and only runs for players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The origin to grant. Unknown IDs and `origins:empty` do nothing. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer to grant it on. |
| `to_pool` | [Boolean](/docs/datapack/data-types/boolean) | `false` | On a normal layer, puts the origin in that layer's swap pool instead of making it the player's pick. It is ignored on a swappable layer, where a grant always goes to the pool. `swappable` works as an alias. |

## What granting does on each kind of layer

| `layer` is | Result |
| --- | --- |
| A normal layer | The origin becomes the player's pick there, exactly as [`/origin set`](/docs/datapack/commands/origin) would make it. |
| A normal layer, with `to_pool: true` | The origin is added to the swap pool for that layer. The player can swap to it, and their own origin is untouched. |
| A [swappable layer](/docs/datapack/origins/swapping) | The origin is added to that pool. |

Pool grants are stored for each player and aren't checked against the layer's `origins` list, so a swappable layer can ship empty and be filled entirely at run time.

## Examples

```json
{
  "type": "origins:grant_origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

This gives the player the Phantom origin on the main layer.

```json
{
  "type": "origins:grant_origin",
  "origin": "example:wolf_form",
  "layer": "origins:origin",
  "to_pool": true
}
```

This unlocks `example:wolf_form` as an extra form the player can swap into, without changing their current origin.

[`origins:revoke_origin`](/docs/datapack/origins/revoke_origin) takes an origin back, and [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) moves one between two players.
