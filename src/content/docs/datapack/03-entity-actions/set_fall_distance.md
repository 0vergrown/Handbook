---
title: "Set Fall Distance (Entity Action Type)"
description: "Sets the fall distance of the entity to the specified amount. The fall distance value keeps track of how many blocks the entity has fallen and is used to calculate the amount of fall damage the entity takes. By setting it to 0 while falling, the entity essentially takes fall damage as if it had only fallen from the current position."
navigation_title: "Set Fall Distance"
---

Sets the fall distance of the entity to the specified amount. The fall distance value keeps track of how many blocks the entity has fallen and is used to calculate the amount of fall damage the entity takes. By setting it to 0 while falling, the entity essentially takes fall damage as if it had only fallen from the current position.

Type ID: `apoli:set_fall_distance`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fall_distance` | Float |  | The desired fall distance value.

## Examples

```json
"entity_action": {
    "type": "apoli:set_fall_distance",
    "fall_distance": 0
}
```

This example will reset the entity's fall distance so that the fall damage is now calculated from that point.
