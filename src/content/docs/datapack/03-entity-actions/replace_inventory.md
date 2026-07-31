---
title: "Replace Inventory (Entity Action Type)"
description: "Replaces each matching slot of the entity's inventory (or a power's inventory) with a given item stack."
navigation_title: "Replace Inventory"
---

Replaces each matching slot of the entity's inventory (or a power's inventory) with a given item stack.

Type ID: `apoli:replace_inventory`

> **MERGED:** this is now an alias for [Inventory Action](/docs/datapack/entity-actions/inventory_action) with `operation: replace`. The id still works unchanged; see Inventory Action for the full, current field list (`stack`, `merge_nbt`, `inventory_type: power`, …).

```json
"entity_action": {
    "type": "apoli:replace_inventory",
    "slot": "weapon.offhand",
    "stack": { "item": "minecraft:barrier" }
}
```

Equivalent to `{ "type": "apoli:inventory_action", "operation": "replace", "slot": "weapon.offhand", "stack": { "item": "minecraft:barrier" } }`.
