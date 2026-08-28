---
title: "Custom Particle (Data Type)"
description: "A particle Apoli builds from a texture you ship yourself, with its colour, size, lifetime, physics and frame animation set in JSON."
navigation_title: "Custom Particle"
---

A particle Apoli builds from a texture you ship yourself, with its colour, size, lifetime, physics and frame animation set in JSON. It is a [Particle Effect](/docs/datapack/data-types/particle-effect) in object form, so anywhere a particle is accepted — [`apoli:particle`](/docs/datapack/powers/particle), [`apoli:spawn_particles`](/docs/datapack/entity-actions/spawn_particles), [`apoli:raycast`](/docs/datapack/entity-actions/raycast) — will take it.

Type ID: `apoli:custom`

> The texture is a **resource pack** file, referenced by its full path (`example:textures/particle/spark.png` → `assets/example/textures/particle/spark.png`). It does not go through the vanilla particle atlas, so it needs no `particles/*.json` and can be any size.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`texture` | [Identifier](/docs/datapack/data-types/identifier) | — | Path to the PNG in a resource pack. Required.
`lifetime` | [Integer](/docs/datapack/data-types/integer) | `20` | How many ticks the particle lives.
`lifetime_variation` | [Integer](/docs/datapack/data-types/integer) | `0` | A random `0`–`n` extra ticks added per particle, so a burst does not vanish all at once.
`size` | [Float](/docs/datapack/data-types/float) | `0.2` | Size of the quad when it spawns.
`end_size` | [Float](/docs/datapack/data-types/float) | `size` | Size at the end of its life. Interpolated with `easing`; set `0.0` to shrink away.
`color` | Colour | `#FFFFFFFF` | Tint at spawn. Multiplies the texture, so a white texture takes the colour exactly.
`end_color` | Colour | `color` | Tint at the end of its life, interpolated with `easing` — the `dust_color_transition` behaviour, on your own texture.
`gravity` | [Float](/docs/datapack/data-types/float) | `0.0` | Downward pull per tick. Negative values make the particle rise.
`friction` | [Float](/docs/datapack/data-types/float) | `0.98` | Velocity kept each tick. `1.0` never slows down, `0.9` drags hard.
`roll` | [Float](/docs/datapack/data-types/float) | `0.0` | Starting rotation of the quad, in degrees.
`roll_speed` | [Float](/docs/datapack/data-types/float) | `0.0` | Degrees added to the rotation each tick.
`frames` | [Integer](/docs/datapack/data-types/integer) | `1` | Number of animation frames stacked **vertically** in the texture, like a vanilla animated texture.
`frame_time` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks per frame. `0` spreads all frames evenly across `lifetime`.
`loop_frames` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true` the frame strip repeats; if `false` it holds the last frame.
`physics` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the particle collides with blocks instead of passing through them.
`emissive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Draw at full brightness, ignoring the light level at its position.
`blend` | [String](/docs/datapack/data-types/string) | `translucent` | `translucent` for normal alpha blending, `additive` for a glow that brightens whatever is behind it.
`facing` | [String](/docs/datapack/data-types/string) | `camera` | `camera` turns the quad to face the viewer on every axis; `vertical` keeps it upright and only turns it around Y.
`easing` | [Easing](/docs/datapack/data-types/easing) | `linear` | The curve used for the colour and size interpolation over the particle's life.

### Colour

`color` and `end_color` accept three spellings:

- a hex string, `"#RRGGBB"` or `"#AARRGGBB"` — `"#FF8800"`, `"#80FFFFFF"`
- a list of floats from `0.0` to `1.0`, `[r, g, b]` or `[r, g, b, a]`
- a packed integer, `16750848`

Alpha is part of the colour, so fading a particle out means moving alpha to `0` in `end_color`.

## Examples

An ember that rises, cools from orange to red and shrinks away:

```json
{
  "type": "apoli:particle",
  "particle": {
    "type": "apoli:custom",
    "texture": "example:textures/particle/ember.png",
    "lifetime": 24,
    "lifetime_variation": 8,
    "size": 0.18,
    "end_size": 0.0,
    "color": "#FFC24B",
    "end_color": "#80FF3B1E",
    "gravity": -0.04,
    "friction": 0.92,
    "emissive": true,
    "blend": "additive",
    "easing": "ease_out_quad"
  },
  "count": 2,
  "speed": 0.02,
  "spread": {"x": 0.3, "y": 0.6, "z": 0.3},
  "frequency": 2
}
```

A four-frame spark burst on hit, spinning as it falls:

```json
"bientity_action": {
  "type": "apoli:target_action",
  "action": {
    "type": "apoli:spawn_particles",
    "particle": {
      "type": "apoli:custom",
      "texture": "example:textures/particle/spark.png",
      "lifetime": 12,
      "size": 0.25,
      "color": "#FFFFFF",
      "end_color": "#00FFFFFF",
      "gravity": 0.6,
      "roll_speed": 14.0,
      "frames": 4
    },
    "count": 12,
    "speed": 0.25
  }
}
```

> `count` and `frequency` still belong to the power or action around the particle, not to the particle itself — one spawn call sends one packet no matter how high `count` goes, so prefer a larger `count` over a shorter `frequency`.
