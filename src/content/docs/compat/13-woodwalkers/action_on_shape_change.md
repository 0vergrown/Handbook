---
title: "Action On Shape Change (Power Type)"
description: "Runs an action when the player changes shape."
navigation_title: "Action On Shape Change"
aliases: ["action_on_morph", "shappoli:action_on_shape_change", "shappoli:action_on_morph"]
---

Fires whenever the player's shape changes, including when it is cleared. The action runs with the player as the actor and the new shape as the target.

Type ID: `apoli:action_on_shape_change` (aliases `apoli:action_on_morph`, `shappoli:action_on_shape_change`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | Runs on the change, with the player as the actor and the new shape as the target. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only fires when this passes. |

## Examples

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

This makes smoke and plays a sound on every change.

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

This only fires when the player becomes something undead, and it costs them 2 damage.
