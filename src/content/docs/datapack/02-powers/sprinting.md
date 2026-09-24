---
title: "Sprinting (Power Type)"
description: "Makes a player sprint whenever they move forward, without the sprint key."
navigation_title: "Sprinting"
aliases: ["force_sprint", "forced_sprinting"]
---

Makes a player sprint whenever they move forward. No sprint key, no double-tap: while the power is active, holding forward is enough. It is the opposite of [`apoli:prevent_sprinting`](/docs/datapack/powers/prevent_sprinting).

Type ID: `apoli:sprinting`

The legacy ids `apoli:force_sprint` and `apoli:forced_sprinting` resolve to this type.

## Fields

_None._

## Examples

```json
{
    "type": "apoli:sprinting",
    "condition": {
        "type": "apoli:food_level",
        "comparison": ">",
        "compare_to": 6
    }
}
```

This example makes the player sprint on their own whenever they walk forward, as long as they have more than 3 hunger shanks.

> **Players only.** A sprint is started by the player's own client, so that is where this power acts. On mobs it does nothing.

> The power's `condition` is checked **on the client**. Conditions about synced state work: hunger, health, pose, flags like `apoli:sneaking` or `apoli:on_block`, equipment, and resource or cooldown values. Conditions that read server-only data always come out `false` there, so the power never turns on. Those include `apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat`, `apoli:predicate`, and power inventories.

> Minecraft still ends a sprint in the situations it always does: hunger at 3 shanks or less, walking into a wall, letting go of forward, or treading water at the surface. The power starts it again as soon as that stops being true. It does get past the rules that only stop a sprint from *starting*: you keep sprinting while eating or drawing a bow, while Blind, while sneaking, and while gliding.

> If the player also has an active [`apoli:prevent_sprinting`](/docs/datapack/powers/prevent_sprinting), that power wins and they cannot sprint at all.
