---
title: "Swing Hand (Entity Action Type)"
description: "Swings the specified hand."
navigation_title: "Swing Hand"
---

Swings the specified hand.

Type ID: `apoli:swing_hand`

> This action is purely cosmetic, and will not interact with the world in any way. This means you can't use this to break, or place blocks, hit or use entities, or any other action that involves swinging your hand.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`hand` | String | `"MAIN_HAND"` | Determines which hand is swung. Accepts either `"MAIN_HAND"`, `"OFF_HAND"`

## Examples

```json
"entity_action": {
    "type": "apoli:swing_hand",
    "hand": "OFF_HAND"
}
```

This example will swing the entity's off hand.
