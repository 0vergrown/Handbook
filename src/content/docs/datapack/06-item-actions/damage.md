---
title: "Damage (Item Action Type)"
description: "Uses up some of the item stack's durability."
navigation_title: "Damage"
---

Uses up some of the item stack's durability.

Type ID: `apoli:damage`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | How much damage to do to the item stack. |
| `ignore_unbreaking` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the action ignores the Unbreaking enchantment. |

## Examples

```json
"item_action": {
    "type": "apoli:damage",
    "amount": 10,
    "ignore_unbreaking": true
}
```

This damages the item stack by 10, ignoring Unbreaking.
