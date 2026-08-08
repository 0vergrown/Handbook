---
title: "Change Slot (Entity Action Type)"
description: "Swaps or moves the contents of two slots."
navigation_title: "Change Slot"
aliases: ["swap_slot", "move_slot"]
---

Swaps or moves the contents of two slots.

Type ID: `apoli:change_slot`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `slot_a` | [Item Slot](/docs/datapack/data-types/item-slot) | **required** | The first slot. |
| `slot_b` | [Item Slot](/docs/datapack/data-types/item-slot) | **required** | The second slot. |
| `operation` | String | `"swap"` | `"swap"` exchanges the two stacks; `"move"` puts `slot_a`'s stack into `slot_b` and empties `slot_a`. |
| `inventory_type` | [Inventory Type](/docs/datapack/data-types/inventory-type) | `"inventory"` | Whether the slots refer to the entity's inventory or to an [`apoli:inventory`](/docs/datapack/powers/inventory) power's container. |
| `power` | Identifier | _optional_ | The `apoli:inventory` power to act on. Required when `inventory_type` is `"power"`. |

> `"move"` **discards** whatever was in `slot_b`. Use `"swap"` unless deleting it is the point.

With `inventory_type: "inventory"` the slot ids are the same ones the `/item` command uses, so `armor.head`, `weapon.offhand` and `enderchest.4` all work — on any entity that has those slots, not just players. A slot that refuses the stack (armor slots reject non-armor) leaves both slots untouched rather than dropping the item.

With `inventory_type: "power"` the slots are indices into that power's own container, `container.0` upward.

## Examples

```json
{
    "type": "apoli:change_slot",
    "slot_a": "weapon.mainhand",
    "slot_b": "weapon.offhand"
}
```

Swaps the held item with the off-hand item.

```json
{
    "type": "apoli:change_slot",
    "slot_a": "weapon.mainhand",
    "slot_b": "container.0",
    "operation": "move",
    "inventory_type": "power",
    "power": "example:pocket_dimension"
}
```

Stores whatever is held into the first slot of a power inventory, emptying the hand.
