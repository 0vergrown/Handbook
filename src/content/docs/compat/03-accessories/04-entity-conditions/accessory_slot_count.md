---
title: "Accessory Slot Count (Entity Condition Type)"
description: Counts how many accessory slots the entity has.
navigation_title: "Accessory Slot Count"
aliases: ["trinket_slot_count"]
---

Counts the accessory **slots** the entity has, whether or not anything is in them. Use it to check the effect of [`apoli:modify_accessory_slots`](/docs/compat/accessories/modify_accessory_slots), or to gate something on the player having somewhere to put it.

Type ID: `apoli:accessory_slot_count` (alias `apoli:trinket_slot_count`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | **required** | The count to compare against.
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.

## Example

Only grant a ring-based ability if there is a ring slot to use:

```json
{
  "type": "apoli:accessory_slot_count",
  "slots": ["hand/ring"],
  "comparison": ">",
  "compare_to": 0
}
```

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
