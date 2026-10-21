---
title: "Disable Regen (Power Type)"
description: "Stops the natural regeneration that comes from a full hunger bar."
navigation_title: "Disable Regen"
---

Stops the natural regeneration that vanilla gives a player whose hunger is high enough. Every other source of healing still works, such as potions, golden apples, [`apoli:heal`](/docs/datapack/entity-actions/heal) and beacons, so an origin with this power has to heal through those instead of waiting.

Type ID: `apoli:disable_regen`

## Fields

_None._ The power takes the fields every power takes, and `condition` is the useful one here.

## Examples

Never regenerate naturally:

```json
{
  "type": "apoli:disable_regen"
}
```

Here a vampire regenerates normally while it has blood, and not at all without it:

```json
{
  "type": "apoli:disable_regen",
  "condition": {
    "type": "apoli:resource",
    "resource": "vampire:blood",
    "comparison": "<=",
    "compare_to": 0
  }
}
```

Give the origin another way to heal, such as healing over time while it has blood:

```json
{
  "type": "apoli:action_over_time",
  "interval": 40,
  "entity_action": { "type": "apoli:heal", "amount": 1 },
  "condition": {
    "type": "apoli:resource",
    "resource": "vampire:blood",
    "comparison": ">=",
    "compare_to": 4
  }
}
```
