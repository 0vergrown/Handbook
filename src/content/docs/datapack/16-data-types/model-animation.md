---
title: "Model Animation (Data Type)"
description: "An Object or Array of objects picking which Bedrock animation an apoli:custom_model_render geometry model plays."
navigation_title: "Model Animation"
---

An [Object](/docs/datapack/data-types/object) or [Array](/docs/datapack/data-types/array) of objects, used by the `animations` field of [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) in geometry mode.

> When it is an array, the first entry whose `condition` passes (or that has no `condition`) is the one that plays, top to bottom. If none passes, nothing plays and the model sits in the pose the player's body puts it in.

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `animation` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The animation file. `mymod:wings` resolves to `assets/mymod/animations/wings.animation.json` (`.json` also works). |
| `name` | String | _first in file_ | Which animation inside the file to play, e.g. `animation.wings.flap`. A Blockbench animation file usually holds several. |
| `condition` | Entity Condition Type | _none_ | Only play this entry when the holder fulfils this condition. |
| `speed` | [Float](/docs/datapack/data-types/float) | `1.0` | Playback rate. `2.0` is twice as fast, `0.5` half. |
| `loop` | [Boolean](/docs/datapack/data-types/boolean) or String | _from the file_ | Overrides the animation's own loop setting. `true` loops forever, `false` plays once and then applies nothing, and `"hold_on_last_frame"` plays once and **freezes on the final keyframe**. Left out, the clip's own setting is used. |

> **A conditioned one-shot needs `hold_on_last_frame`.** An entry gated on a condition restarts every time it
> becomes the selected entry, which is what you want for a swing or a wind-up. But once a `false`/Play Once clip
> reaches its end it applies *nothing*, so a "blocking" pose snaps back to the bind pose while the condition is
> still true. `"loop": "hold_on_last_frame"` keeps the last frame for as long as the entry stays selected.

> One bad entry does not take the rest down with it. If an entry fails to load — a mistyped condition type,
> say — Apoli logs that entry and keeps every other one, so your unconditional fallback still plays.

## Interpolation

Between two keyframes Apoli interpolates linearly by default, and honours whatever shaping the file asks for on the keyframe it is moving **toward**:

| In the file | Effect |
| --- | --- |
| nothing | straight linear interpolation |
| `"lerp_mode": "catmullrom"` | Blockbench's **smooth** keyframes — a Catmull-Rom spline through the neighbouring keyframes, so the curve overshoots and rounds instead of forming corners |
| `"easing": "easeInOutSine"` (and the rest of the `easeIn*` / `easeOut*` / `easeInOut*` family) | GeckoLib's easing set — sine, quad, cubic, quart, quint, expo, circ, back, elastic, bounce, plus `step` |
| `"easingArgs": [2]` | the shape parameter for `back`, `elastic` and `bounce` |

An unrecognised easing name falls back to linear rather than failing the file.

## Examples

One looping idle:

```json
"animations": {
    "animation": "example:wings",
    "name": "animation.wings.idle"
}
```

Three states, picked top to bottom — flapping while airborne, gliding while sneaking, idle otherwise:

```json
"animations": [
    {
        "animation": "example:wings",
        "name": "animation.wings.flap",
        "condition": {
            "type": "apoli:fall_flying"
        }
    },
    {
        "animation": "example:wings",
        "name": "animation.wings.glide",
        "condition": {
            "type": "apoli:sneaking"
        },
        "speed": 0.5
    },
    {
        "animation": "example:wings",
        "name": "animation.wings.idle"
    }
]
```

> Playback time restarts whenever the selected entry changes, so a `loop: false` entry replays every time its condition flips back on.

> **If nothing ever moves, check that the clip actually has keyframes over time.** A channel written as a bare
> value — `"rotation": [-12.5, 0, -5]` — is a *single* keyframe at time zero, so the clip is a static pose and
> can never move, no matter what `loop` says. Blockbench writes that form whenever a bone only has a keyframe
> at 0:00. A clip that moves looks like `"rotation": {"0.0": [...], "0.5": [...]}`. Apoli applies the pose and
> logs a warning naming the clip.

> **Then check the loop flag.** Blockbench's loop mode defaults to *Play Once* and writes no `loop` key for it, so the clip plays through once and then applies nothing. A single entry with no `condition` never changes, which means that one play happens as the model first renders — at login — and the model sits in its bind pose from then on. Set the clip to **Loop** in Blockbench, or put `"loop": true` here. Apoli logs a warning naming the clip when this happens.
