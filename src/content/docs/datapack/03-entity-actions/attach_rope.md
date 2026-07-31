---
title: "Attach Rope (Entity Action Type)"
description: "Attaches a rope between two endpoints."
navigation_title: "Attach Rope"
---

Attaches a rope between two endpoints. Each end is a [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) — an entity or a fixed point — so this one action covers grappling (self ↔ block), whip-grabbing (self ↔ entity) and tethering (entity ↔ block). An entity can hold several ropes at once; label them with `slot` so they can be cut or counted individually.

This action is registered in both the **entity** and **bi-entity** contexts. Use it as a bi-entity action (e.g. inside `bientity_action`) when an endpoint's `source` is `target`.

Type ID: `apoli:attach_rope`

> **Controls:** while you hold a `controllable` rope, the built-in keys drive it — **jump/sneak** reel it in and out and **WASD** swings. Everything else (launching, grabbing, cutting a specific whip) is done with the [Rope Pull](/docs/datapack/entity-actions/rope_pull) and [Detach Rope](/docs/datapack/entity-actions/detach_rope) actions, which you bind to keys with an active power.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`from` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "self" }` | One end of the rope.
`to` | [Rope Endpoint](/docs/datapack/data-types/rope-endpoint) | `{ "source": "raycast", "blocks": true }` | The other end. The default reproduces the classic grapple (a block you look at).
`slot` | String | _optional_ | A label for this rope. Attaching again with the same `slot` replaces the previous rope in it (so `left_whip`/`right_whip` give you exactly two).
`texture` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:textures/rope/rope.png` | The texture the rope is drawn with.
`toggle` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When `true` and no `slot` is given, re-firing while you already hold a controllable rope releases it instead of adding another (classic one-key grapple).
`controllable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the built-in reel/swing keys drive this rope for its owner. Set `false` for tethers you cast on other entities.
`mode` | String | `"leash"` | How the length constraint behaves. `leash` = free within length, springy swinging grapple past it (the default). `spring` = a soft elastic pull past length, so the rope visibly stretches and eases back (a rubber band). `rigid` = holds a fixed distance both ways — pulled in when too far **and** pushed out when too close (a rod/pole).
`break_beyond` | [Float](/docs/datapack/data-types/float) | `0.0` | If greater than 0, the rope snaps (auto-detaches) once its two ends are pulled farther apart than this many blocks. `0` never breaks. (Ropes also always break when an entity end dies or unloads.)
`min_length` | [Float](/docs/datapack/data-types/float) | `1.0` | Shortest the rope can reel to.
`max_length` | [Float](/docs/datapack/data-types/float) | `30.0` | Longest the rope can be.
`stiffness` | [Float](/docs/datapack/data-types/float) | `0.1` | How hard the rope yanks an end back once it passes its length. Higher = snappier.
`radial_damping` | [Float](/docs/datapack/data-types/float) | `0.85` | How much outward speed is bled off at the length limit.
`spring_scaling` | [Float](/docs/datapack/data-types/float) | `0.65` | Extra softening while swinging inward.
`swing_boost` | [Float](/docs/datapack/data-types/float) | `1.08` | Speed multiplier applied to a sprinting player's swing.
`max_swing_speed` | [Float](/docs/datapack/data-types/float) | `0.7` | Cap on the sprint swing boost.
`reel_step` | [Float](/docs/datapack/data-types/float) | `0.2` | Blocks **per tick** the length changes while a reel key (jump/sneak) is held. This is the main "pull speed" knob for a `controllable` grapple — `1.0` reels in 20 blocks per second; much above ~2 feels like teleporting.
`slack_pull_rate` | [Float](/docs/datapack/data-types/float) | `5.0` | Multiplier applied to reeling in while there is slack.
`constrain_from` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `from` end (only matters when it is an entity).
`constrain_to` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the physics may pull the `to` end.

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
A grappling hook that swings a little faster than default — fire it at a wall you're looking at.

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
Used as a `bientity_action`, this tethers the target entity to a point so it can't wander more than 8 blocks from it.

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
A harpoon-style rope that holds a **rigid** distance to whatever you hit and **snaps** if the two ends are ever pulled more than 12 blocks apart.
