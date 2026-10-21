---
title: "Send Action (Item Action Type)"
description: Hands this item action off to an apoli:receive_action power on the item's holder.
navigation_title: "Send Action"
aliases: ["shappoli:send_action"]
---

Hands off to an [`apoli:receive_action`](/docs/datapack/powers/receive_action) power on whoever is holding the stack. The receiver acts on the stack through its `item_action` and `item_condition` fields.

Type ID: `apoli:send_action` (also `shappoli:send_action`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `receiver` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power on the holder. Nothing happens if the holder doesn't have it, if it is suppressed, if its own `condition` fails, or if it isn't the right receiving type. |

## Example

The receiver wears down a tool by one point of durability:

```json
{
  "type": "apoli:receive_action",
  "item_condition": { "type": "apoli:is_damageable" },
  "item_action": { "type": "apoli:damage", "amount": 1 }
}
```

Any power that uses an item can send to it:

```json
{
  "type": "apoli:action_on_item_use",
  "item_action": {
    "type": "apoli:send_action",
    "receiver": "mypack:wear_out_tool"
  }
}
```
