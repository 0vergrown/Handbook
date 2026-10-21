---
title: "NBT (Entity Condition Type)"
description: "Checks whether the entity's NBT contains the given data."
navigation_title: "NBT"
---

Checks whether the entity's NBT contains the given data.

Type ID: `apoli:nbt`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _required_ | The NBT data to look for. |

## Examples

```json
"condition": {
    "type": "apoli:nbt",
    "nbt": "{Tags: ['example_tag']}"
}
```

This checks whether the entity has the `example_tag` tag, added with `/tag` or by editing the entity's `Tags` NBT list.
