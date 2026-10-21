---
title: "Stored Origin (Entity Condition Type)"
description: "Checks whether the entity has an origin saved in its store."
navigation_title: "Stored Origin"
---

Checks whether the entity has an origin saved in its [store](/docs/datapack/origins/storage), optionally matching a specific key, origin or layer.

Type ID: `origins:stored_origin`

> [!NOTE]
> This condition comes from the Origins mod. It reads server state, so it always fails when evaluated only on the client.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _optional_ | Only checks this key. Leave it out to match any stored origin. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The stored entry must be this origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The stored entry must have been taken from this layer. |

## Examples

```json
{
  "type": "origins:stored_origin",
  "key": "before_curse"
}
```

This checks whether there is anything stored under `before_curse` to restore.

```json
{
  "type": "origins:stored_origin",
  "key": "stolen",
  "origin": "origins:merling"
}
```

This checks whether the origin stored under `stolen` is a Merling.

```json
{ "type": "origins:stored_origin" }
```

This passes if the store holds any origin at all.
