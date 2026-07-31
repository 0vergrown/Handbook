---
title: "Inventory Action (Entity Action Type)"
description: "Walks the entity's inventory or a power inventory and performs one operation per matching slot — the operation field replaces the separate modify_inventory, replace_inventory and drop_inventory actions."
navigation_title: "Inventory Action"
aliases: ["modify_inventory", "replace_inventory", "drop_inventory"]
---

Walks the items of either the entity's inventory or an [apoli:inventory](/docs/datapack/powers/inventory), and performs one operation per matching slot. This single action replaces Apace's `modify_inventory`, `replace_inventory`, and `drop_inventory` — the `operation` field picks which behaviour you get.

Type ID: `apoli:inventory_action`

> **ALIASES:** the three legacy ids still work and select the matching operation automatically:
> `apoli:modify_inventory` → `operation: modify`, `apoli:replace_inventory` → `operation: replace`, `apoli:drop_inventory` → `operation: drop`. (Both the `apoli:` and `origins:` namespaces resolve.) Data packs written for either era load unchanged.

## Operations

| `operation`         | Per-slot behaviour                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `modify` *(default)* | Runs `item_action` on the stack.                                                                  |
| `replace`           | Swaps the stack for `stack`, then runs `item_action` (if any) on the replacement.                  |
| `drop`              | Drops the stack into the world, then runs `item_action` (if any) on the dropped stack first.       |

## Fields

| Field              | Type                                                                        | Default       | Description                                                                                                      |
| ------------------ | --------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `operation`        | String                                           | `"modify"`    | One of `modify`, `replace`, `drop` — see the table above.                                                        |
| `inventory_type`   | Inventory Type                           | `"inventory"` | Whether to walk the entity's own inventory or a power's inventory.                                               |
| `entity_action`    | Entity Action Type                             | _optional_    | Executed on the entity **once, before** the slots are walked.                                                    |
| `item_condition`   | Item Condition Type                           | _optional_    | If specified, only items fulfilling this condition are affected.                                                 |
| `slot`             | Item Slot                                     | _optional_    | Restrict to a single slot.                                                                                       |
| `slots`            | Array of Item Slots | _optional_    | Restrict to these slots. For a `power` inventory, use the `container.N` form (raw slot index).                   |
| `power`            | Identifier                                   | _optional_    | The [apoli:inventory](/docs/datapack/powers/inventory) to walk, when `inventory_type` is `"power"`.           |
| `process_mode`     | Process Mode                               | `"stacks"`    | How stacks are counted toward `limit`. Honoured by `modify`; `replace`/`drop` always act once per stack.         |
| `limit`            | Integer                                         | `0`           | Max number of stacks (or items, in `items` mode) to affect. `<= 0` means no limit.                               |
| `item_action`      | Item Action Type                                 | _optional_    | **Required-in-spirit for `modify`** (without it `modify` is a no-op); optional post-step for `replace`/`drop`.   |
| `stack`            | Item Stack                                   | _optional_    | **`replace` only** — the replacement item.                                                                       |
| `merge_nbt`        | Boolean                                         | `false`       | **`replace` only** — merge the old item's data onto the replacement. (1.20.1: NBT tag; 1.21.1: data components.) |
| `throw_randomly`   | Boolean                                         | `false`       | **`drop` only** — scatter items in random directions (death-drop style).                                         |
| `retain_ownership` | Boolean                                         | `true`        | **`drop` only** — keep the dropping entity as the item's thrower.                                                |
| `amount`           | Integer                                         | _optional_    | **`drop` only** — split this many off each matching stack instead of dropping the whole stack.                   |

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

Slightly damages every armour-valued item in the entity's inventory.

```json
"entity_action": {
    "type": "apoli:inventory_action",
    "operation": "replace",
    "slot": "weapon.offhand",
    "stack": { "item": "minecraft:barrier" }
}
```

Replaces the entity's offhand item with a Barrier. *(Equivalent to the legacy `apoli:replace_inventory`.)*

```json
"entity_action": {
    "type": "apoli:drop_inventory",
    "slots": ["hotbar.0", "hotbar.1", "hotbar.2"]
}
```

A legacy-id example: drops the first three hotbar slots. Resolves to `operation: drop`.

```json
"entity_action": {
    "type": "apoli:inventory_action",
    "operation": "modify",
    "inventory_type": "power",
    "power": "example:extra_inventory",
    "item_action": { "type": "apoli:consume" }
}
```

Walks the `example:extra_inventory` [Inventory power](/docs/datapack/entity-conditions/inventory)'s stored container and consumes one of each item. Power-inventory slots are addressed with `container.N` (e.g. `"slots": ["container.0", "container.1"]`); this runs server-side only.
