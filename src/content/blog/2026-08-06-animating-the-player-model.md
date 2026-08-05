---
title: "Animating the player model: a complete guide to Modify Model Parts (Power Type)"
description: How poses, fades, easing and keyframes actually work in Modify Model Parts (Power Type) - the axis conventions, the two blend modes, and five worked examples from a static crouch to a looping idle.
date: 2026-08-06
author: Overgrown
---

[`Modify Model Parts (Power Type)`](/docs/datapack/powers/modify_model_parts) is the power that lets a data pack pose and animate the player. It is also the one people bounce off hardest, because the field that looks like "how long the pose lasts" is not that at all.

This is the long version. If you only read one section, read [Duration is not how long the pose lasts](#duration-is-not-how-long-the-pose-lasts).

## The shape of the power

The power is a list. Each entry targets **one part** and **one property**:

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "head",
      "type": "pitch",
      "value": 0.45
    }
  ]
}
```

That is the whole power. A pose is just a lot of those entries — one per part per axis. The "Hero Pose" at the end of this post is twenty of them.

There is no `duration` on the power, no timeline, no clip. Every entry is independent, and every entry is live for exactly as long as the power itself is active.

### The parts

`head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`.

Names are matched loosely — underscores, spaces, hyphens and case are all ignored, so `right_arm`, `rightArm` and `RIGHT ARM` are the same part. A handful of aliases are also accepted: `torso` and `jacket` mean `body`, `headwear` means `hat`, `right_sleeve` means `right_arm`, `left_pants` means `left_leg`, and so on.

On a player, editing a base part also moves its skin-overlay layer. You do not need a second entry for the jacket or the sleeve.

### The properties

| `type` | Unit | What it does |
| --- | --- | --- |
| `pitch` | radians | Rotation around X — nodding, arms swinging forward and back. |
| `yaw` | radians | Rotation around Y — turning left and right. |
| `roll` | radians | Rotation around Z — tilting sideways. |
| `pivot_x` / `pivot_y` / `pivot_z` | model units | Moves the part. 16 units = one block. |
| `x_scale` / `y_scale` / `z_scale` | multiplier offset | Added to the part's normal scale of `1.0`, so `0.5` means 1.5× and `-0.5` means half size. |
| `visible` | `0` or `1` | Shows or hides the part outright. |
| `hidden` | `0` or `1` | Sets the part's skip-draw flag. |

**Rotations are radians, not degrees.** π ≈ 3.14159 is a half turn, so a right angle is about `1.5708` and a gentle 25° tilt is about `0.45`. Multiply degrees by `0.01745` if you think in degrees.

### Which way is which

Player-model axes are not world axes, and this is where most of the trial-and-error goes. From vanilla's own `HumanoidModel`:

| Axis | Positive direction |
| --- | --- |
| `pivot_x` | toward the player's **left** (the right arm sits at x = −5) |
| `pivot_y` | **down** (the legs sit at y = 12, below the body at y = 0) |
| `pivot_z` | **backward** (crouching pushes the legs to z = 4) |

So `"pivot_y": 9` drops a part nine units — over half a block — and `"pivot_z": -4` pushes it four units forward. If something moves the wrong way, negate it; that is not a bug, it is the model's coordinate system.

## Duration is not how long the pose lasts

This is the one that trips everyone.

```json
{
  "model_part": "head",
  "type": "pitch",
  "value": 0.45,
  "duration": 5
}
```

`duration: 5` does **not** mean "hold this pose for 5 ticks". It means "take 5 ticks to blend *into* this pose". The pose then stays until the power stops being active. `fade_out_duration` is the mirror: how many ticks to blend back out afterwards, defaulting to whatever `duration` is.

**What controls how long the pose lasts is the power's `condition`.** While the condition passes, the pose holds. When it fails, the fade-out starts.

That is exactly the pattern behind the Hero Pose below: a resource counts down, the power's condition is `resource > 0`, and an [`Action Over Time (Power Type)`](/docs/datapack/powers/action_over_time) ticks the resource down. `duration: 5` and `fade_out_duration: 5` only make the entry and exit smooth. The *length* of the pose is however long the resource stays above zero.

Leave `duration` at its default of `0` and the pose snaps on instantly. That is right for things like `visible`, and wrong for almost every rotation.

## The two blend modes

Every entry blends with vanilla's own animation, and `override_animation` decides how:

- **`override_animation: false`** (the default) — your value is **added** to whatever vanilla is doing. The arm keeps swinging as you walk; your rotation rides on top.
- **`override_animation: true`** — your value **replaces** vanilla's. The arm stops swinging and goes exactly where you put it.

For a deliberate pose you almost always want `true`, otherwise walking will smear it. For an effect that should read as "on top of" normal movement — a permanent slight head tilt, a limp — you want `false`.

> **`override_animation` only affects `pitch`, `yaw` and `roll`.** Pivots and scales are always relative: a pivot is added to the part's position and a scale is added to `1.0`, whatever you set `override_animation` to. `visible` and `hidden` ignore blending entirely and snap once the fade is more than halfway.

## Easing

`easing` shapes the fade in and out, and doubles as the default curve between keyframes. The full set:

`linear`, `step`, `catmullrom`, `smoothstep`, `smootherstep`, and `ease_in_*` / `ease_out_*` / `ease_in_out_*` for `sine`, `quad`, `cubic`, `quart`, `quint`, `expo`, `circ`, `back`, `elastic` and `bounce`.

In practice:

| Want | Use |
| --- | --- |
| A pose that arrives naturally | `ease_out_quad` or `smoothstep` |
| A pose that winds up then snaps | `ease_in_cubic` |
| An impact that overshoots slightly | `ease_out_back` |
| A bouncy, cartoonish landing | `ease_out_bounce` |
| A snap with no blending at all | `step` |
| Smooth motion through many keyframes | `catmullrom` |

`catmullrom` is special: instead of interpolating between two keyframes it fits a curve through the surrounding four, so a chain of keyframes flows instead of hitching at each one. It is what you want for an idle loop.

## Keyframes

Give a transformation a `keyframes` list and it animates on its own instead of holding one value.

```json
{
  "model_part": "right_arm",
  "type": "pitch",
  "override_animation": true,
  "keyframes": [
    {
      "time": 0,
      "value": 0
    },
    {
      "time": 4,
      "value": -2.4,
      "easing": "ease_out_quad"
    },
    {
      "time": 10,
      "value": 0.3,
      "easing": "ease_in_cubic"
    },
    {
      "time": 14,
      "value": 0,
      "easing": "ease_out_back"
    }
  ]
}
```

- **`time` is in ticks, counted from the moment the transformation became active.** 20 ticks = one second.
- **`value` is that keyframe's target**, in the same unit as the `type`.
- **`easing` on a keyframe applies to the segment *ending* at it.** So the curve on the `time: 4` frame governs the 0 → 4 stretch. Without one, the transformation's own `easing` is used.
- Keyframes are **sorted by time for you**, so you can write them out of order.
- Before the first keyframe the animation sits on the first value; after the last it holds the last value.

With keyframes you do not need `value`, a transformation is valid with either a `value` or a non-empty `keyframes` list. `duration` and `fade_out_duration` still apply, and still mean fade in and fade out, layered on top of whatever the keyframes are doing.

### Looping

`"loop": true` wraps time back around between the first and last keyframe. A three-second idle sway is a loop from `time: 0` to `time: 60`.

Make the first and last values **identical** or the loop will jump. This is the single most common keyframe mistake.

## Five worked examples

### 1. A permanent tweak

Half-size head. No animation, no blending — it just is.

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "head",
      "type": "x_scale",
      "value": -0.5
    },
    {
      "model_part": "head",
      "type": "y_scale",
      "value": -0.5
    },
    {
      "model_part": "head",
      "type": "z_scale",
      "value": -0.5
    }
  ]
}
```

Remember scales are offsets from `1.0`, so `-0.5` is half size and `1.0` would be double.

### 2. A conditional pose that eases in and out

Arms out to the sides whenever the holder is sprinting.

```json
{
  "type": "apoli:modify_model_parts",
  "condition": {
    "type": "apoli:sprinting"
  },
  "transformations": [
    {
      "model_part": "right_arm",
      "type": "roll",
      "value": 1.4,
      "override_animation": true,
      "duration": 6,
      "fade_out_duration": 8,
      "easing": "ease_out_quad"
    },
    {
      "model_part": "left_arm",
      "type": "roll",
      "value": -1.4,
      "override_animation": true,
      "duration": 6,
      "fade_out_duration": 8,
      "easing": "ease_out_quad"
    }
  ]
}
```

Start sprinting and the arms take 6 ticks to swing out; stop and they take 8 to come back. The pose lasts as long as you sprint — `duration` had nothing to do with it.

### 3. A looping idle

A slow sway, running forever while the power is active.

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "body",
      "type": "roll",
      "loop": true,
      "easing": "catmullrom",
      "duration": 10,
      "keyframes": [
        {
          "time": 0,
          "value": 0
        },
        {
          "time": 20,
          "value": 0.06
        },
        {
          "time": 40,
          "value": -0.06
        },
        {
          "time": 60,
          "value": 0
        }
      ]
    }
  ]
}
```

First and last values are both `0.0`, so it cycles cleanly. `catmullrom` keeps the motion flowing through the middle keyframes instead of easing to a stop at each one. `override_animation` is left off, so the sway rides on top of walking rather than replacing it.

### 4. A one-shot swing

Fire this with a resource that counts down, the same way the Hero Pose works — the keyframes handle the motion, the resource decides when the power switches off.

```json
{
  "type": "apoli:modify_model_parts",
  "condition": {
    "type": "apoli:resource",
    "resource": "example:swing_timer",
    "comparison": ">",
    "compare_to": 0
  },
  "transformations": [
    {
      "model_part": "right_arm",
      "type": "pitch",
      "override_animation": true,
      "fade_out_duration": 4,
      "keyframes": [
        {
          "time": 0,
          "value": 0
        },
        {
          "time": 3,
          "value": -2.6,
          "easing": "ease_out_quad"
        },
        {
          "time": 9,
          "value": 0.6,
          "easing": "ease_in_cubic"
        },
        {
          "time": 13,
          "value": 0,
          "easing": "ease_out_back"
        }
      ]
    },
    {
      "model_part": "body",
      "type": "yaw",
      "override_animation": true,
      "fade_out_duration": 4,
      "keyframes": [
        {
          "time": 0,
          "value": 0
        },
        {
          "time": 3,
          "value": 0.4,
          "easing": "ease_out_quad"
        },
        {
          "time": 9,
          "value": -0.2,
          "easing": "ease_in_cubic"
        },
        {
          "time": 13,
          "value": 0
        }
      ]
    }
  ]
}
```

The arm winds up fast, throws through, and settles with a slight overshoot from `ease_out_back`. Rotating the body slightly on the same beats is what makes it read as a real swing rather than a detached arm.

### 5. The Hero Pose

This one is real — it came from a pack author who built it with **no keyframes at all**, using nothing but `duration`, `fade_out_duration` and a resource to hold it. It is a good demonstration that you do not need the animation system to get something that looks animated: twenty static entries, all easing in over 5 ticks, is a pose.

```json
{
  "type": "apoli:modify_model_parts",
  "condition": {
    "type": "apoli:resource",
    "resource": "example:pose_timer",
    "comparison": ">",
    "compare_to": 0
  },
  "transformations": [
    {
      "model_part": "head",
      "type": "pitch",
      "value": 0.45,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "head",
      "type": "pivot_y",
      "value": 9,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "head",
      "type": "pivot_z",
      "value": -4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "body",
      "type": "pitch",
      "value": 0.9,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "body",
      "type": "pivot_y",
      "value": 9,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "body",
      "type": "pivot_z",
      "value": -4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_arm",
      "type": "pitch",
      "value": -0.4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_arm",
      "type": "roll",
      "value": 1.1,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_arm",
      "type": "pivot_x",
      "value": -0.3,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_arm",
      "type": "pivot_y",
      "value": 11,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_arm",
      "type": "pivot_z",
      "value": -4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_arm",
      "type": "roll",
      "value": -0.25,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_arm",
      "type": "pivot_y",
      "value": 11,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_arm",
      "type": "pivot_z",
      "value": -4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_leg",
      "type": "pitch",
      "value": 1.1,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_leg",
      "type": "yaw",
      "value": -0.1,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "right_leg",
      "type": "pivot_y",
      "value": 5,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_leg",
      "type": "pitch",
      "value": 0.1,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_leg",
      "type": "yaw",
      "value": 0.2,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    },
    {
      "model_part": "left_leg",
      "type": "pivot_z",
      "value": 0.4,
      "override_animation": true,
      "duration": 5,
      "fade_out_duration": 5
    }
  ]
}
```

Notice the structure, because it generalises to any pose:

1. **Every entry has the same `duration` and `fade_out_duration`.** That is what makes twenty separate edits arrive as one movement instead of twenty. If you give different parts different durations you get a ripple — which is a great effect, deliberately, and a mess by accident.
2. **Every entry sets `override_animation: true`.** A pose has to beat walking, or it comes apart the moment you move.
3. **Body and head share `pivot_y: 9` and `pivot_z: -4`.** Moving a parent-ish group together keeps the silhouette intact; moving the body without the head detaches them.
4. **The arms sit at `pivot_y: 11`, lower than the torso's 9.** Small offsets between parts are what stop a pose from looking like a mannequin.
5. **Nothing here is a keyframe.** The entire animation is the 5-tick ease in and out.

To drive it, pair it with a resource and an action over time:

```json
{
  "type": "apoli:action_over_time",
  "interval": 1,
  "entity_action": {
    "type": "apoli:change_resource",
    "resource": "example:pose_timer",
    "change": -1
  }
}
```

Set `example:pose_timer` to 40 and you get a two-second pose that eases in, holds, and eases out.

## Things that go wrong

**The pose flickers or fights the walk cycle.** Add `override_animation: true`. Without it your value is added to vanilla's animation, so walking drags the pose around.

**The pose snaps instead of easing.** `duration` is `0` by default. Give it 4–8 ticks.

**The pose never goes away.** Whatever holds the power active is still true. `duration` will not end it — check the condition.

**A loop jumps every cycle.** The first and last keyframe values differ. Make them equal.

**The part moves the wrong way.** Negate the value. `pivot_y` is down, `pivot_z` is backward, `pivot_x` is toward the player's left.

**A scale of `1.0` made it double-size, not normal-size.** Scales are offsets added to `1.0`. Use `0` for normal.

**`override_animation` did nothing on a pivot or scale.** It only applies to `pitch`, `yaw` and `roll`. Pivots and scales are always relative.

**Nothing renders at all.** This is a client-side power on biped models only. It does nothing on non-humanoid mobs, and the holder needs to actually be rendered — check third person.

## Performance

Each animated entity is sampled **once per frame**, not once per part, and the result is shared by every part that frame. A pose with twenty entries costs about as much as a pose with one.

The part that does cost you is the number of *entities* wearing one. A looping animation on a mob that thirty players can see is thirty sample sets. Prefer conditions that are false most of the time — a pose that only exists while a resource is above zero is free the rest of the time, because the power's slots are dropped entirely once they finish fading out.
