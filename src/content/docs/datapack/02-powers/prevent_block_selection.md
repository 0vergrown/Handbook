---
title: "Prevent Block Selection (Power Type)"
description: "Prevents the selection of blocks for the player that has the power."
navigation_title: "Prevent Block Selection"
---

Prevents the selection of blocks for the player that has the power.

Type ID: `apoli:prevent_block_selection`

> Preventing the "selection" of a block means that the player won't be able to mine or interact with the said block; meaning that actions will pass through the block to whatever is behind the said block.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only blocks that fulfill this condition are affected.

> Implemented by emptying the block's **outline** shape for that player, which is what a picking raycast tests — so the ray carries on to whatever is behind, exactly as described above. The *collision* shape is untouched, so the block is still solid; walking through things is [apoli:phasing](/docs/datapack/powers/phasing).
>
> With no `block_condition` at all, every block becomes unselectable.

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

This example will prevent the selection of cobwebs (including the Temporary Cobweb block from the Arachnid's power), allowing the player to punch through them, unless they sneak.
