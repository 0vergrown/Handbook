---
title: "Consume (Item Action Type)"
description: "Removes a number of items from the item stack."
navigation_title: "Consume"
---

Removes a number of items from the item stack, much like the vanilla `/clear` command.

Type ID: `apoli:consume`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | How many items to remove. |

## Examples

```json
"item_action": {
    "type": "apoli:consume",
    "amount": 1
}
```

This consumes (removes) 1 item from the stack.
