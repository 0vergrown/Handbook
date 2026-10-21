---
title: "Shader (Power Type)"
description: "Applies a post-processing shader to the view of the entity that has the power."
navigation_title: "Shader"
---

Applies a post-processing shader to the view of the entity that has the power.

Type ID: `apoli:shader`

The Minecraft Wiki's [shaders page](https://minecraft.wiki/w/Shaders/Before_1.9) explains how post-processing shaders work.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `shader` | [Identifier](/docs/datapack/data-types/identifier) | | The post chain file to load, written as its full path. `minecraft:shaders/post/creeper.json` loads `assets/minecraft/shaders/post/creeper.json`. |
| `toggleable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the player can toggle the shader. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Which shader wins when the entity has more than one shader power at once. The highest priority is applied, and ties are broken arbitrarily. |

## Behaviour

Only one post-processing shader can be active at a time, so Apoli picks the shader power with the highest `priority` whose `condition` passes and loads that one. The choice is checked again every tick, so a shader behind a `condition` switches on and off with it, and removing the last matching power restores the normal view.

The choice is made on the server and sent to the client, so any [entity condition](/docs/datapack/introduction/conditions) works here, including ones that read state the client doesn't have, like [apoli:inventory](/docs/datapack/entity-conditions/inventory) over a [power inventory](/docs/datapack/powers/inventory), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard) or [apoli:command](/docs/datapack/entity-conditions/command).

If the entity is spectating something else, the shader comes from whatever it is spectating, not from the spectator.

A shader file that fails to load, because it is missing or the JSON is malformed, is reported once with the name of the file it looked for, and then ignored, so a typo doesn't fill the log every frame. Fix the file and reload resources (F3+T) to try again.

> [!NOTE]
> Both sides need Apoli: the server decides which shader applies and the client loads it. A client that is never told about the shader doesn't show it. Nothing crashes, and the effect never appears.

## Built-in shaders

You can use any post-processing shader a resource pack provides, and these come with the game and Apoli, under `minecraft:shaders/post/<name>.json`:

`antialias`, `art`, `bits`, `blobs`, `blobs2`, `blur`, `bumpy`, `color_convolve`, `creeper`, `deconverge`, `desaturate`, `entity_outline`, `flip`, `fxaa`, `green`, `invert`, `notch`, `ntsc`, `outline`, `pencil`, `phosphor`, `scan_pincushion`, `sobel`, `spider`, `transparency`, `wobble`

Minecraft 1.21.1 itself only ships `blur`, `creeper`, `entity_outline`, `invert`, `spider` and `transparency`. Apoli provides the other twenty, so the same shader path works on 1.20.1 and 1.21.1.

## Examples

```json
{
  	"type": "apoli:shader",
  	"shader": "minecraft:shaders/post/pencil.json"
}
```

This makes the player see the world as a pencil sketch.

```json
{
    "type": "apoli:shader",
    "shader": "minecraft:shaders/post/sobel.json",
    "toggleable": false,
    "priority": 10,
    "condition": {
        "type": "apoli:power_active",
        "power": "example:night_sight"
    }
}
```

The sobel shader only applies while the `example:night_sight` power is active. It outranks any other shader power the entity has, and the player can't toggle it off.
