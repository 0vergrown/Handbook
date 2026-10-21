---
title: "Merge NBT (Item Action Type)"
description: "Merges NBT into the item's NBT."
navigation_title: "Merge NBT"
---

Merges NBT into the item's NBT.

Type ID: `apoli:merge_nbt`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _required_ | The NBT to merge into the item's NBT. |

## Examples

```json
"item_action": {
    "type": "apoli:merge_nbt",
    "nbt": "{custom_stuff: 1b}"
}
```

This merges `{custom_stuff: 1b}` into the item's NBT.
