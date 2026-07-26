---
title: "apoli:merge_nbt"
description: "Merges the specified NBT to the item's NBT."
---

Merges the specified NBT to the item's NBT.

Type ID: `apoli:merge_nbt`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`nbt` | NBT | | The NBT to merge to the item's NBT.

## Examples

```json
"item_action": {
    "type": "apoli:merge_nbt",
    "nbt": "{custom_stuff: 1b}"
}
```

This example will merge the `{custom_stuff: 1b}` NBT to the item's NBT.

