---
title: "Blast Resistance (Block Condition Type)"
description: "Checks the blast resistance value of the block."
navigation_title: "Blast Resistance"
---

Checks the blast resistance value of the block.

Type ID: `apoli:blast_resistance`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the blast resistance of the block should be compared to the specified value.
`compare_to` | [Float](/docs/datapack/data-types/float) | | The value at which the blast resistance value of the block will be compared to.

## Examples

```json
"block_condition": {
    "type": "apoli:blast_resistance",
    "comparison": ">=",
    "compare_to": 1200
}
```
This example will check if the blast resistance value of the block is that of an Obsidian block or greater.
