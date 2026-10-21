---
title: "Stored Value (Entity Condition Type)"
description: "Checks whether the entity has a text value saved under a key."
navigation_title: "Stored Value"
---

Checks whether the entity has a text value saved in its [store](/docs/datapack/origins/storage) under `key`, optionally equal to a specific string.

Type ID: `origins:stored_value`

> [!NOTE]
> This condition comes from the Origins mod. It reads server state, so it always fails when evaluated only on the client.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The entry to check. |
| `value` | [String](/docs/datapack/data-types/string) | _optional_ | The stored text must equal this exactly. Leave it out to only check that the key exists. |

Only text entries are checked, so a key holding a stored origin doesn't satisfy this condition. Use [`origins:stored_origin`](/docs/datapack/origins/stored_origin) for those.

## Examples

```json
{
  "type": "origins:stored_value",
  "key": "phase",
  "value": "cursed"
}
```

This checks whether the `phase` entry is `cursed`.

```json
{
  "type": "origins:stored_value",
  "key": "phase"
}
```

This checks whether `phase` has been set at all.
