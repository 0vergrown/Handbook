---
title: "Creative Flight (Power Type)"
description: "Allows the players to fly as if they were in Creative Mode."
navigation_title: "Creative Flight"
---

Allows the players to fly as if they were in Creative Mode.

Type ID: `apoli:creative_flight`

## Fields
_None._

> The power's `condition` gates the flight: while it fails, flight is taken away and the holder drops out of the air, and it comes back the moment the condition passes again. Suppressing the power ([apoli:suppress_power](/docs/datapack/entity-actions/suppress_power)) does the same. Creative and spectator mode are never touched — a creative player keeps flying regardless.

> Flight from this power does not feed sprinting. Vanilla lets anyone who *may* fly sprint on an empty stomach; that shortcut is kept for actual creative and spectator mode only, so a survival holder of this power still needs more than 6 food points — 3 shanks — to start or hold a sprint, like anyone else.

## Examples
```json
{
    "type": "apoli:creative_flight"
}
```

```json
{
    "type": "apoli:creative_flight",
    "condition": {
        "type": "apoli:resource",
        "resource": "example:mana",
        "comparison": ">",
        "compare_to": 0
    }
}
```

Flight only while there is mana left. Drain the resource over time and the holder falls when it runs out.
