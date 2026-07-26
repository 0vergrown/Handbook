---
title: "apoli:nbt"
description: "Checks the entity's NBT."
---

Checks the entity's NBT.

Type ID: `apoli:nbt`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`nbt` | [NBT](/docs/datapack/data-types/nbt) | | The NBT data to check for.


## Examples

```json
"condition": {
    "type": "apoli:nbt",
    "nbt": "{Tags: ['example_tag']}"
}
```

This example will check if the entity has the `example_tag` added via `/tag` or by modifying the entity's `Tags` NBT string list.

