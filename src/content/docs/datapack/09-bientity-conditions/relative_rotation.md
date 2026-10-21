---
title: "Relative Rotation (Bi-Entity Condition Type)"
description: "Compares how closely the actor's facing direction lines up with the target's, as the cosine of the angle between them."
navigation_title: "Relative Rotation"
---

Compares how closely the direction the actor faces lines up with the direction the target faces. The value compared is the cosine of the angle between the two directions: `1` when they point the same way, `0` when they are at right angles and `-1` when they point in opposite directions.

Type ID: `apoli:relative_rotation`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `axes` | Array of Strings | `["x", "y", "z"]` | The axes of the two directions to use. Leaving an axis out flattens both directions onto the others, so `["x", "z"]` ignores pitch. |
| `actor_rotation` | [String](/docs/datapack/data-types/string) | `"head"` | Which of the actor's rotations to use: `"head"` or `"body"`. |
| `target_rotation` | [String](/docs/datapack/data-types/string) | `"body"` | Which of the target's rotations to use: `"head"` or `"body"`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the value is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the value is compared with, from `-1` to `1`. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:relative_rotation",
    "actor_rotation": "head",
    "target_rotation": "body",
    "comparison": ">=",
    "compare_to": -0.8
}
```

This passes unless the actor's head and the target's body point in nearly opposite directions, a value of -0.8 or less.

```json
"bientity_condition": {
    "type": "apoli:relative_rotation",
    "actor_rotation": "head",
    "target_rotation": "body",
    "comparison": ">=",
    "compare_to": 0.4
}
```

This passes when the actor's head faces roughly the same way as the target's body, within about 66 degrees.
