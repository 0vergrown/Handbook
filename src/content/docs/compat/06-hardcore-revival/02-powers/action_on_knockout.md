---
title: "Action On Knockout (Power Type)"
description: "Runs an action when the entity is knocked out."
navigation_title: "Action On Knockout"
---

Fires when the holder is knocked out, the downed state Hardcore Revival uses instead of death.

Type ID: `apoli:action_on_knockout`

> [!NOTE]
> This type needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the holder as they go down. |

## Examples

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

This leaves a burst of soul particles and a loud sound, so allies can find the holder.

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

This spends a charge of the `mypack:second_wind` resource on each knockout, so an origin can, for example, count its free knockouts.
