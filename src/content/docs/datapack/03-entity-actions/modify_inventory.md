---
title: "Modify Inventory (Entity Action Type)"
description: "Runs an item action on each matching slot of the entity's inventory (or a power's inventory)."
navigation_title: "Modify Inventory"
---

Runs an item action on each matching slot of the entity's inventory (or a power's inventory).

Type ID: `apoli:modify_inventory`

> **MERGED:** this is now an alias for [Inventory Action](/docs/datapack/entity-actions/inventory_action) with `operation: modify`. The id still works unchanged; see Inventory Action for the full, current field list (including `inventory_type: power` support).

```json
"entity_action": {
    "type": "apoli:modify_inventory",
    "item_action": { "type": "apoli:consume" }
}
```

Equivalent to `{ "type": "apoli:inventory_action", "operation": "modify", "item_action": { "type": "apoli:consume" } }`.
