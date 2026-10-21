---
title: "Accessory Slot Count (Entity Condition Type)"
description: "Compares how many accessory slots the entity has."
navigation_title: "Accessory Slot Count"
aliases: ["trinket_slot_count"]
---

Counts the accessory slots the entity has, whether or not anything is in them. Use it to check the effect of [`apoli:modify_accessory_slots`](/docs/compat/accessories/modify_accessory_slots), or to make something depend on the player having somewhere to put it.

Type ID: `apoli:accessory_slot_count` (alias `apoli:trinket_slot_count`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the count is compared: `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The count to compare against. |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to count. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |

## Example

```json
{
  "type": "apoli:accessory_slot_count",
  "slots": ["hand/ring"],
  "comparison": ">",
  "compare_to": 0
}
```

This passes when there is at least one ring slot, so a ring-based ability can check it has somewhere to go.
