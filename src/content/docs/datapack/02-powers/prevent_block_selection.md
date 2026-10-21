---
title: "Prevent Block Selection (Power Type)"
description: "Stops the player that has the power from selecting blocks."
navigation_title: "Prevent Block Selection"
---

Stops the player that has the power from selecting blocks. The player can't mine or interact with an unselectable block, and anything they aim at passes through it to whatever is behind.

Type ID: `apoli:prevent_block_selection`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, only blocks that pass this condition are affected. With no `block_condition`, every block is unselectable. |

> [!NOTE]
> The power empties the block's outline shape for that player. Picking raycasts test the outline, so they carry on to whatever is behind the block. The collision shape is untouched, so the block is still solid. To walk through blocks, use [apoli:phasing](/docs/datapack/powers/phasing).

## Examples

```json
{
    "type": "apoli:prevent_block_selection",
    "block_condition": {
      "type": "apoli:in_tag",
      "tag": "origins:cobwebs"
    },
    "condition": {
      "type": "apoli:sneaking",
      "inverted": true
    }
}
```

This stops the player from selecting cobwebs, including the temporary cobwebs from the Arachnid's power, so they can hit things through them. Sneaking turns the power off.
