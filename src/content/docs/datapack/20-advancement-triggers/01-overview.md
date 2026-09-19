---
title: "Advancement Triggers"
description: "The advancement criteria Apoli adds, for advancements that react to powers and resources."
navigation_title: "Overview"
---

Apoli registers vanilla **advancement triggers**, so an advancement can fire on something a power did. They go in the `criteria` block of an advancement JSON like any vanilla trigger, and they take the usual optional `player` entity predicate on top of their own fields.

| Trigger | Fires when |
| --- | --- |
| [apoli:power](/docs/datapack/advancement-triggers/power) | A power is granted to the player. |
| [apoli:resource](/docs/datapack/advancement-triggers/resource) | A resource or cooldown the player holds changes value. |

Origins adds one of its own: [origins:chose_origin](/docs/datapack/origins/chose_origin).

## Shape

```json
{
  "criteria": {
    "mana_master": {
      "trigger": "apoli:resource",
      "conditions": {
        "resource": "example:mana",
        "value": { "min": 100 }
      }
    }
  },
  "requirements": [["mana_master"]]
}
```

Everything in `conditions` is optional. A trigger with an empty `conditions` block fires on any occurrence of its event.

> Advancement triggers are server-side and per player. They never fire for mobs or other entities, even ones that hold the power.
