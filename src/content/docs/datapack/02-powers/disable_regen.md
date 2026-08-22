---
title: "Disable Regen (Power Type)"
description: Stops the entity healing from the passive hunger-driven regeneration.
navigation_title: "Disable Regen"
---

Stops the natural regeneration that vanilla gives a player whose hunger is high enough. Every other source of healing still works — potions, golden apples, [`apoli:heal`](/docs/datapack/entity-actions/heal), a beacon — so this makes an origin depend on those rather than on waiting.

Type ID: `apoli:disable_regen`

## Fields

_None._ It takes the fields every power takes, and `condition` is the useful one.

## Examples

Never regenerate naturally:

```json
{
  "type": "apoli:disable_regen"
}
```

Only while you are starved of something else — here a vampire heals normally with blood, and not at all without:

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

Pair it with a healing route of your own so the origin still has one:

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
