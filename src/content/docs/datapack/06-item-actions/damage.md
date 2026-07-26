---
title: "apoli:damage"
description: "Damages the item stack with a specified amount."
---

Damages the item stack with a specified amount.

Type ID: `apoli:damage`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`amount` | Integer | `1` | The amount of damage it should do to the item stack.
`ignore_unbreaking` | Boolean | `false` | Determines if this action should ignore the Unbreaking enchantment.

## Examples

```json
"item_action": {
    "type": "apoli:damage",
    "amount": 10,
    "ignore_unbreaking": true
}
```

This example will damage the item stack by 10, ignoring the Unbreaking enchantment.
