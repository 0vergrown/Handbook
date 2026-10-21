---
title: "Self Bientity Action (Entity Action Type)"
description: Runs a bi-entity action with the entity as both actor and target.
navigation_title: "Self Bientity Action"
aliases: ["self_bientity", "bientity_action", "shappoli:self_bientity_action", "shappoli:self_bientity"]
---

Runs a [bi-entity action](/docs/datapack/bientity-actions) with the same entity on both sides. Use it to reuse a bi-entity action somewhere that only accepts an entity action, without writing a second copy of it.

Type ID: `apoli:self_bientity_action` (aliases `apoli:self_bientity`, `apoli:bientity_action`, `shappoli:self_bientity_action`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | The action to run with the entity as both actor and target. `action` is accepted as a legacy spelling. |

## Example

The bi-entity form of `apoli:add_velocity` pushes the target away from the actor. Pointing both at the same entity turns it into a push on yourself, which is what a keybind power needs:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "cooldown": 40,
  "entity_action": {
    "type": "apoli:self_bientity_action",
    "bientity_action": {
      "type": "apoli:add_velocity",
      "y": 1.2,
      "space": "local"
    }
  }
}
```

It also lets you feed a shared bi-entity action, one you already use from `apoli:action_on_hit`, into a place that hands you a single entity.
