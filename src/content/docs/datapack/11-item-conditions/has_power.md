---
title: "Has Power (Item Condition Type)"
description: "Checks whether the item has a given power embedded in it."
navigation_title: "Has Power"
---

Checks whether the item has a given power embedded in it.

Type ID: `apoli:has_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to look for. |
| `slot` | Equipment Slot | _optional_ | Only counts the power when it is assigned to this equipment slot: `"head"`, `"chest"`, `"legs"`, `"feet"`, `"mainhand"` or `"offhand"`. |

## Examples

```json
"item_condition": {
    "type": "apoli:has_power",
    "power": "origins:water_breathing"
}
```

This checks whether the item has the Merling's Gills power (`origins:water_breathing`) embedded in it.

```json
"item_condition": {
    "type": "apoli:has_power",
    "power": "origins:elytra",
    "slot": "chest"
}
```

This checks whether the item has the Elytrian's Winged power (`origins:elytra`) embedded in it for the chest slot.
