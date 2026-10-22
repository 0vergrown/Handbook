---
title: "Sneaky (Power Type)"
description: "The entity counts as sneaking for everything that reacts to how quiet a sneaking player is, without having to crouch."
navigation_title: "Sneaky"
---

The entity with the power counts as sneaking for everything that reacts to how quiet a sneaking player is, without having to crouch. Its speed, its pose and edge protection stay as they are.

Type ID: `apoli:sneaky`

While the power is active:

- Its nameplate doesn't show through blocks, and other players only see it within 32 blocks instead of 64.
- It makes no footstep sounds and no step vibrations while on the ground, so sculk sensors don't notice it walking.
- Mobs notice it from 80% of the usual distance.
- Foxes don't run away from it.
- The Crouch Time statistic counts up, as it does for a sneaking player.

## Fields

This power has no fields.

## Examples

```json
{
    "type": "apoli:sneaky"
}
```

The player moves as quietly as if they were always sneaking.

```json
{
    "type": "apoli:sneaky",
    "condition": {
        "type": "apoli:daytime",
        "inverted": true
    }
}
```

The player is only this quiet at night.
