---
title: "apoli:rope_pull"
description: "Shoves an end of the acting entity's ropes toward the other end — the 'launch', 'grab' and 'reel' verb."
---

Shoves an end of the acting entity's ropes toward the other end — the "launch", "grab" and "reel" verb. Pushing the entity's own end at it launches you along the rope (fire a whip at a wall, then yank yourself to it); pushing the far end drags that entity in (grab an enemy). Player velocity is applied in a way that actually reaches the client.

Type ID: `apoli:rope_pull`

> **This is a one-shot impulse, not a held pull.** It applies velocity once each time the action *runs*. Inside an `apoli:action_on_key_press` power it fires only on the press of *that power's* key — a `key_pressed` condition on another key does not re-trigger it. For "hold a key to be pulled in", either rely on the rope's built-in controls (`controllable: true` + `reel_step` on [Attach Rope](/docs/datapack/entity-actions/attach_rope); jump reels in), or drive this action every tick from an `apoli:action_over_time` power gated on `apoli:attached_to_rope` + `apoli:key_pressed`. Also mind that in an `if_else_list`, only the **first** matching branch runs — a plain "attached → detach" branch above a pull branch makes the pull unreachable.

> `speed` is in **blocks per tick** (1.0 ≈ 20 m/s). With `set: true`, values like `20` are extreme.
## Fields

| Field   | Type                                                         | Default    | Description                                                                                                                 |
| ------- | ------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `slot`  | String                                                       | _optional_ | Only act on the rope in this slot. If omitted, every rope the entity owns is affected.                                      |
| `which` | String                                                       | `"self"`   | Which end to push: `self` (launch the actor toward the far end), `other` (drag the far entity toward the actor), or `both`. |
| `speed` | [Float](/docs/datapack/data-types/float)     | `1.0`      | Magnitude of the velocity applied along the rope. This is your "launch speed".                                              |
| `set`   | [Boolean](/docs/datapack/data-types/boolean) | `false`    | If `true`, replaces the pushed entity's velocity instead of adding to it.                                                   |
| `reel`  | [Float](/docs/datapack/data-types/float)     | `0.0`      | Also shorten the rope by this amount each time the action runs (a scripted reel-in).                                        |

## Examples
```json
{
    "type": "apoli:rope_pull",
    "which": "self",
    "speed": 2.5
}
```
Launches the actor toward the far end of every rope they own — the pull half of a grapple.

```json
{
    "type": "apoli:rope_pull",
    "slot": "grab",
    "which": "other",
    "speed": 1.5
}
```
Drags whatever is tied to the actor's `grab` rope toward them.

```json
{
    "condition": { "type": "apoli:attached_to_rope" },
    "type": "apoli:action_over_time",
    "interval": 1,
    "entity_action": {
        "type": "apoli:rope_pull",
        "which": "self",
        "speed": 0.6,
        "set": false,
        "reel": 1.0
    }
}
```
The canonical "held pull" recipe, as a separate power entry (not the one that attaches the rope): a small additive kick every tick plus a continuous `reel`. The kick alone would ramp forever with nothing to stop it once the actor reaches the anchor — the `reel` is what makes it self-limiting, since it shortens the rope down to `min_length` and the already-tuned leash spring (`stiffness`/`radial_damping`/`swing_boost` on [Attach Rope](/docs/datapack/entity-actions/attach_rope)) simply stops correcting once the actor is that close. No extra key or distance check needed — `attached_to_rope` turns itself off when the rope detaches. A single large one-shot `speed` (e.g. 8+) instead of this pattern is what makes a grapple feel like a teleport.

