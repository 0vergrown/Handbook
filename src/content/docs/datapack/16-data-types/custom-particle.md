---
title: "Custom Particle (Data Type)"
description: "A particle Apoli builds from a texture you ship yourself, with its colour, size, lifetime, physics and frame animation set in JSON."
navigation_title: "Custom Particle"
---

A particle Apoli builds from a texture you ship yourself, with its colour, size, lifetime, physics and frame animation set in JSON. It is a [Particle Effect](/docs/datapack/data-types/particle-effect) in object form, so anywhere a particle is accepted, such as [`apoli:particle`](/docs/datapack/powers/particle), [`apoli:spawn_particles`](/docs/datapack/entity-actions/spawn_particles) and [`apoli:raycast`](/docs/datapack/entity-actions/raycast), takes it.

Type ID: `apoli:custom`

> [!NOTE]
> The texture is a resource pack file, referenced by its full path, so `example:textures/particle/spark.png` points to `assets/example/textures/particle/spark.png`. A short ID works too: `example:spark` is looked up as `assets/example/textures/particle/spark.png`. It doesn't go through the vanilla particle atlas, so it needs no `particles/*.json` and can be any size.

> [!TIP]
> A particle drawn as a black and magenta checker means the texture isn't in any loaded resource pack. Apoli logs the ID it looked for and the file it expected, so check that line first. The usual cause is the pack being turned off, or its `pack_format` being too old for the game version to enable it.

> [!TIP]
> A particle that draws as a dark blob, worse the closer you get, is the other texture problem. It happens when the PNG's semi-transparent pixels carry no colour, such as black RGB under a feathered edge, which several exporters and most background removal tools leave behind. Those pixels are half visible, so they paint half black over whatever is behind them, and the fringe covers more of the screen the bigger the particle gets. Every vanilla particle texture is either fully opaque or fully transparent, so nothing in the game shows this until you bring your own soft texture. Apoli logs a line naming the texture when it spots this. Fill the colour in under the transparency, or set `"alpha_bleed": true` and Apoli fills it in as the texture loads.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The path to the PNG in a resource pack. |
| `lifetime` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `20` | How many ticks the particle lives. |
| `lifetime_variation` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | A random number of extra ticks, from `0` to `n`, added per particle, so a burst doesn't vanish all at once. |
| `size` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.2` | The size of the quad when it spawns. |
| `size_variation` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A random amount from `0` to `n` added to `size` per particle, so a burst isn't all one size. `end_size` is scaled by the same amount, so each particle keeps the shape of its own size curve. |
| `color_variation` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A random amount from `-n` to `+n` added to each of the red, green and blue channels per particle. `0.05` is a subtle shimmer, and `0.2` is a visibly mixed burst. |
| `hue_variation` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A random hue rotation from `-n` to `+n` degrees per particle, out of 360. `15` keeps a burst clearly one colour, and `180` scatters it across the whole wheel. |
| `end_size` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `size` | The size at the end of its life, interpolated with `easing`. Set `0.0` to shrink away. |
| `color` | Colour | `#FFFFFF` | The tint at spawn. It multiplies the texture, so a white texture takes the colour exactly. |
| `end_color` | Colour | `color` | The tint at the end of its life, interpolated with `easing`. It gives the `dust_color_transition` behaviour on your own texture. |
| `gravity` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Downward pull per tick. Negative values make the particle rise. |
| `friction` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.98` | The share of velocity kept each tick. `1.0` never slows down, and `0.9` drags hard. |
| `roll` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | The starting rotation of the quad, in degrees. Evaluated once per particle. |
| `roll_speed` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | Degrees added to the rotation each tick. Evaluated once per particle. |
| `frames` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The number of animation frames in the texture. `0` reads the count from the texture itself, and `1` forces a single still frame. |
| `frame_time` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks per frame. `0` uses the `frametime` from the texture's animation metadata, or, if the texture has none, spreads all frames evenly across `lifetime`. |
| `frame_layout` | [String](/docs/datapack/data-types/string) | `auto` | How the frames are arranged: `vertical` (a column, the vanilla layout), `horizontal` (a row), `grid` (square cells, left to right and then top to bottom), or `auto` to work it out from the image. |
| `loop_frames` | [Boolean](/docs/datapack/data-types/boolean) | from the texture | With `true` the animation repeats, and with `false` it holds the last frame. Left out, an animation that came from the texture's metadata loops and one you numbered by hand holds. |
| `physics` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the particle collides with blocks. A colliding particle comes to rest on the bottom edge of its sprite, at the largest size it reaches, and stops moving once it lands. `false` lets it pass through blocks. |
| `emissive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Draws at full brightness, ignoring the light level at its position. |
| `alpha_bleed` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fills the texture's colour in under its semi-transparent pixels when it loads, so a soft edge that lost its colour doesn't draw as a dark fringe. The PNG on disk isn't changed. |
| `blend` | [String](/docs/datapack/data-types/string) | `translucent` | `translucent` for normal alpha blending, or `additive` for a glow that brightens whatever is behind it. |
| `facing` | [String](/docs/datapack/data-types/string) | `camera` | `camera` turns the quad to face the viewer on every axis, and `vertical` keeps it upright and only turns it around Y. |
| `easing` | [Easing](/docs/datapack/data-types/easing) | `linear` | The curve used for the colour and size changes over the particle's life. |

> [!NOTE]
> Every numeric field above can be written as an [expression](/docs/datapack/data-types/expression) instead of a number. Those are evaluated once, on the server, at the moment the particle spawns, against the entity that spawned it, so `"size": "health / 10"` sizes the burst to whoever set it off, and every particle in that burst is the same size. `roll` and `roll_speed` are the exception. They run on the client, once per particle, which is what makes `"roll": "rUni(0, 360)"` give each particle its own angle.

### Animated textures

Apoli reads the same `.png.mcmeta` file the game uses for animated block and item textures, so a texture that already animates in vanilla animates here with nothing else written:

```json
{
  "type": "apoli:custom",
  "texture": "minecraft:textures/block/fire_0.png",
  "lifetime": 32,
  "size": 0.18
}
```

`fire_0.png` ships a 32-frame strip and an `.mcmeta` that gives the frame order, and the order, the frame count and the `frametime` all come from it. `frame_time` still overrides the speed, and `frames: 1` pins it to the first frame.

For a strip without an `.mcmeta`, such as your own sheet, say how many frames it holds:

```json
{
  "type": "apoli:custom",
  "texture": "example:textures/particle/spark.png",
  "frames": 4,
  "frame_time": 2,
  "loop_frames": true
}
```

`auto` reads an image taller than it is wide as a vertical strip and one wider than it is tall as a horizontal strip, in both cases only when the long side divides evenly by the short one. Anything else, such as a grid or a sheet whose cells aren't square, needs `frame_layout` written out.

> [!NOTE]
> A texture with neither an `.mcmeta` nor a `frames` value is drawn whole, as one frame. That is what you want for a plain particle sprite, and it is why `frames` matters on a sheet you made yourself.

### Colour

`color` and `end_color` accept four spellings:

- a hex string, `"#RRGGBB"` or `"#RRGGBBAA"`, such as `"#FF8800"` or `"#FFFFFF80"`. Alpha is the last pair, the same order a colour picker or CSS writes it in.
- a hex string starting with `0x`, `"0xAARRGGBB"`, such as `"0x80FFFFFF"`. This is Java's packed integer order, with alpha first, and it is the one spelling where alpha comes at the front.
- a list of floats from `0.0` to `1.0`, `[r, g, b]` or `[r, g, b, a]`
- a packed integer, such as `16750848`, which is also alpha first (`0xAARRGGBB`)

Alpha is part of the colour, so to fade a particle out, move alpha to `0` in `end_color`.

> [!NOTE]
> The vanilla particle shader discards any pixel below about 10% alpha, so a particle fading to `0` alpha disappears a little before the fade finishes instead of dissolving completely. Fading `end_size` to `0.0` at the same time hides the pop.

### Variation

`lifetime_variation`, `size_variation`, `color_variation` and `hue_variation` are rolled once per particle when it spawns, which turns one `spawn_particles` call into something that looks like smoke instead of a stamp. The colour rolls apply to `color` and `end_color` the same way, so each particle still runs the same fade, only from its own starting shade.

`roll` and `roll_speed` get their randomness differently. They take a full [Expression](/docs/datapack/data-types/expression), evaluated once per particle as it spawns. The random functions are what you want here: `rUni(a, b)` for a uniform draw, `rNor(mean, sd)` for a normal one, and `rList(…)` to pick from a set. There is no entity to read at that point, so entity variables come out as `0`, and these expressions are only for randomness and arithmetic.

```json
{
  "type": "apoli:custom",
  "texture": "example:textures/particle/leaf.png",
  "lifetime": 60,
  "size": 0.25,
  "gravity": 0.02,
  "roll": "rUni(0, 360)",
  "roll_speed": "rNor(0, 4)"
}
```

Every leaf starts at its own angle and tumbles at its own rate, most of them slowly and a few fast.

```json
{
  "type": "apoli:custom",
  "texture": "example:textures/particle/spark.png",
  "lifetime": 20,
  "lifetime_variation": 10,
  "size": 0.15,
  "size_variation": 0.1,
  "color": "#FFC24B",
  "end_color": "#FF3B1E00",
  "color_variation": 0.06,
  "hue_variation": 12.0,
  "blend": "additive",
  "emissive": true
}
```

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
    "end_color": "#FF3B1E80",
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
      "end_color": "#FFFFFF00",
      "gravity": 0.6,
      "roll_speed": 14.0,
      "frames": 4,
      "frame_time": 3
    },
    "count": 12,
    "speed": 0.25
  }
}
```

> [!TIP]
> `count` and `frequency` still belong to the power or action around the particle, not to the particle itself. One spawn call sends one packet however high `count` goes, so use a larger `count` instead of a shorter `frequency`.
