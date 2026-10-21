---
title: "Disable Slot (Power Type)"
description: "Makes one or more slots in the entity's own inventory refuse items."
navigation_title: "Disable Slot"
aliases: ["restrict_slot"]
---

Makes one or more slots in the entity's own inventory refuse items. It is the general form of [`apoli:restrict_armor`](/docs/datapack/powers/restrict_armor): any slot in the player's inventory can be sealed, not only the four armor slots.

Type ID: `apoli:disable_slot`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | A single slot to disable. |
| `slots` | [Array](/docs/datapack/data-types/array) of [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Several slots to disable, merged with `slot`. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only refuse items that pass this condition. Without it, the slot refuses everything. |

## Which slots work

Only slots in the entity's own inventory:

- `hotbar.0` to `hotbar.8`
- `inventory.0` to `inventory.26`
- `armor.head`, `armor.chest`, `armor.legs` and `armor.feet`
- `weapon.mainhand`, which follows the selected hotbar slot instead of a fixed index
- `weapon.offhand`

Any other slot (`enderchest.*`, `horse.*`, `villager.*`) is ignored, with a warning in the log when the pack loads.

## What disabled means

1. The inventory screen refuses an item dropped into the slot, and shift-clicking skips it.
2. Picked-up items go around the slot and land somewhere else.
3. Anything already in the slot is moved back into the entity's own inventory once, when the power is gained or unsuppressed, as `apoli:restrict_armor` does for armor. It is only dropped at the entity's feet if there is nowhere left to put it.

> [!NOTE]
> Items are moved out once, not every tick. A slot that a `condition` disables later keeps whatever is already in it and only refuses new items. If the slot should empty the moment the condition changes, add an [apoli:action_over_time](/docs/datapack/powers/action_over_time) that clears it.

## Examples

```json
{
    "type": "apoli:disable_slot",
    "slots": [
        "hotbar.5",
        "hotbar.6",
        "hotbar.7",
        "hotbar.8"
    ]
}
```

A four-slot hotbar, because the right half of the hotbar can't hold anything.

```json
{
    "type": "apoli:disable_slot",
    "slot": "weapon.offhand",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:shield"
        }
    }
}
```

The off hand works as usual, except that it won't hold a shield.

```json
{
    "type": "apoli:disable_slot",
    "slots": [
        "armor.head",
        "armor.chest",
        "armor.legs",
        "armor.feet",
        "weapon.mainhand"
    ]
}
```

No armor and nothing held. `weapon.mainhand` follows the selected slot, so switching hotbar slots doesn't get around it.
