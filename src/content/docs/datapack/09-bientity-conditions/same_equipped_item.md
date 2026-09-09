---
title: "Same Equipped Item (Bi-Entity Condition Type)"
description: "Checks whether the actor and the target hold the same item in the given equipment slots."
navigation_title: "Same Equipped Item"
---

Checks whether the actor and the target hold the same item in the given equipment slots. By default only the item type has to match; turn on `compare_count` and `compare_tag` to require the stack size and the item data to match as well.

Type ID: `apoli:same_equipped_item`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`equipment_slot` | [String](/docs/datapack/data-types/string) or list | `"mainhand"` | The actor's slot(s) to read: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"` or `"feet"`.
`target_equipment_slot` | [String](/docs/datapack/data-types/string) or list | *optional* | The target's slot(s) to read. Defaults to `equipment_slot`.
`compare_id` | [Boolean](/docs/datapack/data-types/boolean) | `true` | The two stacks must be the same item.
`compare_count` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The two stacks must have the same count.
`compare_tag` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The two stacks must carry identical item data — enchantments, custom name, custom data and the rest. Also spelled `compare_components` or `compare_nbt`.
`allow_empty` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Count two empty slots as a match. Off by default, so an unarmed pair never passes.
`item_condition` | Item Condition Type | *optional* | The actor's stack must also satisfy this.

With more than one slot listed, the condition passes when **any** actor slot matches **any** target slot — so `"equipment_slot": ["mainhand", "offhand"]` means "either of my hands holds what either of theirs does".

## Examples

Both wielding the same weapon:

```json
{
  "type": "apoli:same_equipped_item",
  "equipment_slot": "mainhand"
}
```

A mirror match — same sword, same enchantments:

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
