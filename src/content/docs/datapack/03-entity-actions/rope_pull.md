---
title: "Rope Pull (Entity Action Type)"
description: "Pushes one end of the entity's ropes toward the other end, to launch along a rope, grab with it or reel in."
navigation_title: "Rope Pull"
---

Pushes one end of the acting entity's ropes toward the other end. Pushing the entity's own end launches it along the rope, so you can fire a whip at a wall and then yank yourself to it. Pushing the far end drags that entity in, which grabs an enemy. Player velocity is applied in a way that reaches the client.

Type ID: `apoli:rope_pull`

> [!IMPORTANT]
> This is a single push each time the action runs, and it doesn't keep pulling. Inside an `apoli:action_on_key_press` power it only fires on the press of that power's own key, and a `key_pressed` condition on another key doesn't trigger it again. To be pulled in while holding a key, either use the rope's built-in controls (`controllable: true` with `reel_step` on [Attach Rope](/docs/datapack/entity-actions/attach_rope), where jump reels in), or run this action every tick from an `apoli:action_over_time` power gated on `apoli:attached_to_rope` and `apoli:key_pressed`. In an `if_else_list`, only the first matching branch runs, so a plain "attached, then detach" branch above a pull branch makes the pull unreachable.

> [!NOTE]
> `speed` is in blocks per tick, where 1.0 is about 20 m/s. With `set: true`, values like `20` are extreme.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [String](/docs/datapack/data-types/string) | _optional_ | Only acts on the rope in this slot. Leave it out to affect every rope the entity owns. |
| `which` | [String](/docs/datapack/data-types/string) | `"self"` | Which end to push: `self` launches the actor toward the far end, `other` drags the far entity toward the actor, and `both` does both. |
| `speed` | [Float](/docs/datapack/data-types/float) | `1.0` | The size of the velocity applied along the rope, which is the launch speed. |
| `set` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, replaces the pushed entity's velocity instead of adding to it. |
| `reel` | [Float](/docs/datapack/data-types/float) | `0.0` | Also shortens the rope by this much each time the action runs, for a scripted reel-in. |
| `sublevel_force` | [Float](/docs/datapack/data-types/float) | `1.0` | A multiplier on the push used when the far end is anchored to a [Sable](/docs/compat/sable) sub-level. `speed` is scaled by the structure's own mass first, so `speed` reads as a change in the structure's velocity and this field makes it heavier or lighter to drag. Ignored without Sable. |

## Examples

```json
{
    "type": "apoli:rope_pull",
    "which": "self",
    "speed": 2.5
}
```

This launches the actor toward the far end of every rope it owns, the pull half of a grapple.

```json
{
    "type": "apoli:rope_pull",
    "slot": "grab",
    "which": "other",
    "speed": 1.5
}
```

This drags whatever is tied to the actor's `grab` rope toward it. If that end is a [Sable](/docs/compat/sable) sub-level instead of an entity, the push goes into the structure's rigid body at the exact block the rope is tied to, so a rope on the edge of a ship swings it as well as pulling it.

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

This is the usual recipe for a held pull, as a separate power from the one that attaches the rope: a small push added every tick plus a steady `reel`. The push alone would keep building with nothing to stop it once the actor reaches the anchor. The `reel` makes it stop by itself, because it shortens the rope down to `min_length`, and the leash spring (`stiffness`, `radial_damping` and `swing_boost` on [Attach Rope](/docs/datapack/entity-actions/attach_rope)) stops correcting once the actor is that close. No extra key or distance check is needed, because `attached_to_rope` turns false when the rope detaches. A single large `speed` (8 or more) instead of this pattern is what makes a grapple feel like a teleport.
