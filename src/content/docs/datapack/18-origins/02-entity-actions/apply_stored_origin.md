---
title: "Apply Stored Origin (Entity Action Type)"
description: "Sets the player's origin from an entry saved earlier under a key."
navigation_title: "Apply Stored Origin"
---

Sets the entity's origin from an entry saved earlier by [`origins:store_origin`](/docs/datapack/origins/store_origin).

Type ID: `origins:apply_stored_origin`

> [!NOTE]
> This action comes from the Origins mod. It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the whole system.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The stored entry to apply. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Applies the origin to this layer instead of the one recorded with the entry. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Removes the entry once it has been applied. |

Nothing happens if the key holds no origin, or if the layer or origin no longer exists, so a data pack that removes an origin can't leave a player stuck on it.

The change goes through the normal origin change path. Powers are compared instead of being removed and added again, so resources and [`apoli:inventory`](/docs/datapack/powers/inventory) contents that both origins share are left alone. Gated layers are revalidated and every client is synced again afterwards.

## Examples

```json
{
  "type": "origins:apply_stored_origin",
  "key": "before_curse",
  "clear": true
}
```

This gives the player back the origin stored under `before_curse` and removes the entry.

```json
{
  "type": "origins:apply_stored_origin",
  "key": "stolen",
  "layer": "origins:copy"
}
```

This applies the origin stored under `stolen` to the `origins:copy` layer, whatever layer it came from.
