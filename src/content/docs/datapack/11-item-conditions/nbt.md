---
title: "NBT (Item Condition Type)"
description: "Checks the item's NBT."
navigation_title: "NBT"
aliases: ["custom_data"]
---

Checks the item's NBT.

Type ID: `apoli:nbt`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`nbt` | NBT | | The NBT data to check for.

## Examples

```json
"item_condition": {
    "type": "apoli:nbt",
    "nbt": "{exampleCustomTag: 1b}"
}
```

This example will check if the item stack has the `exampleCustomTag: 1b` NBT.

> **`apoli:custom_data` is this condition.** The original Apoli called it that because it reads the item's `minecraft:custom_data` component; both ids do the same thing here.
