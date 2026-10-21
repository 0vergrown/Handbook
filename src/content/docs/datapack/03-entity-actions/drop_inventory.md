---
title: "Drop Inventory (Entity Action Type)"
description: "Drops each matching slot of the entity's inventory, or a power's inventory, onto the ground."
navigation_title: "Drop Inventory"
---

Drops each matching slot of the entity's inventory, or a power's inventory, onto the ground.

Type ID: `apoli:drop_inventory`

> [!NOTE]
> This ID is an alias for [Inventory Action](/docs/datapack/entity-actions/inventory_action) with `operation: drop`. See that page for the full field list, including `throw_randomly`, `retain_ownership`, `amount` and `inventory_type: power`.

```json
"entity_action": { "type": "apoli:drop_inventory" }
```

This is the same as `{ "type": "apoli:inventory_action", "operation": "drop" }` and drops the entity's whole inventory.
