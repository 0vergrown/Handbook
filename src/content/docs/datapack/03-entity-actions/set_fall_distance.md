---
title: "Set Fall Distance (Entity Action Type)"
description: "Sets how far the entity counts as having fallen, which decides its fall damage."
navigation_title: "Set Fall Distance"
---

Sets the entity's fall distance. The fall distance tracks how many blocks the entity has fallen and decides how much fall damage it takes, so setting it to 0 mid-fall makes the entity take damage as if it had only fallen from its current position.

Type ID: `apoli:set_fall_distance`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `fall_distance` | [Float](/docs/datapack/data-types/float) | _required_ | The new fall distance. |

## Examples

```json
"entity_action": {
    "type": "apoli:set_fall_distance",
    "fall_distance": 0
}
```

This resets the entity's fall distance, so fall damage is counted from where it is now.
