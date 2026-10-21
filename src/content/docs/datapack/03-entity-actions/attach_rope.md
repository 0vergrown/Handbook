---
title: "Attach Rope (Entity Action Type)"
description: "Attaches a rope between two endpoints, for grappling hooks, whips and tethers."
navigation_title: "Attach Rope"
---

Attaches a rope between two endpoints. Each end is a [Rope Endpoint](/docs/datapack/data-types/rope-endpoint), either an entity or a fixed point, so this one action covers grappling (yourself to a block), grabbing with a whip (yourself to an entity) and tethering (an entity to a block). An entity can hold several ropes at once. Label them with `slot` so they can be cut or counted one by one.

This action is registered as both an entity action and a bi-entity action. Use it as a bi-entity action, inside a `bientity_action` for example, when an endpoint's `source` is `target`.

Type ID: `apoli:attach_rope`

> [!NOTE]
> While you hold a `controllable` rope, the built-in keys drive it: jump and sneak reel it in and out, and WASD swings. Everything else, such as launching, grabbing or cutting a specific whip, is done with the [Rope Pull](/docs/datapack/entity-actions/rope_pull) and [Detach Rope](/docs/datapack/entity-actions/detach_rope) actions, which you bind to keys with an active power.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `from` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "self" }` | One end of the rope. |
| `to` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "raycast", "blocks": true }` | The other end. The default gives the classic grapple, attached to the block you look at. |
| `slot` | [String](/docs/datapack/data-types/string) | _optional_ | A label for this rope. Attaching again with the same `slot` replaces the rope already in it, so `left_whip` and `right_whip` give you exactly two. |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:textures/rope/rope.png` | The texture the rope is drawn with. |
| `toggle` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true` and no `slot`, firing again while you already hold a controllable rope releases it instead of adding another, for a classic one-key grapple. |
| `controllable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the built-in reel and swing keys drive this rope for its owner. Set it to `false` for tethers you cast on other entities. |
| `mode` | [String](/docs/datapack/data-types/string) | `"leash"` | How the length limit behaves. `leash` (the default) is free within the length and a springy swinging grapple past it. `spring` is a soft elastic pull past the length, so the rope visibly stretches and eases back like a rubber band. `rigid` holds a fixed distance both ways, pulling in when too far and pushing out when too close, like a pole. |
| `break_beyond` | [Float](/docs/datapack/data-types/float) | `0.0` | Above 0, the rope snaps and detaches once its two ends are pulled more than this many blocks apart. `0` never breaks. Ropes also always break when an entity end dies or unloads. |
| `min_length` | [Float](/docs/datapack/data-types/float) | `1.0` | The shortest the rope can reel to. |
| `max_length` | [Float](/docs/datapack/data-types/float) | `30.0` | The longest the rope can be. |
| `start_length` | [Float](/docs/datapack/data-types/float) | _see description_ | The length the rope starts at, clamped between `min_length` and `max_length`. Left out, a `controllable` rope starts taut, exactly as far apart as its two ends already are, so a grapple bites the moment it lands. A rope that isn't `controllable` starts at `max_length`, so a tether has its full slack straight away. Set it yourself for a taut tether or a slack grapple. |
| `stiffness` | [Float](/docs/datapack/data-types/float) | `0.1` | How hard the rope yanks an end back once it passes its length. Higher is snappier. Range `0.0` to `1.0`. |
| `radial_damping` | [Float](/docs/datapack/data-types/float) | `0.85` | How much outward speed is taken away at the length limit. Range `0.0` to `1.0`. It is a damping factor, so above `1.0` it would amplify instead. |
| `spring_scaling` | [Float](/docs/datapack/data-types/float) | `0.65` | Extra softening while swinging inward. Range `0.0` to `1.0`. |
| `swing_boost` | [Float](/docs/datapack/data-types/float) | `1.08` | A speed multiplier applied to a sprinting player's swing. Range `0.0` to `2.0`. |
| `max_swing_speed` | [Float](/docs/datapack/data-types/float) | `0.7` | The cap on the sprint swing boost. |
| `control_accel` | [Float](/docs/datapack/data-types/float) | `0.08` | How hard the WASD swing keys push a controllable rope. |
| `reel_step` | [Float](/docs/datapack/data-types/float) | `0.2` | Blocks per tick the length changes while a reel key (jump or sneak) is held. This is the main pull speed setting for a `controllable` grapple. `1.0` reels in 20 blocks per second, and much above 2 feels like teleporting. |
| `slack_pull_rate` | [Float](/docs/datapack/data-types/float) | `5.0` | A multiplier applied to reeling in while there is slack. |
| `constrain_from` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `from` end. Only matters when it is an entity. |
| `constrain_to` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `to` end. |

> [!WARNING]
> The physics fields are clamped to a stable range when the pack loads, and a value outside it is clamped with a warning naming the field. `stiffness`, `radial_damping` and `spring_scaling` must be between `0.0` and `1.0`, and `swing_boost` between `0.0` and `2.0`. Above those, the spring calculation that runs every tick grows instead of settling: `radial_damping` above `1.0` multiplies outward speed every tick, and `stiffness` above `1.0` overshoots further with each correction, which can throw players hundreds of blocks. The rope also never applies more than 4 blocks per tick of correction, so no combination of settings can launch an endpoint across the world.

> [!NOTE]
> Physics settings are read when the rope is cast. Editing them and reloading the data pack doesn't change ropes that already exist, so cast the rope again to pick up new values.

## Examples

```json
{
   "type":"apoli:attach_rope",
   "to":{
      "source":"raycast",
      "blocks":true
   },
   "stiffness":0.2,
   "max_swing_speed":1.4
}
```

A grappling hook that swings a little faster than the default. Fire it at a wall you are looking at.

```json
{
   "type":"apoli:attach_rope",
   "from":{
      "source":"target"
   },
   "to":{
      "source":"position",
      "position":[
         100,
         64,
         200
      ]
   },
   "controllable":false,
   "max_length":8
}
```

Used as a `bientity_action`, this tethers the target entity to a point so it can't wander more than 8 blocks from it. It isn't `controllable`, so it starts at its full 8-block length wherever the target was standing.

```json
{
   "type":"apoli:attach_rope",
   "to":{
      "source":"raycast",
      "entities":true
   },
   "mode":"rigid",
   "break_beyond":12,
   "controllable":false,
   "slot":"harpoon"
}
```

A harpoon rope that holds a rigid distance to whatever you hit, and snaps if the two ends are ever pulled more than 12 blocks apart.
