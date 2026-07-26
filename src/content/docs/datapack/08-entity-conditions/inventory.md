---
title: "apoli:inventory"
description: "Entity Condition Type"
---

Entity Condition Type

Checks the entity's inventory (and/or an [Inventory power](/docs/datapack/entity-conditions/inventory)'s container) for items matching a condition, comparing the count against a value.

Type ID: `apoli:inventory`

> **POWER INVENTORIES:** including `"power"` in `inventory_types` counts items in the [[apoli:inventory](/docs/datapack/powers/inventory)](/docs/datapack/entity-conditions/inventory) named by the `power` field. This reads the power's stored container **server-side only** (its contents aren't synced to clients). Address its slots with the `container.N` Item Slot form rather than named slots.


## Fields

Field | Type | Default | Description
------|------|---------|------------
`inventory_types` | Array of Inventory Types | `["inventory"]` | Determines whether to check for items in the entity's inventory, inventories of powers present in the entity, or both.
`process_mode` | Process Mode | `"items"` | Determines how the item stacks in the specified inventory/inventories are evaluated.
`item_condition` | Item Condition Type | _optional_ | If specified, only account for items from the specified inventory/inventories that fulfill this condition.
`slots` | Array of Item Slots | _optional_ | If specified, only items from these specified item slots are evaluated.
`slot` | Item Slot | _optional_ | If specified, only the item from this specified item slot is evaluated.
`power` | Identifier | _optional_ | If specified and if `inventory_type` is `"power"`, the items in the inventory of this power will be evaluated instead.
`comparison` | Comparison | `">"` | Determines how the amount of items/stacks that were evaluated should be compared to the specified value.
`compare_to` | Integer | `0` | The value at which the amount of items/stacks that were evaluated will be compared to.


## Examples

```json
"condition": {
    "type": "origins:inventory",
    "process_mode": "stacks",
    "comparison": ">=",
    "compare_to": 10
}
```

This example will check if 10 or more slots are occupied by any items in the entity's inventory.



```json
"condition": {
    "type": "origins:inventory",
    "process_mode": "items",
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "tag": "minecraft:flowers"
        }
    },
    "comparison": "<",
    "compare_to": 16
}
```

This example will check if 15 or less individual items that are included in the `#minecraft:flowers` (`data/minecraft/tags/items/flowers.json`) item tag are in the inventory of the entity.

