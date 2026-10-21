---
title: "Accessory Equipped Count (Entity Condition Type)"
description: "Compares how many accessories the entity is wearing."
navigation_title: "Accessory Equipped Count"
aliases: ["equipped_trinket_count"]
---

Counts the accessories the entity currently has equipped and compares that number.

Type ID: `apoli:accessory_equipped_count` (alias `apoli:equipped_trinket_count`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the count is compared: `<`, `<=`, `>`, `>=`, `==` or `!=`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The count to compare against. |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to count in. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |

## Examples

```json
{
  "type": "apoli:accessory_equipped_count",
  "comparison": ">=",
  "compare_to": 3
}
```

This checks whether the entity is wearing at least three accessories.

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

This minimalist origin moves faster while it wears nothing at all.

```json
{
  "type": "apoli:accessory_equipped_count",
  "slots": ["hand/ring"],
  "comparison": ">=",
  "compare_to": 2
}
```

This only counts rings, and passes for two or more.
