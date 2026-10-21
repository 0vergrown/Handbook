---
title: "Knock Out (Entity Action Type)"
description: "Knocks the entity out."
navigation_title: "Knock Out"
---

Puts the entity straight into the knocked-out state, as if they had run out of health.

Type ID: `apoli:knock_out`

> [!NOTE]
> This type needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

This action has no fields.

## Example

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": {
    "type": "apoli:target_action",
    "action": { "type": "apoli:knock_out" }
  },
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:subdue",
    "comparison": ">",
    "compare_to": 0
  }
}
```

This ability knocks out whoever the holder hits instead of killing them, while the `mypack:subdue` resource is above 0.
