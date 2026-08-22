---
title: "Action On Shape Change (Power Type)"
description: Runs an action when the player changes shape.
navigation_title: "Action On Shape Change"
aliases: ["action_on_morph", "shappoli:action_on_shape_change", "shappoli:action_on_morph"]
---

Fires whenever the player's shape changes, including when it is cleared. The action runs with the player as actor and the new shape as target.

Type ID: `apoli:action_on_shape_change` (aliases `apoli:action_on_morph`, `shappoli:action_on_shape_change`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | **required** | Runs on the change. Actor is the player, target is the new shape.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only fire when this passes.

## Example

Smoke and a sound on every change:

```json
{
  "type": "apoli:action_on_shape_change",
  "bientity_action": {
    "type": "apoli:actor_action",
    "action": {
      "type": "apoli:and",
      "actions": [
        { "type": "apoli:spawn_particles", "particle": "minecraft:large_smoke", "count": 30 },
        { "type": "apoli:play_sound", "sound": "minecraft:entity.illusioner_mirror_move" }
      ]
    }
  }
}
```

Only when becoming something undead, and it costs you:

```json
{
  "type": "apoli:action_on_shape_change",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  },
  "bientity_action": {
    "type": "apoli:actor_action",
    "action": { "type": "apoli:damage", "amount": 2, "damage_type": "minecraft:magic" }
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
