---
title: "Action On Knockout (Power Type)"
description: Runs an action when the entity is knocked out.
navigation_title: "Action On Knockout"
---

Fires when the holder is knocked out — the downed state Hardcore Revival uses instead of death.

Type ID: `apoli:action_on_knockout`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the holder as they go down.

## Examples

Drop a marker so allies can find you:

```json
{
  "type": "apoli:action_on_knockout",
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:spawn_particles", "particle": "minecraft:soul", "count": 40 },
      { "type": "apoli:play_sound", "sound": "minecraft:entity.wither.spawn" }
    ]
  }
}
```

Spend a charge to soften the blow, so an origin gets one free knockout:

```json
{
  "type": "apoli:action_on_knockout",
  "entity_action": {
    "type": "apoli:change_resource",
    "resource": "mypack:second_wind",
    "change": -1
  }
}
```

> Needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival). These types do not exist without it, so a pack using them must depend on the mod.
