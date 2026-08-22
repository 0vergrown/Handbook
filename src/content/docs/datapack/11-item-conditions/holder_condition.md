---
title: "Holder Condition (Item Condition Type)"
description: Tests an entity condition against whoever is holding the item.
navigation_title: "Holder Condition"
aliases: ["holder", "shappoli:holder_condition", "shappoli:holder"]
---

Tests an [entity condition](/docs/datapack/entity-conditions) against whoever is holding the stack. Fails when nothing is holding it — an item on the ground or in a chest has no holder.

This is the bridge from an item context back to an entity one, which is what lets an item condition depend on the person rather than the item.

Type ID: `apoli:holder_condition` (aliases `apoli:holder`, `shappoli:holder_condition`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_condition` | [Entity Condition](/docs/datapack/entity-conditions) | **required** | The condition to test against the holder. `condition` is accepted as a legacy spelling.

## Example

A cursed sword that only bites for people who are not sneaking:

```json
{
  "type": "apoli:modify_damage_dealt",
  "item_condition": {
    "type": "apoli:holder_condition",
    "entity_condition": {
      "type": "apoli:sneaking",
      "inverted": true
    }
  },
  "modifier": { "operation": "multiply_base_multiplicative", "value": 0.5 }
}
```

Or gate an item's use on the holder's resource:

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": {
    "type": "apoli:holder_condition",
    "entity_condition": {
      "type": "apoli:resource",
      "resource": "vampire:blood",
      "comparison": "<=",
      "compare_to": 0
    }
  }
}
```
