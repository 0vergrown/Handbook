---
title: "Change Slot (Entity Action Type)"
description: "Swaps the contents of two slots, or moves one into the other."
navigation_title: "Change Slot"
aliases: ["swap_slot", "move_slot"]
---

Swaps the contents of two slots, or moves the contents of one into the other.

Type ID: `apoli:change_slot`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot_a` | [Item Slot](/docs/datapack/data-types/item-slot) | _required_ | The first slot. |
| `slot_b` | [Item Slot](/docs/datapack/data-types/item-slot) | _required_ | The second slot. |
| `operation` | [String](/docs/datapack/data-types/string) | `"swap"` | `"swap"` exchanges the two stacks. `"move"` puts the stack from `slot_a` into `slot_b` and empties `slot_a`. |
| `inventory_type` | [Inventory Type](/docs/datapack/data-types/inventory-type) | `"inventory"` | Whether the slots refer to the entity's inventory or to the container of an [`apoli:inventory`](/docs/datapack/powers/inventory) power. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The `apoli:inventory` power to act on. Required when `inventory_type` is `"power"`. |

> [!WARNING]
> `"move"` deletes whatever was in `slot_b`. Use `"swap"` unless deleting it is the point.

With `inventory_type: "inventory"` the slot IDs are the same ones the `/item` command uses, so `armor.head`, `weapon.offhand` and `enderchest.4` all work, on any entity that has those slots. A slot that refuses the stack (armor slots reject anything that isn't armor) leaves both slots untouched instead of dropping the item.

With `inventory_type: "power"` the slots are indices into that power's own container, from `container.0` upward.

## Examples

```json
{
    "type": "apoli:change_slot",
    "slot_a": "weapon.mainhand",
    "slot_b": "weapon.offhand"
}
```

This swaps the held item with the offhand item.

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

This puts whatever is held into the first slot of a power inventory and empties the hand.
