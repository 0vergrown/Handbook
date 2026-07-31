---
title: "Consume (Item Action Type)"
description: "Removes a provided amount of items from the item stack."
navigation_title: "Consume"
---

Removes a provided amount of items from the item stack. (Similar to how Minecraft's vanilla `/clear` command works)

Type ID: `apoli:consume`
## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`amount` | [Integer](/docs/datapack/data-types/integer) | `1` | The amount of items to remove.

## Examples

```json
"item_action": {
    "type": "apoli:consume",
    "amount": 1
}
```

This example will "consume" (remove) 1 item from the item stack.
