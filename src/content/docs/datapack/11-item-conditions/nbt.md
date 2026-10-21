---
title: "NBT (Item Condition Type)"
description: "Checks whether the item's NBT contains the given data."
navigation_title: "NBT"
aliases: ["custom_data"]
---

Checks whether the item's NBT contains the given data.

Type ID: `apoli:nbt`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _required_ | The NBT data to look for. |

## Examples

```json
"item_condition": {
    "type": "apoli:nbt",
    "nbt": "{exampleCustomTag: 1b}"
}
```

This checks whether the item stack has the `exampleCustomTag: 1b` NBT.

> [!NOTE]
> `apoli:custom_data` is the same condition. The original Apoli uses that name because it reads the item's `minecraft:custom_data` component, and both IDs do the same thing here.
