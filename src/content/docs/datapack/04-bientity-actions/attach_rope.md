---
title: "Attach Rope (Bi-Entity Action Type)"
description: "Attaches a rope between the actor and the target."
navigation_title: "Attach Rope"
---

Attaches a rope between the actor and the target. This is the same action as [apoli:attach_rope](/docs/datapack/entity-actions/attach_rope) in the entity context, registered again here so an endpoint can use `"source": "target"`.

Type ID: `apoli:attach_rope`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`from` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "self" }` | One end of the rope. `self` is the actor.
`to` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "raycast", "blocks": true }` | The other end. Use `{ "source": "target" }` for the entity this action was run against.
`slot` | String | _optional_ | A label for this rope. Attaching again with the same `slot` replaces the previous rope in it.
`texture` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:textures/rope/rope.png` | The texture the rope is drawn with.
`toggle` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When `true` and no `slot` is given, re-firing while the actor already holds a controllable rope releases it instead of adding another.
`controllable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the built-in reel/swing keys drive this rope for its owner. Set `false` for tethers you cast on other entities.
`mode` | String | `"leash"` | `leash`, `spring` or `rigid` — see the [entity action page](/docs/datapack/entity-actions/attach_rope).
`break_beyond` | [Float](/docs/datapack/data-types/float) | `0.0` | Snap the rope once its ends are farther apart than this many blocks. `0` never breaks.
`min_length` | [Float](/docs/datapack/data-types/float) | `1.0` | Shortest the rope can reel to.
`max_length` | [Float](/docs/datapack/data-types/float) | `30.0` | Longest the rope can be.
`start_length` | [Float](/docs/datapack/data-types/float) | _see below_ | The length the rope is created at, clamped to `min_length`–`max_length`. Left out, a `controllable` rope starts taut at the current distance between its ends, and a rope that is not `controllable` starts at `max_length`.
`stiffness` | [Float](/docs/datapack/data-types/float) | `0.1` | How hard the rope yanks an end back once it passes its length. Range `0.0`–`1.0`.
`radial_damping` | [Float](/docs/datapack/data-types/float) | `0.85` | How much outward speed is bled off at the length limit. Range `0.0`–`1.0`; it is a *damping* factor, so above `1.0` it would amplify instead.
`spring_scaling` | [Float](/docs/datapack/data-types/float) | `0.65` | Extra softening while swinging inward. Range `0.0`–`1.0`.
`swing_boost` | [Float](/docs/datapack/data-types/float) | `1.08` | Speed multiplier applied to a sprinting player's swing. Range `0.0`–`2.0`.
`max_swing_speed` | [Float](/docs/datapack/data-types/float) | `0.7` | Cap on the sprint swing boost.
`control_accel` | [Float](/docs/datapack/data-types/float) | `0.08` | How hard the WASD swing keys push a controllable rope.
`reel_step` | [Float](/docs/datapack/data-types/float) | `0.2` | Blocks per tick the length changes while a reel key is held.
`slack_pull_rate` | [Float](/docs/datapack/data-types/float) | `5.0` | Multiplier applied to reeling in while there is slack.
`constrain_from` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `from` end.
`constrain_to` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `to` end.

> **The physics fields are clamped to a stable range at load time**, and a value outside it is clamped with a warning naming the field. `stiffness`, `radial_damping` and `spring_scaling` must be `0.0`–`1.0`; `swing_boost` must be `0.0`–`2.0`. Above those, the per-tick spring integrator diverges instead of settling: `radial_damping` above `1.0` multiplies outward speed every tick, and `stiffness` above `1.0` overshoots further each correction — which is what threw players hundreds of blocks. The rope also refuses to apply more than 4 blocks/tick of correction, so no combination of settings can launch an endpoint across the world.

> Physics settings are captured **when the rope is cast**. Editing them and reloading the data pack does not change ropes that already exist — re-cast the rope to pick up new values.

## Example

```json
{
  "type": "apoli:attach_rope",
  "to": { "source": "target" },
  "slot": "whip",
  "controllable": false,
  "max_length": 6,
  "break_beyond": 14
}
```

A whip that hooks whatever you hit and drags it along within 6 blocks until the two of you are pulled 14 blocks apart. Because it is not `controllable`, it starts at its full 6-block length.
