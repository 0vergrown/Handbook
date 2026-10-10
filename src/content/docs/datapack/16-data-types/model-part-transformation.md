---
title: "Model Part Transformation (Data Type)"
description: "A single edit to one named part of a biped model, used by apoli:modify_model_parts."
navigation_title: "Model Part Transformation"
---

A single edit to one named part of a biped model, used by the [Modify Model Parts](/docs/datapack/powers/modify_model_parts) power type.

By default the edit snaps on and off with the power. Add `duration` to make it ease in and out instead, or `keyframes` to make it animate — see [Animating a part](#animating-a-part).

## Fields

| Field                | Type                                                                                          | Default   | Description                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_part`         | [Body Part](/docs/datapack/data-types/body-part)                                               | —         | The part to edit: a limb such as `head` or `right_arm`, a layer such as `jacket`, or a group — `arms`, `legs`, `upper`, `lower` or `whole` — which moves as one piece (see [Moving a group](#moving-a-group)). Matching ignores case and separators (`right_arm` = `rightArm` = `rightarm`). On players the matching skin-overlay layer is edited together with the base part. |
| `pivot`              | [Vector](/docs/datapack/data-types/vector)                                                     | _the group's own pivot_ | Groups only: the point the group rotates and scales around, in model units — `[0, 0, 0]` is the neck, `y` grows downwards and the feet are at `[0, 24, 0]`. Ignored for a single part. |
| `target`             | [Vector](/docs/datapack/data-types/vector)                                                     | —         | Required by `reach`, ignored by every other type: the point the limb reaches for, in the same model units as `pivot`. `-z` is in front of the body. See [Reaching for a point](#reaching-for-a-point). |
| `type`               | [String](/docs/datapack/data-types/string)                                                     | —         | Which property to change. See the table below.                                                                                                                                                                                                                  |
| `value`              | [Float](/docs/datapack/data-types/float) OR [Expression](/docs/datapack/data-types/expression)  | —         | The amount. Its meaning depends on `type` (see below). Required unless `keyframes` is set, in which case it is ignored, or `type` is `reach`, where it defaults to `1`. As an Expression it is re-evaluated as the model renders — see [Driving a part from a value](#driving-a-part-from-a-value).                |
| `override_animation` | [Boolean](/docs/datapack/data-types/boolean)                                                   | `false`   | For `pitch`/`yaw`/`roll`: if `true`, the value becomes the absolute rotation and the vanilla animation for that axis is ignored ("locked"). If `false`, it is added on top of the animation. For `reach`: if `true`, the arm holds the reach instead of swinging — see [Reaching for a point](#reaching-for-a-point). |
| `keyframes`          | [Array](/docs/datapack/data-types/array) of [Model Part Keyframe](/docs/datapack/data-types/model-part-keyframe) | `[]`      | A timeline of values. When set, this replaces `value` and the part animates instead of holding still. The clock starts at 0 the moment the power becomes active.                                                                                                 |
| `loop`               | [Boolean](/docs/datapack/data-types/boolean)                                                   | `false`   | If `true`, the keyframe timeline repeats forever. If `false`, it plays once and holds the last keyframe's value.                                                                                                                                                 |
| `duration`           | [Float](/docs/datapack/data-types/float)                                                       | `0`       | Ticks to fade the whole transformation in when the power becomes active. `0` applies it instantly, which is the original behaviour.                                                                                                                              |
| `fade_out_duration`  | [Float](/docs/datapack/data-types/float)                                                       | `duration` | Ticks to fade the transformation back out when the power stops applying. Set it separately for an asymmetric fade (snap in, ease out).                                                                                                                           |
| `easing`             | [Easing](/docs/datapack/data-types/easing)                                                     | `linear`  | The curve used for the fade in and out, and the default curve for any keyframe that does not name its own.                                                                                                                                                       |
| `perspectives`       | [String](/docs/datapack/data-types/string) OR [Array](/docs/datapack/data-types/array) of String | *inherited* | Which views this one edit is drawn in: `first_person`, `third_person`, or both. Overrides the power's `perspectives` for this entry only. Omit it to inherit.

## `type` values

`type` | Effect of the value
-------|-------------------
`pitch` | Rotation around the X axis, in radians. Additive, or absolute when `override_animation` is `true`.
`yaw` | Rotation around the Y axis, in radians. Additive, or absolute when `override_animation` is `true`.
`roll` | Rotation around the Z axis, in radians. Additive, or absolute when `override_animation` is `true`.
`x_scale` | Added to the part's base X scale (base is `1.0`, so `0.5` → `1.5`, `-1.0` → `0.0`).
`y_scale` | Added to the part's base Y scale.
`z_scale` | Added to the part's base Z scale.
`pivot_x` | Added to the part's X pivot (position) offset.
`pivot_y` | Added to the part's Y pivot offset.
`pivot_z` | Added to the part's Z pivot offset.
`visible` | Sets visibility: `0` hides the part (and its children), any other value shows it. `override_animation` is ignored.
`hidden` | Sets the "skip draw" flag: non-`0` skips drawing this part's own cubes while still drawing its children. `override_animation` is ignored.
`reach` | Points the limb at `target` and stretches or shortens it so its end lands exactly there. The value blends the reach in, from `0` (untouched) to `1` (all the way, the default). See [Reaching for a point](#reaching-for-a-point).

## Moving a group

A group edits every part in it together, as one rigid piece. The parts keep their places relative to each other and the whole group turns around a single pivot:

`model_part` | Parts | Default pivot
-------------|-------|--------------
`arms` | both arms | halfway between the shoulders
`legs` | both legs | halfway between the hips
`upper` | head, torso, both arms | the waist, following the torso when it leans
`lower` | torso, both legs | the neck
`whole` | everything, including extra limbs | the feet

What each `type` does to a group:

- `pitch`, `yaw` and `roll` swing the group around its pivot. With `override_animation`, the vanilla animation of each part on that axis is dropped first, so the parts line up before the group turns.
- `x_scale`, `y_scale` and `z_scale` stretch the group away from its pivot, moving the parts apart as well as scaling each one — a `y_scale` of `1.0` on `whole` doubles the model's height with its feet still on the ground.
- `pivot_x`, `pivot_y` and `pivot_z` shift every part in the group by the same amount.
- `visible` and `hidden` apply to every part in the group.

Transformations run in list order, so a group edit moves the parts wherever earlier entries left them. Put per-part tweaks before a group rotation to have the group carry them round.

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "whole",
      "type": "pitch",
      "value": -1.5708,
      "pivot": [0, 12, 0],
      "duration": 10,
      "easing": "ease_out_cubic"
    }
  ]
}
```

The whole model tips over backwards around its middle, easing into place over half a second. Without `pivot` it would fall around its feet like a plank.

Group transformations apply wherever the model does — held items, armour and anything else drawn on a limb follow along — and the server sees the same pose, so particles anchored to a part and [body part hits](/docs/datapack/damage-conditions/body_part) land where the part has moved to.

## Reaching for a point

`reach` turns a limb so it points at `target`, then stretches or shortens it so its end — the hand of an arm, the foot of a leg — lands exactly on the point, however far away it is. On the `arms` and `legs` groups each limb reaches on its own, which is how two hands meet:

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "arms",
      "type": "reach",
      "target": [0, 8, -8],
      "override_animation": true,
      "duration": 6,
      "easing": "ease_out_cubic"
    }
  ]
}
```

Both hands come together in front of the stomach, easing in over six ticks, and stay there when the holder punches. Move `target` further out — `[0, 4, -30]` — and the arms stretch to meet there.

- The limb's pitch and yaw are replaced, its roll is cleared, and its `y_scale` becomes whatever puts its end on the point. `pivot` does nothing for `reach`.
- `override_animation` set to `true` holds a reaching arm still: it doesn't swing when the holder attacks or uses an item, in first person either (the item in that hand stops swinging with it), and [ghost arms](/docs/datapack/powers/show_both_arms) leave it alone. Without it, the first-person arm swings from its reach pose. In third person a fully reaching arm holds still either way.
- The value blends from the limb's current pose (`0`) to the full reach (`1`), on top of the `duration` fade, so `keyframes` on the value can push a reach out and pull it back.
- `target` sits in the model's own frame, which turns with the entity but not with a bent torso. To carry the reaching arms along with a bend, put the group rotation — on `upper`, say — after the `reach` in `transformations`.
- The server works out the same pose, so particles on a hand and [body part](/docs/datapack/damage-conditions/body_part) hits follow the reaching limb.

## Held items

The items in an entity's hands are reached with `right_item`, `left_item`, `main_hand_item`, `off_hand_item` and `items` (see [Body Part](/docs/datapack/data-types/body-part#held-items)). An edit turns the item around the grip, in the item's own frame:

- `pitch`, `yaw` and `roll` rotate the item. For a sword held in third person, `pitch` tips the blade towards the ground, `roll` lays it across the body and `yaw` spins it around its own length.
- `x_scale`, `y_scale` and `z_scale` grow or shrink it from the grip, on top of any [held item scale](/docs/datapack/data-types/scale-type).
- `pivot_x`, `pivot_y` and `pivot_z` move it, in pixels.
- `visible` at `0`, or `hidden` at anything else, stops it being drawn.

Held items follow `perspectives` like everything else, so list `first_person` to turn the item in the holder's own view as well.

```json
{
  "type": "apoli:modify_model_parts",
  "perspectives": ["first_person", "third_person"],
  "transformations": [
    {
      "model_part": "main_hand_item",
      "type": "pitch",
      "value": 1.5708
    }
  ]
}
```

The main-hand item is turned a quarter circle around the grip in both views — a sword points at the ground.

## Animating a part

Two independent controls, and they combine:

- **`duration` / `fade_out_duration` / `easing`** blend the transformation in and out. Think of it as a strength dial from `0` to `1`: at `0` the part is untouched, at `1` the edit is fully applied. Rotations with `override_animation` blend from the vanilla animation towards your value; everything else scales down proportionally.
- **`keyframes` / `loop`** decide what the value *is* at each moment. The clock starts at `0` when the power becomes active and is measured in ticks.

> `visible` and `hidden` cannot be half-applied. They flip once the fade passes the halfway mark, in both directions.

Interrupting a fade does not pop: if the power comes back before the fade-out finishes, the fade-in resumes from wherever it got to. Re-activating a power does restart its keyframe timeline from `0`.

## Examples

A pose that eases on instead of snapping:

```json
{
  "model_part": "right_arm",
  "type": "pitch",
  "value": -1.5708,
  "override_animation": true,
  "duration": 8,
  "fade_out_duration": 4,
  "easing": "ease_out_back"
}
```

Over 8 ticks the arm rotates from wherever the walk animation has it to straight forward (−90°), overshooting a little at the end. When the power stops applying it returns over 4 ticks.

A looping animation in a single transformation:

```json
{
  "model_part": "head",
  "type": "roll",
  "loop": true,
  "easing": "catmullrom",
  "keyframes": [
    { "time": 0,  "value": 0 },
    { "time": 15, "value": 0.2 },
    { "time": 30, "value": 0 },
    { "time": 45, "value": -0.2 },
    { "time": 60, "value": 0 }
  ]
}
```

The head sways side to side on a 3-second cycle, on top of whatever the vanilla animation is doing.

A blink, using `step` so the value never lands between visible and invisible:

```json
{
  "model_part": "hat",
  "type": "visible",
  "loop": true,
  "keyframes": [
    { "time": 0,  "value": 1 },
    { "time": 55, "value": 0, "easing": "step" },
    { "time": 58, "value": 1, "easing": "step" }
  ]
}
```

## Driving a part from a value

`value` accepts a full [Expression](/docs/datapack/data-types/expression), not just a number, and so does each keyframe's `value`. The expression is evaluated against the entity being rendered, once per transformation per frame, so the part follows whatever it reads:

```json
{
   "type":"apoli:modify_model_parts",
   "transformations":[
      {
         "model_part":"head",
         "type":"x_scale",
         "value":"example:charge / 10"
      }
   ]
}
```

Two things to know:

- This runs on the **client**, so it can only read values the client knows. Resources are synced, so resource ids and their `[n]` slots work; anything server-only reads `0`.
- A constant `value` costs nothing extra — it is folded at load time. Keep genuinely per-frame maths small.
