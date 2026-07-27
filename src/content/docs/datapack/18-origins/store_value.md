---
title: "origins:store_value"
description: "Entity action — stores a piece of text on the entity under a named key."
---

Stores a piece of text on the entity under a named key — a marker, a name, a state flag — retrievable with [`origins:stored_value`](/docs/datapack/origins/stored_value).

Type ID: `origins:store_value` — an [entity action](/docs/datapack/entity-actions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the system as a whole.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the text under. |
| `value` | [String](/docs/datapack/data-types/string) | `""` | The text to store. `[other_key]` placeholders are expanded against the same player's store before it is written. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Remove the entry at `key` instead of writing one. |

If `value` contains a placeholder that can't be resolved, nothing is stored.

## Placeholders

`[key]` expands to whatever is under `key`: a stored origin's id, or a stored text value. `[key.name]` expands to a stored origin's **display name** instead of its id.

## Examples

Mark a state:

```json
{
  "type": "origins:store_value",
  "key": "phase",
  "value": "cursed"
}
```

Record the display name of a stored origin so it can be shown in a message later:

```json
{
  "type": "origins:store_value",
  "key": "stolen_name",
  "value": "[stolen.name]"
}
```

## See also

- [`origins:stored_value`](/docs/datapack/origins/stored_value) — read it back.
- [`origins:store_origin`](/docs/datapack/origins/store_origin) — store an origin instead of text.
- [Origin storage](/docs/datapack/origins/storage) — the placeholder syntax in full.
