---
title: "Item Slot (Data Type)"
description: "A string that names a slot of an entity's or container's inventory."
navigation_title: "Item Slot"
---

A [String](/docs/datapack/data-types/string) that names a slot of an entity's or a container's inventory.

> [!TIP]
> Use the `container.<slot_number>` slots for the slots of an [apoli:inventory](/docs/datapack/powers/inventory) power.

## Slots

| Name | Valid `<slot_number>` | Mapped index |
| --- | --- | --- |
| `armor.chest` | | 102 |
| `armor.feet` | | 100 |
| `armor.head` | | 103 |
| `armor.legs` | | 101 |
| `container.<slot_number>` | 0 to 53 | 0 to 53 |
| `enderchest.<slot_number>` | 0 to 26 | 200 to 226 |
| `horse.<slot_number>` | 0 to 14 | 500 to 514 |
| `horse.armor` | | 401 |
| `horse.saddle` | | 400 |
| `hotbar.<slot_number>` | 0 to 8 | 0 to 8 |
| `inventory.<slot_number>` | 0 to 26 | 9 to 35 |
| `villager.<slot_number>` | 0 to 7 | 300 to 307 |
| `weapon.mainhand` | | 98 |
| `weapon.offhand` | | 99 |
| `weapon` | | 98 |

## Examples

```json
"slot": "weapon.mainhand"
```

This is the entity's main hand slot.

```json
"slots": [
    "container.0",
    "container.1",
    "container.2",
    "container.3",
    "container.4",
    "container.5",
    "container.6",
    "container.7",
    "container.8"
]
```

These are slots 0 to 8 of a container. They can also stand for a player's hotbar slots 0 to 8, since those map to the same indices.
