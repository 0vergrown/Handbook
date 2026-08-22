---
title: "Knock Out (Entity Action Type)"
description: Knocks the entity out.
navigation_title: "Knock Out"
---

Puts the entity into the knocked-out state directly, as if they had run out of health.

Type ID: `apoli:knock_out`

## Fields

_None._

## Example

An ability that downs whoever you hit instead of killing them:

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

> Needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival). These types do not exist without it, so a pack using them must depend on the mod.
