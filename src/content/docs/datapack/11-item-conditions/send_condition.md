---
title: "Send Condition (Item Condition Type)"
description: Asks an apoli:receive_condition power on the item's holder for the answer.
navigation_title: "Send Condition"
aliases: ["shappoli:send_condition"]
---

Asks an [`apoli:receive_condition`](/docs/datapack/powers/receive_condition) power on whoever is holding the stack, which answers with its `item_condition`.

Type ID: `apoli:send_condition` (also `shappoli:send_condition`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`receiver` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The id of a power on the same entity. Nothing happens if the entity does not have it, if it is suppressed, if its own `condition` fails, or if it is not the right receiving type.

## Example

```json
{
  "type": "apoli:receive_condition",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "tag": "minecraft:planks" }
  }
}
```

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": {
    "type": "apoli:send_condition",
    "receiver": "mypack:is_forbidden_material"
  }
}
```
