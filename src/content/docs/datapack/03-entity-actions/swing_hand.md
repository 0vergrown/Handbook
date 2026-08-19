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

## Swinging both hands at once

Run the action twice in the same tick, once per hand, and both arms swing together:

```json
"entity_action": {
    "type": "apoli:and",
    "actions": [
        { "type": "apoli:swing_hand", "hand": "MAIN_HAND" },
        { "type": "apoli:swing_hand", "hand": "OFF_HAND" }
    ]
}
```

Minecraft only tracks one swing per entity, so before this the second call simply replaced the first and you saw a single arm move. Apoli now notices that the second swing arrived while the other arm was already swinging and animates both.

The two arms share one swing timer, so they move in perfect sync — this is a two-fisted swing, not two independent ones. It works in third person and, with [apoli:show_both_arms](/docs/datapack/powers/show_both_arms), in first person as well; without that power vanilla only draws one first-person arm, so there is only one arm there to animate.

> Both calls have to land in the **same tick**. A tick or more apart and Minecraft rejects the second swing outright, exactly as it does without Apoli, and you get one arm.
