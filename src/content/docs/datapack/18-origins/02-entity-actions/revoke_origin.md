---
title: "Revoke Origin (Entity Action Type)"
description: "Takes an origin away from a player, from a layer or from a swap pool."
navigation_title: "Revoke Origin"
---

Takes an origin away from a player. It is the reverse of [`origins:grant_origin`](/docs/datapack/origins/grant_origin).

Type ID: `origins:revoke_origin`

> [!NOTE]
> This action comes from the Origins mod and only runs for players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The origin to take. Leave it out to clear the layer and everything the player was granted in its swap pool. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer to take it from. |

With `origin` set, the swap pool is searched first. If the origin isn't there and it is the layer's current pick, the layer is cleared instead. Revoking the origin a player is currently swapped into returns them to their own origin automatically.

Clearing a layer doesn't leave the player without an origin for good. A layer that uses `auto_choose` derives one again straight away. On the player's next join, a layer with a `default_origin` gives them that origin, and any other layer opens the choose screen.

## Examples

```json
{
  "type": "origins:revoke_origin",
  "origin": "example:wolf_form",
  "layer": "origins:origin"
}
```

This takes `example:wolf_form` back out of the player's swap pool.

```json
{
  "type": "origins:revoke_origin",
  "layer": "origins:origin"
}
```

This clears the main layer completely, both the pick and the pool.
