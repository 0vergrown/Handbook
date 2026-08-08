---
title: "Disable Slot (Power Type)"
description: "Makes one or more of the holder's own inventory slots refuse items."
navigation_title: "Disable Slot"
aliases: ["restrict_slot"]
---

Makes one or more of the holder's own inventory slots refuse items. The generalisation of [`apoli:restrict_armor`](/docs/datapack/powers/restrict_armor): instead of only the four armor slots, any slot in the player's inventory can be sealed.

Type ID: `apoli:disable_slot`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `slot` | [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | A single slot to disable. |
| `slots` | Array of [Item Slot](/docs/datapack/data-types/item-slot) | _optional_ | Several slots to disable. Merged with `slot`. |
| `item_condition` | Item Condition Type | _optional_ | Only refuse items matching this condition. Omit it to seal the slot against everything. |

## Which slots work

Only the holder's own inventory:

- `hotbar.0` – `hotbar.8`
- `inventory.0` – `inventory.26`
- `armor.head`, `armor.chest`, `armor.legs`, `armor.feet`
- `weapon.mainhand` — follows the *selected* hotbar slot, not a fixed index
- `weapon.offhand`

Anything else (`enderchest.*`, `horse.*`, `villager.*`) is ignored, with a warning in the log when the pack loads.

## What "disabled" means

1. The inventory screen refuses an item dropped into the slot, and shift-clicking skips it.
2. Item pickup routes around the slot — picked-up items land somewhere else.
3. Anything already in the slot is moved back into the holder's own inventory **once**, when the power is gained or unsuppressed — exactly like `apoli:restrict_armor` does for armor. It is only dropped at their feet if there is nowhere left to put it.

> The relocation is a one-shot, not a per-tick sweep. A slot that a `condition` disables later keeps whatever is already in it; it just will not accept anything new. If you need the slot emptied the moment the condition flips, pair the power with [apoli:action_over_time](/docs/datapack/powers/action_over_time).

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

A four-slot hotbar — the right-hand half cannot hold anything.

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

The off-hand works normally, but will not hold a shield.

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

No armor and nothing held. Because `weapon.mainhand` tracks the selection, switching hotbar slots does not get around it.
