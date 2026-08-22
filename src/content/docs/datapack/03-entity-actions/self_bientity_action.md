---
title: "Self Bientity Action (Entity Action Type)"
description: Runs a bi-entity action with the entity as both actor and target.
navigation_title: "Self Bientity Action"
aliases: ["self_bientity", "bientity_action", "shappoli:self_bientity_action", "shappoli:self_bientity"]
---

Runs a [bi-entity action](/docs/datapack/bientity-actions) with the same entity on both sides. It exists so you can reuse a bi-entity action in a place that only accepts an entity action, without writing a second copy of it.

Type ID: `apoli:self_bientity_action` (aliases `apoli:self_bientity`, `apoli:bientity_action`, `shappoli:self_bientity_action`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | **required** | The action to run with the entity as both actor and target. `action` is accepted as a legacy spelling.

## Example

`apoli:add_velocity` in its bi-entity form pushes the target away from the actor. Pointing both at the same entity makes it a self-push, which is the shape you need inside a keybind power:

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

It is also how you feed a shared bi-entity block — one you already use from `apoli:action_on_hit` — into somewhere that hands you a single entity.
