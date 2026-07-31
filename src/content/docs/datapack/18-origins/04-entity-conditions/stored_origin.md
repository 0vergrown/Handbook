---
title: "Stored Origin (Entity Condition Type)"
description: "Entity condition — passes when the entity has an origin saved in its store."
navigation_title: "Stored Origin"
---

Passes when the entity has an origin saved in its [store](/docs/datapack/origins/storage), optionally matching a specific key, origin or layer.

Type ID: `origins:stored_origin` — an [entity condition](/docs/datapack/entity-conditions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It reads server-side state, so it always fails when evaluated purely client-side.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _optional_ | Only check this key. Omit to match **any** stored origin. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The stored entry must be this origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The stored entry must have been taken from this layer. |

## Examples

Is there anything to restore?

```json
{
  "type": "origins:stored_origin",
  "key": "before_curse"
}
```

Have they stolen a Merling specifically?

```json
{
  "type": "origins:stored_origin",
  "key": "stolen",
  "origin": "origins:merling"
}
```

Anything at all in the store:

```json
{ "type": "origins:stored_origin" }
```
