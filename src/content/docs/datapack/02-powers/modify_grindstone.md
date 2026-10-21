---
title: "Modify Grindstone (Power Type)"
description: "Changes what a grindstone gives back when the player repairs an item or removes its enchantments."
navigation_title: "Modify Grindstone"
---

Changes what a grindstone gives back when the player repairs an item or removes its enchantments.

Type ID: `apoli:modify_grindstone`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `result_type` | [String](/docs/datapack/data-types/string) | `"unchanged"` | What the result becomes: `"unchanged"` keeps it, `"specified"` replaces it with `result_stack`, `"from_top"` replaces it with the item in the top input slot, and `"from_bottom"` replaces it with the item in the bottom input slot. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when they take the item out of the result slot. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the grindstone block when the player takes the item out of its result slot. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the result item. |
| `item_action_after_grinding` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | If set, this action runs on the result item after the grinding is done. |
| `top_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item in the top input slot passes this condition. |
| `bottom_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item in the bottom input slot passes this condition. |
| `output_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the actions only run when the item in the result slot passes this condition. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | The replacement item, used only when `result_type` is `"specified"`. |
| `xp_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the experience gained from removing enchantments. |

## Examples

```json
{
    "type": "apoli:modify_grindstone",
    "xp_modifier": {
        "operation": "multiply_total_multiplicative",
        "value": 0.5
    }
}
```

This gives 50% more experience for removing enchantments at a grindstone.

```json
{
    "type": "apoli:modify_grindstone",
    "result_type": "specified",
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:air"
    },
    "output_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:diamond_sword"
        }
    },
    "result_stack": {
        "item": "minecraft:netherite_sword"
    }
}
```

When the result would be a diamond sword, this replaces it with a netherite sword, and the grindstone disappears once the player takes the item.
