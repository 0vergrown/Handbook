---
title: "Modify Anvil (Power Type)"
description: "Changes how much an anvil repairs when the player uses it."
navigation_title: "Modify Anvil"
---

Changes how much an anvil repairs when the player with the power uses it.

Type ID: `apoli:modify_anvil`

In an anvil, an item can be repaired two ways. With its repair material, such as diamonds for diamond gear, each piece of material restores a quarter of the item's durability, so four pieces fully repair it. By combining two of the same item, the result gets the durability of both plus a bonus of 12% of its maximum.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the modifiers only apply when the item in the anvil's first slot passes this condition. |
| `repair_material_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes how many pieces of repair material a full repair takes, `4` by default. Each piece restores that share of the item's durability. The result is rounded and is at least `1`. `repair_material_modifiers` is accepted as another spelling. |
| `combine_bonus_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes the bonus durability combining two items adds, in percent of the item's maximum, `12` by default. The result is rounded and is at least `0`. `combine_bonus_modifiers` is accepted as another spelling. |

The experience level cost of the repair doesn't change.

## Examples

```json
{
    "type": "apoli:modify_anvil",
    "repair_material_modifier": {
        "operation": "multiply_base_multiplicative",
        "value": -0.5
    },
    "combine_bonus_modifier": {
        "operation": "multiply_base_multiplicative",
        "value": 11
    }
}
```

Each piece of repair material restores half of the item's durability, so two fully repair it. Combining two items adds 144% of the maximum durability on top, which always repairs the result fully.
