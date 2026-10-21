---
title: "Inventory Action (Entity Action Type)"
description: "Goes through the entity's inventory or a power inventory and does one operation on each matching slot: modify, replace or drop."
navigation_title: "Inventory Action"
aliases: ["modify_inventory", "replace_inventory", "drop_inventory"]
---

Goes through the items in the entity's inventory or in an [apoli:inventory](/docs/datapack/powers/inventory) power, and does one operation on each matching slot. This one action covers Apace's `modify_inventory`, `replace_inventory` and `drop_inventory`, and the `operation` field picks which behaviour you get.

Type ID: `apoli:inventory_action`

> [!NOTE]
> The three legacy IDs still work and select the matching operation: `apoli:modify_inventory` is `operation: modify`, `apoli:replace_inventory` is `operation: replace` and `apoli:drop_inventory` is `operation: drop`. Both the `apoli:` and `origins:` namespaces resolve, so data packs written for either load unchanged.

## Operations

| `operation` | What happens to each slot | Empty slots |
| --- | --- | --- |
| `modify` (default) | Runs `item_action` on the stack. | skipped |
| `replace` | Swaps the stack for `stack`, then runs `item_action` (if any) on the replacement. | included |
| `drop` | Runs `item_action` (if any) on the stack, then drops it into the world. | skipped |

> [!WARNING]
> `replace` visits empty slots on purpose, so it can put an item into an empty slot. That is how you keep an item pinned in the offhand. It also means a `replace` with no `slot` or `slots` and no `item_condition` fills the entity's whole inventory with `stack`, so always narrow it down.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `operation` | [String](/docs/datapack/data-types/string) | `"modify"` | One of `modify`, `replace` or `drop`, as in the table above. |
| `inventory_type` | [Inventory Type](/docs/datapack/data-types/inventory-type) | `"inventory"` | Whether to go through the entity's own inventory or a power's inventory. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity once, before any slots are visited. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only items that pass this condition are affected. |
| `slot` | [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Limits the action to one slot. |
| `slots` | [Array](/docs/datapack/data-types/array) of [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Limits the action to these slots. For a `power` inventory, use the `container.N` form (the raw slot index). |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The [apoli:inventory](/docs/datapack/powers/inventory) power to go through when `inventory_type` is `"power"`. |
| `process_mode` | [Process Mode](/docs/datapack/data-types/process-mode) | `"stacks"` | How stacks count toward `limit`. Used by `modify`, while `replace` and `drop` always act once per stack. |
| `limit` | [Integer](/docs/datapack/data-types/integer) | `0` | The most stacks (or items, in `items` mode) to affect. `0` or less means no limit. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | What `modify` does, so without it `modify` does nothing. For `replace` and `drop` it is an optional extra step. |
| `stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | For `replace` only: the replacement item. |
| `merge_nbt` | [Boolean](/docs/datapack/data-types/boolean) | `false` | For `replace` only: merges the old item's data onto the replacement (the NBT tag on 1.20.1, data components on 1.21.1). |
| `throw_randomly` | [Boolean](/docs/datapack/data-types/boolean) | `false` | For `drop` only: scatters items in random directions, the way a death drop does. |
| `retain_ownership` | [Boolean](/docs/datapack/data-types/boolean) | `true` | For `drop` only: keeps the dropping entity as the item's thrower. |
| `amount` | [Integer](/docs/datapack/data-types/integer) | _optional_ | For `drop` only: splits this many off each matching stack instead of dropping the whole stack. |

## Examples

```json
"entity_action": {
    "type": "apoli:inventory_action",
    "operation": "modify",
    "item_condition": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 0
    },
    "item_action": {
        "type": "apoli:damage",
        "amount": 1,
        "ignore_unbreaking": true
    }
}
```

This slightly damages every item in the entity's inventory that has an armour value.

```json
"entity_action": {
    "type": "apoli:inventory_action",
    "operation": "replace",
    "slot": "weapon.offhand",
    "stack": { "item": "minecraft:barrier" }
}
```

This replaces the entity's offhand item with a barrier, even when the offhand is empty. It is the same as the legacy `apoli:replace_inventory`.

```json
"entity_action": {
    "type": "apoli:drop_inventory",
    "slots": ["hotbar.0", "hotbar.1", "hotbar.2"]
}
```

An example with a legacy ID, which drops the first three hotbar slots. It resolves to `operation: drop`.

```json
"entity_action": {
    "type": "apoli:inventory_action",
    "operation": "modify",
    "inventory_type": "power",
    "power": "example:extra_inventory",
    "item_action": { "type": "apoli:consume" }
}
```

This goes through the stored container of the `example:extra_inventory` [inventory power](/docs/datapack/powers/inventory) and consumes one of each item. Power inventory slots are addressed as `container.N`, such as `"slots": ["container.0", "container.1"]`, and this only runs on the server.
