---
title: "Same Equipped Item (Bi-Entity Condition Type)"
description: "Checks whether the actor and the target hold the same item in the given equipment slots."
navigation_title: "Same Equipped Item"
---

Checks whether the actor and the target hold the same item in the given equipment slots. By default only the item type has to match. Turn on `compare_count` and `compare_tag` to require the stack size and the item data to match as well.

Type ID: `apoli:same_equipped_item`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `equipment_slot` | [String](/docs/datapack/data-types/string) or list | `"mainhand"` | The actor's slots to read: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"` or `"feet"`. |
| `target_equipment_slot` | [String](/docs/datapack/data-types/string) or list | _optional_ | The target's slots to read. Defaults to `equipment_slot`. |
| `compare_id` | [Boolean](/docs/datapack/data-types/boolean) | `true` | The two stacks must be the same item. |
| `compare_count` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The two stacks must have the same count. |
| `compare_tag` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The two stacks must carry identical item data, such as enchantments, a custom name and custom data. `compare_components` and `compare_nbt` are other spellings. |
| `allow_empty` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Counts two empty slots as a match. It is off by default, so a pair with empty hands never passes. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | The actor's stack must also pass this. |

With more than one slot listed, the condition passes when any actor slot matches any target slot, so `"equipment_slot": ["mainhand", "offhand"]` means either of my hands holds what either of theirs does.

## Examples

Both wielding the same weapon:

```json
{
  "type": "apoli:same_equipped_item",
  "equipment_slot": "mainhand"
}
```

A mirror match, with the same sword and the same enchantments:

```json
{
  "type": "apoli:same_equipped_item",
  "equipment_slot": "mainhand",
  "compare_tag": true,
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "tag": "minecraft:swords" }
  }
}
```

Their helmet is what you are holding:

```json
{
  "type": "apoli:same_equipped_item",
  "equipment_slot": "mainhand",
  "target_equipment_slot": "head"
}
```
