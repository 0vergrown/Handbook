---
title: "Send Condition (Item Condition Type)"
description: Asks an apoli:receive_condition power on the item's holder for the answer.
navigation_title: "Send Condition"
aliases: ["shappoli:send_condition"]
---

Asks an [`apoli:receive_condition`](/docs/datapack/powers/receive_condition) power on whoever is holding the stack, which answers with its `item_condition`.

Type ID: `apoli:send_condition` (also `shappoli:send_condition`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `receiver` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power on the holder. The condition is false if the holder doesn't have it, if it is suppressed, if its own `condition` fails, or if it isn't the right receiving type. |

## Example

The receiver defines which materials are forbidden:

```json
{
  "type": "apoli:receive_condition",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "tag": "minecraft:planks" }
  }
}
```

A power that blocks using them asks it:

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": {
    "type": "apoli:send_condition",
    "receiver": "mypack:is_forbidden_material"
  }
}
```
