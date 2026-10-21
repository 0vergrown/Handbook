---
title: "Action On Revive (Power Type)"
description: "Runs an action when a knocked-out entity is revived."
navigation_title: "Action On Revive"
---

Fires when the holder is brought back up from the knocked-out state.

Type ID: `apoli:action_on_revive`

> [!NOTE]
> This type needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the holder as they get back up. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when another player rescues the holder, with the rescuer as the actor and the holder as the target. |

## Example

```json
{
  "type": "apoli:action_on_revive",
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:weakness", "duration": 600 } },
      { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:slowness", "duration": 300 } }
    ]
  }
}
```

The holder comes back weakened and slowed instead of at full strength, which keeps a revive meaningful.
