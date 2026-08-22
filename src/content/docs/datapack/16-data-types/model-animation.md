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
| `loop` | [Boolean](/docs/datapack/data-types/boolean) | _from the file_ | Overrides the animation's own loop setting. `true` loops forever, `false` plays once and stops. Blockbench's "Hold on last frame" is honoured when this field is absent. |

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
