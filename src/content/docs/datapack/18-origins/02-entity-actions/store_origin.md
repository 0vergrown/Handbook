---
title: "Store Origin (Entity Action Type)"
description: "Remembers the entity's own origin under a named key so it can be applied again later."
navigation_title: "Store Origin"
---

Remembers the entity's own origin under a named key, so [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) can put it back later.

Type ID: `origins:store_origin`

> [!NOTE]
> This action comes from the Origins mod. It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the whole system.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the entry under. Storing under an existing key overwrites it. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The layer whose origin is read, which is also recorded with the entry. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Stores this origin ID as given instead of reading the entity's current one. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Removes the entry at `key` instead of writing one. |

Nothing is stored if the entity has no origin on `layer`, or if the origin resolves to empty. The entry survives death, respawn and relog.

## Examples

```json
{
  "type": "origins:store_origin",
  "key": "before_curse"
}
```

This remembers the player's current origin under `before_curse`, before something takes it away.

```json
{
  "type": "origins:store_origin",
  "key": "default_form",
  "origin": "origins:human"
}
```

This stores `origins:human` under `default_form` ahead of time, so a later `apply_stored_origin` has something to fall back to.

```json
{
  "type": "origins:store_origin",
  "key": "before_curse",
  "clear": true
}
```

This removes the `before_curse` entry again.
