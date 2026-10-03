---
title: "Set Perspective (Entity Action Type)"
description: "Switches a player's camera to first person, third person from behind, or third person from the front."
navigation_title: "Set Perspective"
---

Switches a player's camera between first person and the two third-person views, exactly as pressing F5 does. Does nothing to entities that are not players.

Type ID: `apoli:set_perspective`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `perspective` | String | _required_ | `first_person`, `third_person_back` or `third_person_front`. `third_person` is accepted for `third_person_back`. |

The player can press F5 again afterwards; this sets the view once rather than locking it. To hold a view, run the action from a power that fires repeatedly, or use [apoli:modify_camera](/docs/datapack/powers/modify_camera).

The change is applied on the player's client, which needs Apoli installed.

## Example

Look at yourself from the front for a cutscene, then put the camera back:

```json
{
  "type": "apoli:action_on_callback",
  "entity_action_added": {
    "type": "apoli:set_perspective",
    "perspective": "third_person_front"
  },
  "entity_action_removed": {
    "type": "apoli:set_perspective",
    "perspective": "first_person"
  }
}
```
