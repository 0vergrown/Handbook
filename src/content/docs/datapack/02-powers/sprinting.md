---
title: "Sprinting (Power Type)"
description: "Makes a player sprint whenever they move forward, without the sprint key."
navigation_title: "Sprinting"
aliases: ["force_sprint", "forced_sprinting"]
---

Makes a player sprint whenever they move forward. The player doesn't need the sprint key or a double tap: while the power is active, holding forward is enough. It is the opposite of [`apoli:prevent_sprinting`](/docs/datapack/powers/prevent_sprinting).

Type ID: `apoli:sprinting`

The legacy IDs `apoli:force_sprint` and `apoli:forced_sprinting` resolve to this type.

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

This makes the player sprint on their own whenever they walk forward, as long as they have more than 3 hunger shanks.

> [!NOTE]
> This power only works on players. A sprint is started by the player's own client, so that is where the power acts. On mobs it does nothing.

> [!WARNING]
> The power's `condition` is checked on the client. Conditions about synced state work: hunger, health, pose, flags like `apoli:sneaking` or `apoli:on_block`, equipment, and resource or cooldown values. Conditions that read data only the server has always come out `false` on the client, so the power never turns on. Those include `apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat`, `apoli:predicate` and power inventories.

Minecraft still ends a sprint in the usual situations: hunger at 3 shanks or less, walking into a wall, letting go of forward, or treading water at the surface. The power starts the sprint again as soon as that stops being true. It does get past the rules that only stop a sprint from starting, so the player keeps sprinting while eating or drawing a bow, while blinded, while sneaking and while gliding.

If the player also has an active [`apoli:prevent_sprinting`](/docs/datapack/powers/prevent_sprinting), that power wins and they can't sprint at all.
