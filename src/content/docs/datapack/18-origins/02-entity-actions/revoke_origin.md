---
title: "Revoke Origin (Entity Action Type)"
description: "Entity action — takes an origin off a player, from a layer or from a swap pool."
navigation_title: "Revoke Origin"
---

Takes an origin away from a player. The inverse of [`origins:grant_origin`](/docs/datapack/origins/grant_origin).

Type ID: `origins:revoke_origin` — an [entity action](/docs/datapack/entity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only runs for players.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The origin to take. Omit it to clear the layer **and** everything the player was granted in its swap pool. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer to take it from. |

With `origin` set, the swap pool is searched first; if the origin is not there, and it is the layer's current pick, the layer is cleared instead. Revoking the origin a player is currently swapped into drops them back to their own origin automatically.

Clearing a layer does **not** leave the player originless forever — a layer with conditions or a `default_origin` re-derives on its own, and a plain layer re-opens the choose screen on their next join.

## Examples

Take one swap option back:

```json
{
  "type": "origins:revoke_origin",
  "origin": "example:wolf_form",
  "layer": "origins:origin"
}
```

Wipe the layer completely — pick and pool:

```json
{
  "type": "origins:revoke_origin",
  "layer": "origins:origin"
}
```
