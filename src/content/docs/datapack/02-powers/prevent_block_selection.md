---
title: "origins:prevent_block_selection"
description: "[Power Type](../powertypes.md)"
---

Power Type

Prevents the selection of blocks for the player that has the power.

Type ID: `origins:prevent_block_selection`

!!! note

    Preventing the "selection" of a block means that the player won't be able to mine or interact with the said block; meaning that actions will pass through the block to whatever is behind the said block.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only blocks that fulfill this condition are affected.


## Examples

```json
{
    "type": "origins:prevent_block_selection",
    "block_condition": {
      "type": "origins:in_tag",
      "tag": "origins:cobwebs"
    },
    "condition": {
      "type": "origins:sneaking",
      "inverted": true
    }
}
```

This example will prevent the selection of cobwebs (including the Temporary Cobweb block from the Arachnid's power), allowing the player to punch through them, unless they sneak.

