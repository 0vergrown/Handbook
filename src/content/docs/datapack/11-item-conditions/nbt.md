---
title: "apoli:nbt"
description: "Checks the item's NBT."
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

