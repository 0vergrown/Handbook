---
title: "Hand (Data Type)"
description: "A String used to indicate one of the hands of an entity."
navigation_title: "Hand"
---

A [String](/docs/datapack/data-types/string) used to indicate one of the hands of an entity.

## Values

  Value         |  Description
----------------|--------------
  `main_hand`   |  The entity's main hand. By default this is the right hand, mirrored to the left hand for players who set "Main Hand" to "Left" in their controls.
  `off_hand`    |  The entity's off-hand (the other hand).

Each value is also accepted without the underscore (`mainhand`, `offhand`) and in its exact upper-case form (`MAIN_HAND`, `MAINHAND`, `OFF_HAND`, `OFFHAND`) for compatibility with packs written against upstream's enum-style spelling. Mixed case (e.g. `Main_Hand`) is **not** accepted.

## Examples

```json
"hands": [
    "main_hand"
]
```

Only consider the main hand.

```json
"hands": [
    "off_hand",
    "main_hand"
]
```

Consider both hands. Equivalent to omitting the field on power types that default to both.
