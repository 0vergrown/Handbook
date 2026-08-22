---
title: "Action On Revive (Power Type)"
description: Runs an action when a knocked-out entity is revived.
navigation_title: "Action On Revive"
---

Fires when the holder is brought back up from the knocked-out state.

Type ID: `apoli:action_on_revive`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the holder as they get back up.

## Example

Come back weakened rather than at full strength, which keeps a revive meaningful:

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

> Needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival). These types do not exist without it, so a pack using them must depend on the mod.
