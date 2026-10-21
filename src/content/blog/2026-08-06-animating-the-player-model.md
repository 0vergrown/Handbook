---
title: "Animating the player model with Modify Model Parts"
description: "How poses, fades, easing and keyframes work in apoli:modify_model_parts: the axis conventions, the two blend modes, and five worked examples from a static crouch to a looping idle."
date: 2026-08-06
author: Overgrown
---

[`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) is the power that lets a data pack pose and animate the player. It's also the one people bounce off hardest, because the field that looks like it sets how long the pose lasts does something else entirely.

This is the long version. If you only read one section, read [what duration really means](#what-duration-really-means).

## The shape of the power

The power is a list. Each entry targets one part and one property:

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

That is the whole power. A pose is just a lot of those entries, one per part per axis, and the Hero Pose at the end of this post is twenty of them.

There's no `duration` on the power, no timeline and no clip. Every entry is independent, and every entry is live for exactly as long as the power itself is active.

### The parts

`head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`.

Names are matched loosely. Underscores, spaces, hyphens and case are all ignored, so `right_arm`, `rightArm` and `RIGHT ARM` are the same part. A handful of aliases work too: `torso` and `jacket` mean `body`, `headwear` means `hat`, `right_sleeve` means `right_arm`, `left_pants` means `left_leg`, and so on.

On a player, editing a base part also moves its skin overlay layer, so you don't need a second entry for the jacket or the sleeve.

### The properties

| `type` | Unit | What it does |
| --- | --- | --- |
| `pitch` | Radians | Rotation around X: nodding, or arms swinging forward and back. |
| `yaw` | Radians | Rotation around Y: turning left and right. |
| `roll` | Radians | Rotation around Z: tilting sideways. |
| `pivot_x`, `pivot_y`, `pivot_z` | Model units | Moves the part. 16 units is one block. |
| `x_scale`, `y_scale`, `z_scale` | An offset from the normal scale | Added to the part's normal scale of `1.0`, so `0.5` means 1.5× and `-0.5` means half size. |
| `visible` | `0` or `1` | Shows or hides the part outright. |
| `hidden` | `0` or `1` | Sets the part's skip draw flag. |

Rotations are in radians, so forget degrees here. π ≈ 3.14159 is a half turn, which makes a right angle about `1.5708` and a gentle 25° tilt about `0.45`. If you think in degrees, multiply them by `0.01745`.

### Which way is which

Player model axes aren't world axes, and this is where most of the trial and error goes. From vanilla's own `HumanoidModel`:

| Axis | Positive direction |
| --- | --- |
| `pivot_x` | Toward the player's left (the right arm sits at x = −5) |
| `pivot_y` | Down (the legs sit at y = 12, below the body at y = 0) |
| `pivot_z` | Backward (crouching pushes the legs to z = 4) |

So `"pivot_y": 9` drops a part nine units, over half a block, and `"pivot_z": -4` pushes it four units forward. If something moves the wrong way, negate it. That's the model's coordinate system working as intended.

## What duration really means

This is the one that trips everyone up.

```json
{
  "model_part": "head",
  "type": "pitch",
  "value": 0.45,
  "duration": 5
}
```

`duration: 5` doesn't mean "hold this pose for 5 ticks". It means "take 5 ticks to blend into this pose". The pose then stays until the power stops being active. `fade_out_duration` is the mirror: how many ticks to blend back out afterwards, and it defaults to whatever `duration` is.

How long the pose lasts is up to the power's `condition`. While the condition passes, the pose holds, and when it fails, the fade out starts.

That's exactly the pattern behind the Hero Pose below. A resource counts down, the power's condition is `resource > 0`, and an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) ticks the resource down. `duration: 5` and `fade_out_duration: 5` only make the entry and exit smooth. The length of the pose is however long the resource stays above zero.

Leave `duration` at its default of `0` and the pose snaps on instantly. That's right for things like `visible`, and wrong for almost every rotation.

## The two blend modes

Every entry blends with vanilla's own animation, and `override_animation` decides how:

- With `override_animation: false`, the default, your value is added to whatever vanilla is doing. The arm keeps swinging as you walk, and your rotation rides on top.
- With `override_animation: true`, your value replaces vanilla's. The arm stops swinging and goes exactly where you put it.

For a deliberate pose you almost always want `true`, or walking will smear it. For an effect that should sit on top of normal movement, like a permanent slight head tilt or a limp, you want `false`.

> [!NOTE]
> `override_animation` only affects `pitch`, `yaw` and `roll`. Pivots and scales are always relative: a pivot is added to the part's position and a scale is added to `1.0`, whatever you set `override_animation` to. `visible` and `hidden` ignore blending entirely and snap once the fade is more than halfway.

## Easing

`easing` shapes the fade in and out, and doubles as the default curve between keyframes. The full set is `linear`, `step`, `catmullrom`, `smoothstep`, `smootherstep`, and `ease_in_*`, `ease_out_*` and `ease_in_out_*` for `sine`, `quad`, `cubic`, `quart`, `quint`, `expo`, `circ`, `back`, `elastic` and `bounce`.

In practice:

| Want | Use |
| --- | --- |
| A pose that arrives naturally | `ease_out_quad` or `smoothstep` |
| A pose that winds up then snaps | `ease_in_cubic` |
| An impact that overshoots slightly | `ease_out_back` |
| A bouncy, cartoonish landing | `ease_out_bounce` |
| A snap with no blending at all | `step` |
| Smooth motion through many keyframes | `catmullrom` |

`catmullrom` is the odd one out. Instead of interpolating between two keyframes, it fits a curve through the four around the current point, so a chain of keyframes flows instead of hitching at each one. It's what you want for an idle loop.

## Keyframes

Give a transformation a `keyframes` list and it animates by itself instead of holding one value.

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

- `time` is in ticks, counted from the moment the transformation became active. 20 ticks is one second.
- `value` is that keyframe's target, in the same unit as the `type`.
- `easing` on a keyframe applies to the segment that ends at it, so the curve on the `time: 4` frame governs the stretch from 0 to 4. Without one, the transformation's own `easing` is used.
- Keyframes are sorted by time for you, so you can write them out of order.
- Before the first keyframe, the animation sits on the first value, and after the last it holds the last value.

With keyframes you don't need `value`, since a transformation is valid with either a `value` or a non-empty `keyframes` list. `duration` and `fade_out_duration` still apply, and still mean fade in and fade out, on top of whatever the keyframes are doing.

### Looping

`"loop": true` wraps time back around between the first and last keyframe. A three second idle sway is a loop from `time: 0` to `time: 60`.

Make the first and last values identical, or the loop will jump. It's the most common keyframe mistake by far.

## Five worked examples

### 1. A permanent tweak

A half size head, with no animation and no blending:

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

Remember that scales are offsets from `1.0`, so `-0.5` is half size and `1.0` would be double.

### 2. A conditional pose that eases in and out

Arms out to the sides whenever the holder is sprinting:

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

Start sprinting and the arms take 6 ticks to swing out. Stop and they take 8 to come back. The pose lasts as long as you sprint, and `duration` had nothing to do with that.

### 3. A looping idle

A slow sway, running for as long as the power is active:

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

The first and last values are both `0.0`, so it cycles cleanly. `catmullrom` keeps the motion flowing through the middle keyframes instead of easing to a stop at each one. `override_animation` is left off, so the sway rides on top of walking instead of replacing it.

### 4. A one-shot swing

Fire this with a resource that counts down, the same way the Hero Pose works. The keyframes handle the motion, and the resource decides when the power switches off.

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

The arm winds up fast, throws through and settles with a slight overshoot from `ease_out_back`. Turning the body a little on the same beats is what makes it read as a real swing, and keeps the arm from looking detached.

### 5. The Hero Pose

This one is real. A pack author built it with no keyframes at all, using nothing but `duration`, `fade_out_duration` and a resource to hold it. It shows that you don't need the animation system to get something that looks animated: twenty static entries, all easing in over 5 ticks, make a pose.

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

The structure carries over to any pose:

1. Every entry has the same `duration` and `fade_out_duration`. That's what makes twenty separate edits arrive as one movement. Give different parts different durations and you get a ripple, which is a great effect on purpose and a mess by accident.
2. Every entry sets `override_animation: true`. A pose has to beat walking, or it comes apart the moment you move.
3. The body and head share `pivot_y: 9` and `pivot_z: -4`. Moving them together keeps the silhouette intact, and moving the body without the head pulls them apart.
4. The arms sit at `pivot_y: 11`, lower than the torso's 9. Small offsets between parts stop a pose from looking like a mannequin.
5. Nothing here is a keyframe. The whole animation is the 5 tick ease in and out.

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

Set `example:pose_timer` to 40 and you get a two second pose that eases in, holds and eases out.

## Things that go wrong

If the pose flickers or fights the walk cycle, add `override_animation: true`. Without it, your value is added to vanilla's animation, so walking drags the pose around.

If the pose snaps instead of easing, remember that `duration` is `0` by default. Give it 4 to 8 ticks.

If the pose never goes away, whatever holds the power active is still true. `duration` won't end it, so check the condition.

If a loop jumps every cycle, the first and last keyframe values differ. Make them equal.

If the part moves the wrong way, negate the value. `pivot_y` is down, `pivot_z` is backward and `pivot_x` is toward the player's left.

If a scale of `1.0` made the part double size, that's because scales are offsets added to `1.0`. Use `0` for the normal size.

If `override_animation` did nothing on a pivot or a scale, that's expected, since it only applies to `pitch`, `yaw` and `roll`. Pivots and scales are always relative.

If nothing renders at all, keep in mind that this is a client-side power that only works on biped models. It does nothing on mobs that aren't humanoid, and the holder has to actually be rendered, so check in third person.

## Performance

Each animated entity is sampled once per frame, not once per part, and every part shares the result that frame. A pose with twenty entries costs about as much as a pose with one.

What does cost you is the number of entities wearing one. A looping animation on a mob that thirty players can see is thirty sets of samples. Prefer conditions that are false most of the time. A pose that only exists while a resource is above zero is free the rest of the time, because the power's slots are dropped entirely once they finish fading out.
