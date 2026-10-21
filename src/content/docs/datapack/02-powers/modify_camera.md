---
title: "Modify Camera (Power Type)"
description: "Moves, turns, rolls and zooms the holder's camera, or puts it on another entity, with optional keyframe animation."
navigation_title: "Modify Camera"
---

Moves, turns, rolls and zooms the holder's camera, or puts it on another entity, while the power is active. Add `keyframes` and the camera animates, which covers in-camera effects such as a dolly zoom, an orbit, a fixed security camera or a slow push-in.

Type ID: `apoli:modify_camera`

> [!NOTE]
> The server decides whether the power is active, so its `condition` can use anything, including scoreboards, inventories and commands. The camera itself moves on the holder's client, which needs Apoli installed. Only the holder's own view changes, and nobody else sees anything different.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `space` | [Space](/docs/datapack/data-types/space) | `local` | How `x`, `y` and `z` are read. See [Offsets](#offsets). |
| `x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | Offset to the left (`local`) or along world X (`world`), in blocks. |
| `y` | Float or Expression | `0` | Offset upward, in blocks. |
| `z` | Float or Expression | `0` | Offset forward (`local`) or along world Z (`world`), in blocks. Negative is behind. |
| `pitch` | Float or Expression | `0` | Degrees added to the camera's pitch. Positive looks down. With `look: fixed`, this is the absolute pitch. |
| `yaw` | Float or Expression | `0` | Degrees added to the camera's yaw. With `look: fixed`, this is the absolute yaw (`0` faces south). |
| `roll` | Float or Expression | `0` | Degrees the camera is rolled. Positive tilts the view clockwise. |
| `fov` | Float or Expression | `1` | Field of view multiplier. `0.5` halves the FOV (zooms in), and `1.5` widens it. |
| `look` | [String](/docs/datapack/data-types/string) | `anchor` | Where the camera points. See [Looking](#looking). |
| `follow` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `true` keeps the camera on its anchor as it moves. `false` fixes it where the anchor was when the power turned on. |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | An [apoli:entity_set](/docs/datapack/powers/entity_set) power the holder has. The camera sits on the nearest member of that set. |
| `selector` | [String](/docs/datapack/data-types/string) | _optional_ | An entity selector, run as the holder. The camera sits on the first entity it finds, for example `"@e[type=minecraft:pig,sort=nearest,limit=1]"`. |
| `collision` | Boolean | `true` | Pulls the camera in when a block is between it and its anchor, like the vanilla third person camera. |
| `keyframes` | Array of [Camera Keyframe](/docs/datapack/data-types/camera-keyframe) | _optional_ | Animates `x`, `y`, `z`, `pitch`, `yaw`, `roll` and `fov` over time. See [Animation](#animation). |
| `loop` | Boolean | `false` | Repeats the keyframes. With `false`, the last keyframe holds once the animation ends. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several `modify_camera` powers are active, the one with the highest priority is used. |

## The anchor

The camera is attached to an anchor entity: the holder, unless `set` or `selector` finds someone else. A target entity has to be loaded on the holder's client (within render distance), or the camera stays on the holder. `set` is checked first, and `selector` is the fallback when the set is empty.

When the anchor is the holder and `follow` is `true`, the power works on top of the normal camera: in third person it moves the third person camera, and in first person the first person one. In every other case (another anchor, `follow: false`, or a `look` other than `anchor` or `holder`) the camera starts from the anchor's eyes and view bobbing is switched off, so cinematic shots stay steady.

A camera that ends up away from the holder's eyes draws the holder's body and hides the hand and the crosshair, the same as vanilla third person. If the camera sits inside the anchor entity (an `x`, `y` and `z` of `0` on another mob), that entity isn't drawn, so you see what it sees instead of the inside of its head.

## Offsets

`x`, `y` and `z` move the camera away from its anchor, in blocks.

| `space` | Axes |
| --- | --- |
| `local` | Turn with the camera: `x` left, `y` up, `z` forward. A negative `z` is behind the view, so `z: -4` is a third person camera and yawing the camera swings it round the anchor. |
| `local_horizontal` | Like `local`, but only yaw turns the axes. `y` is always straight up. |
| `world` | Fixed world axes. |
| `velocity`, `velocity_normalized`, `velocity_horizontal`, `velocity_horizontal_normalized` | Relative to the anchor's movement, as in [Space](/docs/datapack/data-types/space). |

The fields take [expressions](/docs/datapack/data-types/expression), so an offset can follow a resource. This one gives a third person camera whose distance the scroll wheel sets:

```json
{
  "type": "apoli:modify_camera",
  "z": "-resource(example:camera_distance)"
}
```

Expressions are evaluated on the holder's client every frame, against what the client knows. Resources and other synced values work.

## Looking

| `look` | The camera points |
| --- | --- |
| `anchor` | Where the anchor looks. On the holder, that is wherever you aim the mouse. On another entity, it is a spectator's view of that entity. |
| `holder` | Where the holder looks, wherever the camera is. Sit the camera on a pet and look around with your own mouse. |
| `fixed` | At the absolute `pitch` and `yaw` you give, ignoring the mouse. |
| `at_holder` | At the holder's eyes, as a tracking shot. |
| `at_anchor` | At the anchor's eyes. With an offset, this orbits the anchor while keeping it centred. |

For `anchor` and `holder`, `pitch` and `yaw` are added on top. With `at_holder` and `at_anchor` they turn the offset instead, which is how an orbit works: animate `yaw` from `0` to `360` and the camera circles the anchor while still facing it.

Mouse input always turns the holder and never the camera directly. With `fixed`, `at_holder` or `at_anchor`, moving the mouse turns your player but not your view.

## Animation

`keyframes` animate the camera from the moment the power turns on. Each keyframe names a `time` in ticks and any of `x`, `y`, `z`, `pitch`, `yaw`, `roll` and `fov`. A field with keyframes follows them, and a field without any uses the value set at the top level. Between two keyframes, the value is eased by the earlier keyframe's `easing`.

The clock restarts every time the power turns on, so a power granted by an action, or one whose `condition` flips, replays its animation from the start. With `loop: false` the camera holds the last keyframe for as long as the power stays active.

A dolly zoom pulls the camera back while the field of view narrows, so the subject stays the same size and the background rushes in:

```json
{
  "type": "apoli:modify_camera",
  "look": "anchor",
  "keyframes": [
    { "time": 0, "z": 0, "fov": 1.0 },
    { "time": 60, "z": -6, "fov": 0.35, "easing": "ease_in_out_sine" }
  ]
}
```

An orbit round the holder, one lap every two seconds:

```json
{
  "type": "apoli:modify_camera",
  "z": -5,
  "look": "at_anchor",
  "loop": true,
  "keyframes": [
    { "time": 0, "yaw": 0 },
    { "time": 40, "yaw": 360 }
  ]
}
```

For a smooth path through several points, use `catmullrom` (also accepted as `smooth`) on every keyframe. The camera then curves through each point instead of turning sharply at it:

```json
{
  "type": "apoli:modify_camera",
  "space": "world",
  "follow": false,
  "look": "at_holder",
  "keyframes": [
    { "time": 0, "x": 0, "y": 2, "z": -6, "easing": "catmullrom" },
    { "time": 40, "x": 6, "y": 4, "z": 0, "easing": "catmullrom" },
    { "time": 80, "x": 0, "y": 6, "z": 6, "easing": "catmullrom" },
    { "time": 120, "x": -6, "y": 3, "z": 0, "easing": "catmullrom" }
  ]
}
```

## Examples

An over-the-shoulder camera:

```json
{
  "type": "apoli:modify_camera",
  "x": -0.75,
  "y": 0.25,
  "z": -2.5
}
```

A security camera, fixed where the holder stood when it turned on, two blocks up and always pointing at the holder. Combine it with [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) on the world for a timelapse.

```json
{
  "type": "apoli:modify_camera",
  "space": "world",
  "follow": false,
  "look": "at_holder",
  "y": 2
}
```

See through a tamed pet's eyes while a key is held:

```json
{
  "type": "apoli:modify_camera",
  "selector": "@e[type=minecraft:wolf,tag=example_pet,sort=nearest,limit=1]",
  "look": "anchor",
  "condition": {
    "type": "apoli:key_pressed",
    "key": "key.origins.primary_active"
  }
}
```

A drunk camera that sways:

```json
{
  "type": "apoli:modify_camera",
  "loop": true,
  "keyframes": [
    { "time": 0, "roll": -6, "easing": "ease_in_out_sine" },
    { "time": 30, "roll": 6, "easing": "ease_in_out_sine" },
    { "time": 60, "roll": -6 }
  ]
}
```

> [!NOTE]
> The world keeps loading around the player's position, wherever the camera goes. A camera placed far from the holder, or on an entity outside render distance, shows unloaded terrain or falls back to the holder.
