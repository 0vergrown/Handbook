---
title: "Modify Slipperiness (Power Type)"
description: "Changes how slippery blocks are for the entity, to imitate or cancel out ice."
navigation_title: "Modify Slipperiness"
---

Changes how slippery blocks are for the entity with the power. Use it to make ground behave like ice, or to stop ice from being slippery, under the conditions you choose.

Type ID: `apoli:modify_slipperiness`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the modifiers only apply to blocks that pass this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the slipperiness. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the slipperiness. |

## Examples

```json
{
    "type": "apoli:modify_slipperiness",
    "modifier": {
        "operation": "multiply_total",
        "value": 0.5
    },
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:dirt"
    }
}
```

This makes dirt 50% more slippery for the entity.
