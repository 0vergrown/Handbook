---
title: "origins:modify_harvest"
description: "[Power Type](../powertypes.md)"
---

Power Type

Modifies whether a player is able to harvest a block or not (= receive the block drops).

Type ID: `origins:modify_harvest`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only blocks that fulfill this condition are affected.
`allow` | Boolean | | Determines whether the player is be able to harvest the block.


## Examples

```json
{
    "type": "origins:modify_harvest",
    "block_condition": {
        "type": "origins:block",
        "block": "minecraft:diamond_block"
    },
    "allow": true
}
```

This example will allow players to harvest a Diamond Block regardless of using the proper tool or not.

