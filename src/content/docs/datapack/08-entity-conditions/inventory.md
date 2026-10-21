---
title: "Inventory (Entity Condition Type)"
description: "Counts the items or stacks in the entity's inventory, or a power's inventory, that pass a condition, and compares the count."
navigation_title: "Inventory"
---

Counts the items in the entity's inventory, an [inventory power](/docs/datapack/powers/inventory)'s container or both that pass an item condition, and compares the count with a number.

Type ID: `apoli:inventory`

> [!NOTE]
> Including `"power"` in `inventory_types` counts items in the [apoli:inventory](/docs/datapack/powers/inventory) power named by the `power` field. That container is read on the server only, because its contents aren't synced to clients. Address its slots with the `container.N` form of Item Slot instead of named slots.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `inventory_types` | Array of [Inventory Type](/docs/datapack/data-types/inventory-type) | `["inventory"]` | Whether to count items in the entity's inventory, in the inventories of its powers, or both. |
| `process_mode` | [Process Mode](/docs/datapack/data-types/process-mode) | `"items"` | Whether individual items or whole stacks are counted. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only items that pass this condition are counted. |
| `slots` | Array of [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Only the items in these slots are checked. |
| `slot` | [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Only the item in this slot is checked. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | When `inventory_types` includes `"power"`, the inventory power whose items are checked. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">"` | How the count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `0` | The number the count is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:inventory",
    "process_mode": "stacks",
    "comparison": ">=",
    "compare_to": 10
}
```

This checks whether 10 or more slots of the entity's inventory hold any item.

```json
"condition": {
    "type": "apoli:inventory",
    "process_mode": "items",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "tag": "minecraft:flowers"
        }
    },
    "comparison": "<",
    "compare_to": 16
}
```

This checks whether the entity has 15 or fewer items from the `#minecraft:flowers` item tag (`data/minecraft/tags/items/flowers.json`) in its inventory.
