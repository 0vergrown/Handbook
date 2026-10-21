---
title: "Save Location (Entity Action Type)"
description: "Records the entity's current position under a name it can be teleported back to later."
navigation_title: "Save Location"
---

Records the entity's current position, rotation and dimension under a name, so [apoli:teleport_to_location](/docs/datapack/entity-actions/teleport_to_location) can bring it back there later. The record survives a restart and follows the entity between dimensions.

Type ID: `apoli:save_location`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | [String](/docs/datapack/data-types/string) | _required_ | The name to save the position under. Any string works. Use one per feature so two powers don't overwrite each other. |
| `overwrite` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to replace a position already saved under that name. With `false` the first save wins, which is how you record a home the player can't move. |

## Examples

```json
"entity_action": {
    "type": "apoli:save_location",
    "id": "example:recall"
}
```

This saves where the entity is standing as `example:recall`, replacing whatever was saved there before.

```json
{
    "type": "apoli:action_on_wake_up",
    "entity_action": {
        "type": "apoli:save_location",
        "id": "example:bed"
    }
}
```

This remembers the bed the player last woke up in.

> [!NOTE]
> An entity keeps up to 32 named positions, and saving a 33rd drops the one saved longest ago. The store keeps the 4096 most recently used entities, so don't rely on a location saved on a short-lived mob.
