---
title: "origins:store_origin"
description: "Remembers the entity's own origin under a named key so it can be applied again later."
---

Remembers the entity's own origin under a named key, so [`origins:apply_stored_origin`](/docs/datapack/entity-actions/apply_stored_origin) can put it back later.

Type ID: `origins:store_origin`

> This is an Origins addon action (not core Apoli). It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the system as a whole.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the entry under. Storing under an existing key overwrites it. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | Which layer's origin to read, and the layer recorded with the entry. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Store this origin id literally instead of reading the entity's current one. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Remove the entry at `key` instead of writing one. |

Nothing is stored if the entity has no origin on `layer` (or the origin resolves to empty). The entry survives death, respawn and relog.

## Examples

Remember what you are before something takes it away:

```json
{
  "type": "origins:store_origin",
  "key": "before_curse"
}
```

Pre-load a key with a fixed origin, so a later `apply_stored_origin` has something to fall back to:

```json
{
  "type": "origins:store_origin",
  "key": "default_form",
  "origin": "origins:human"
}
```

Forget it again:

```json
{
  "type": "origins:store_origin",
  "key": "before_curse",
  "clear": true
}
```

## See also

- [`origins:store_origin`](/docs/datapack/bientity-actions/store_origin) — the bi-entity form, which reads the *target's* origin.
- [`origins:apply_stored_origin`](/docs/datapack/entity-actions/apply_stored_origin)
- [`origins:stored_origin`](/docs/datapack/entity-conditions/stored_origin)
- [Origin storage](/docs/datapack/origins/storage)
