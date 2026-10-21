---
title: "Hand (Data Type)"
description: "A string naming one of an entity's hands."
navigation_title: "Hand"
---

A [String](/docs/datapack/data-types/string) naming one of an entity's hands.

## Values

| Value | Description |
| --- | --- |
| `main_hand` | The entity's main hand. That is the right hand by default, and the left hand for players who set Main Hand to Left in their controls. |
| `off_hand` | The entity's off hand, the other one. |

Each value is also accepted without the underscore (`mainhand`, `offhand`) and in its exact upper-case form (`MAIN_HAND`, `MAINHAND`, `OFF_HAND`, `OFFHAND`), so packs written for upstream's enum-style spelling work. Mixed case such as `Main_Hand` isn't accepted.

## Examples

```json
"hands": [
    "main_hand"
]
```

Only the main hand counts.

```json
"hands": [
    "off_hand",
    "main_hand"
]
```

Both hands count. That is the same as leaving the field out on power types that default to both.
