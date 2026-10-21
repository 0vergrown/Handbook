---
title: "Brightness (Entity Condition Type)"
description: "Compares the brightness at the entity's eyes, from 0 to 1, with a number."
navigation_title: "Brightness"
---

Compares the brightness at the entity's eyes, which ranges from 0 to 1, with a number.

Type ID: `apoli:brightness`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the brightness is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the brightness is compared with. |

## How brightness is worked out

The game takes the light level of the block the eyes are in, which is the higher of its block light and sky light. It then works out brightness as `brightness = ambientLight + (1 - ambientLight) * lightLevel / (60 - 3 * lightLevel)`, where `ambientLight` is the dimension's ambient light: 0 in the Overworld and the End, and 0.1 in the Nether. In the Overworld and the End, that comes down to `brightness = lightLevel / (60 - 3 * lightLevel)`. The results are slightly off because of [the imprecision of floating point maths](https://0.30000000000000004.com/).

| Light level | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Overworld brightness | 0.0 | 0.017543862 | 0.03703704 | 0.05882353 | 0.08333334 | 0.11111111 | 0.14285715 | 0.17948718 | 0.22222225 | 0.2727273 | 0.33333334 | 0.40740743 | 0.50000006 | 0.6190476 | 0.77777773 | 1.0 |
| Nether brightness | 0.1 | 0.11578947 | 0.13333334 | 0.15294118 | 0.17500001 | 0.2 | 0.22857144 | 0.26153848 | 0.3 | 0.34545457 | 0.4 | 0.4666667 | 0.5500001 | 0.6571428 | 0.79999995 | 1.0 |

## Examples

```json
"condition": {
    "type": "apoli:brightness",
    "comparison": "<=",
    "compare_to": 0.5
}
```

This checks whether the brightness at the player's eyes is 0.5 or lower, which is a light level of 11 or below in any of the three vanilla dimensions.
