---
title: "Relative Rotation (Bi-Entity Condition Type)"
description: "Compares the rotation angle of the 'actor' to the 'target'."
navigation_title: "Relative Rotation"
---

Compares the rotation angle of the 'actor' to the 'target'.

Type ID: `apoli:relative_rotation`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`axes` | Array of Strings | `["x", "y", "z"]` | The axes to get the angle values to calculate, and compare to.
`actor_rotation` | String | `"head"` | Determines the initial point of the rotation for the actor. Accepts `"head"` or `"body"`.
`target_rotation` | String | `"body"` | Determines the initial point of the rotation for the target. Accepts `"head"` or `"body"`.
`comparison` | Comparison | | Determines how the calculated angle value should be compared to the specified value.
`compare_to` | Float | | The value at which the calculated angle value will be compared to.

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

This example will check if the actor and target are essentially facing each other.

```json
"bientity_condition": {
    "type": "apoli:relative_rotation",
    "actor_rotation": "head",
    "target_rotation": "body",
    "comparison": ">=",
    "compare_to": 0.4
}
```

This example will check if the actor's head is essentially facing the same way as the target's body.
