---
title: "Store Value (Entity Action Type)"
description: "Stores a piece of text on the entity under a named key."
navigation_title: "Store Value"
---

Stores a piece of text on the entity under a named key, such as a marker, a name or a state flag. [`origins:stored_value`](/docs/datapack/origins/stored_value) reads it back.

Type ID: `origins:store_value`

> [!NOTE]
> This action comes from the Origins mod. It only works on players, and only on the server. See [Origin storage](/docs/datapack/origins/storage) for the whole system.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the text under. |
| `value` | [String](/docs/datapack/data-types/string) | `""` | The text to store. `[other_key]` placeholders are expanded from the same player's store before it is written. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Removes the entry at `key` instead of writing one. |

If `value` contains a placeholder that can't be resolved, nothing is stored.

## Placeholders

`[key]` expands to whatever is stored under `key`: a stored origin's ID, or a stored text value. `[key.name]` expands to a stored origin's display name instead of its ID.

## Examples

```json
{
  "type": "origins:store_value",
  "key": "phase",
  "value": "cursed"
}
```

This marks the player as being in the `cursed` phase.

```json
{
  "type": "origins:store_value",
  "key": "stolen_name",
  "value": "[stolen.name]"
}
```

This records the display name of the origin stored under `stolen`, so a message can show it later.
