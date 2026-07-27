---
title: "origins:stored_value"
description: "Passes when the entity has a text value saved under a key."
---

Passes when the entity has a text value saved in its [store](/docs/datapack/origins/storage) under `key`, optionally equal to a specific string.

Type ID: `origins:stored_value`

> This is an Origins addon condition (not core Apoli). It reads server-side state, so it always fails when evaluated purely client-side.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | Which entry to check. |
| `value` | [String](/docs/datapack/data-types/string) | _optional_ | The stored text must equal this exactly. Omit to check only that the key exists. |

Only text entries are checked — a key holding a stored *origin* does not satisfy this condition. Use [`origins:stored_origin`](/docs/datapack/entity-conditions/stored_origin) for those.

## Examples

Are we in the cursed phase?

```json
{
  "type": "origins:stored_value",
  "key": "phase",
  "value": "cursed"
}
```

Has the phase been set at all?

```json
{
  "type": "origins:stored_value",
  "key": "phase"
}
```

## See also

- [`origins:store_value`](/docs/datapack/entity-actions/store_value)
- [Origin storage](/docs/datapack/origins/storage)
