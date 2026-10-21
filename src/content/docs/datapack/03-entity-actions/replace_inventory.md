---
title: "Replace Inventory (Entity Action Type)"
description: "Replaces each matching slot of the entity's inventory, or a power's inventory, with an item stack."
navigation_title: "Replace Inventory"
---

Replaces each matching slot of the entity's inventory, or a power's inventory, with an item stack.

Type ID: `apoli:replace_inventory`

> [!NOTE]
> This ID is an alias for [Inventory Action](/docs/datapack/entity-actions/inventory_action) with `operation: replace`. See that page for the full field list, including `stack`, `merge_nbt` and `inventory_type: power`.

```json
"entity_action": {
    "type": "apoli:replace_inventory",
    "slot": "weapon.offhand",
    "stack": { "item": "minecraft:barrier" }
}
```

This is the same as `{ "type": "apoli:inventory_action", "operation": "replace", "slot": "weapon.offhand", "stack": { "item": "minecraft:barrier" } }`.
