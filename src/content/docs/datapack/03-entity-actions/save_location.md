---
title: "Save Location (Entity Action Type)"
description: "Records the entity's current position under a name it can be teleported back to later."
navigation_title: "Save Location"
---

Records the entity's current position, rotation and dimension under a name, so that [apoli:teleport_to_location](/docs/datapack/entity-actions/teleport_to_location) can bring it back there later. The record survives a restart and follows the entity between dimensions.

Type ID: `apoli:save_location`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`id` | [String](/docs/datapack/data-types/string) | **required** | The name to file the position under. Any string; use one per feature so two powers do not overwrite each other.
`overwrite` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to replace a position already saved under that name. `false` makes the first save win, which is how you record a home the player cannot move.

## Examples

```json
"entity_action": {
    "type": "apoli:save_location",
    "id": "example:recall"
}
```

Saves where the entity is standing as `example:recall`, replacing whatever was there.

```json
{
    "type": "apoli:action_on_wake_up",
    "entity_action": {
        "type": "apoli:save_location",
        "id": "example:bed"
    }
}
```

Remembers the bed the player last woke up in.

> An entity keeps up to 32 named positions; saving a 33rd drops the one saved longest ago. The store itself keeps the 4096 most recently used entities, which is why a location saved on a short-lived mob is not something to rely on.
