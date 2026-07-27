---
title: "origins:apply_stored_origin"
description: "Sets the entity's origin from a previously stored key."
---

Sets the entity's origin from an entry saved earlier by [`origins:store_origin`](/docs/datapack/entity-actions/store_origin).

Type ID: `origins:apply_stored_origin`

> This is an Origins addon action (not core Apoli). It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the system as a whole.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | Which stored entry to apply. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Apply to this layer instead of the one recorded with the entry. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Remove the entry once it has been applied. |

Nothing happens if the key holds no origin, or if the layer or origin no longer exists — a data pack that removed an origin can't strand a player on it.

The change goes through the normal origin-change path: powers are diffed rather than removed and re-added, so resources and [`apoli:inventory`](/docs/datapack/powers/inventory) contents that both origins share are left alone. Gated layers are revalidated and every client is re-synced afterwards.

## Examples

Give the player back what they were:

```json
{
  "type": "origins:apply_stored_origin",
  "key": "before_curse",
  "clear": true
}
```

Apply a stored origin onto a different layer than it came from:

```json
{
  "type": "origins:apply_stored_origin",
  "key": "stolen",
  "layer": "origins:copy"
}
```

## See also

- [`origins:store_origin`](/docs/datapack/entity-actions/store_origin)
- [`origins:stored_origin`](/docs/datapack/entity-conditions/stored_origin)
- [Origin storage](/docs/datapack/origins/storage)
