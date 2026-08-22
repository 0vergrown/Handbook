---
title: "Accessory Equipped Count (Entity Condition Type)"
description: Counts how many accessories the entity is wearing.
navigation_title: "Accessory Equipped Count"
aliases: ["equipped_trinket_count"]
---

Counts the accessories the entity currently has equipped and compares that number.

Type ID: `apoli:accessory_equipped_count` (alias `apoli:equipped_trinket_count`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | **required** | The count to compare against.
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only count accessories matching this.

## Examples

Wearing at least three accessories:

```json
{
  "type": "apoli:accessory_equipped_count",
  "comparison": ">=",
  "compare_to": 3
}
```

A "minimalist" origin rewarded for wearing nothing at all:

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    {
      "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_base_multiplicative",
      "value": 0.25
    }
  ],
  "condition": {
    "type": "apoli:accessory_equipped_count",
    "comparison": "==",
    "compare_to": 0
  }
}
```

Count only rings:

```json
{
  "type": "apoli:accessory_equipped_count",
  "slots": ["hand/ring"],
  "comparison": ">=",
  "compare_to": 2
}
```

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
