---
title: "Nothing (Bi-Entity Action Type)"
description: Does nothing. Useful as an explicit no-op branch.
navigation_title: "Nothing"
---

Does nothing at all. The bi-entity form of [`apoli:nothing`](/docs/datapack/entity-actions/nothing), for the same reasons: an explicit "nothing happens here" in a branch, or a placeholder for a required field.

Type ID: `apoli:nothing`

## Fields

_None._

## Example

```json
{
  "type": "apoli:if_else",
  "condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  },
  "if_action": { "type": "apoli:damage", "amount": 6, "damage_type": "minecraft:magic" },
  "else_action": { "type": "apoli:nothing" }
}
```
