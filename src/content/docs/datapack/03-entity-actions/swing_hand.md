---
title: "Swing Hand (Entity Action Type)"
description: "Plays the swing animation of one of the entity's hands."
navigation_title: "Swing Hand"
---

Plays the swing animation of one of the entity's hands.

Type ID: `apoli:swing_hand`

> [!NOTE]
> The swing is only visual and doesn't interact with the world. It can't break or place blocks, hit or use entities, or do anything else a real swing does.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hand` | [Hand](/docs/datapack/data-types/hand) | `"main_hand"` | Which hand swings: `"main_hand"` or `"off_hand"`. `"mainhand"`, `"offhand"` and the upper-case spellings are accepted too. |

## Examples

```json
"entity_action": {
    "type": "apoli:swing_hand",
    "hand": "off_hand"
}
```

This swings the entity's off hand.

## Swinging both hands at once

Run the action twice in the same tick, once per hand, and both arms swing together:

```json
"entity_action": {
    "type": "apoli:and",
    "actions": [
        { "type": "apoli:swing_hand", "hand": "main_hand" },
        { "type": "apoli:swing_hand", "hand": "off_hand" }
    ]
}
```

Minecraft only tracks one swing per entity, so normally the second call replaces the first and only one arm moves. Apoli notices when the second swing arrives while the other arm is already swinging, and animates both.

The two arms share one swing timer, so they move in perfect sync as a two-fisted swing. It works in third person, and in first person with [apoli:show_both_arms](/docs/datapack/powers/show_both_arms). Without that power, vanilla only draws one arm in first person, so there is only one arm to animate there. With `show_both_arms` ghost arms, both arms leave a trail in first and third person alike.

> [!WARNING]
> Both calls have to land in the same tick. A tick or more apart, Minecraft rejects the second swing outright, exactly as it does without Apoli, and only one arm moves.
