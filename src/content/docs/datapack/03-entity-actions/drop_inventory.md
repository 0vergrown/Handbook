---
title: "Drop Inventory (Entity Action Type)"
description: "Drops each matching slot of the entity's inventory (or a power's inventory) onto the ground."
navigation_title: "Drop Inventory"
---

Drops each matching slot of the entity's inventory (or a power's inventory) onto the ground.

Type ID: `apoli:drop_inventory`

> **MERGED:** this is now an alias for [Inventory Action](/docs/datapack/entity-actions/inventory_action) with `operation: drop`. The id still works unchanged; see Inventory Action for the full, current field list (`throw_randomly`, `retain_ownership`, `amount`, `inventory_type: power`, …).

```json
"entity_action": { "type": "apoli:drop_inventory" }
```

Equivalent to `{ "type": "apoli:inventory_action", "operation": "drop" }` — drops the entity's whole inventory.
