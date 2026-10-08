---
title: "Shader (Power Type)"
description: "Applies a post-processing shader to the vision of the entity that has the power."
navigation_title: "Shader"
---

Applies a post-processing shader to the vision of the entity that has the power.

Type ID: `apoli:shader`

> For more information about post-processing shaders, visit [Minecraft Wiki: Shaders (Before 1.9)](https://minecraft.wiki/w/Shaders/Before_1.9)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`shader` | Identifier | | The post chain file to load, written as its full path: `minecraft:shaders/post/creeper.json` loads `assets/minecraft/shaders/post/creeper.json`.
`toggleable` | Boolean | `true` | Determines if the applied shader can be toggled.
`priority` | Integer | `0` | Which shader wins when the entity holds more than one Shader power at once. Highest priority is applied; ties are broken arbitrarily.

## Behaviour

Only one post-processing shader can be active at a time, so Apoli picks the highest-`priority` Shader power whose `condition` currently passes and loads that one. The choice is re-evaluated every tick, so a shader gated behind a `condition` switches on and off with it, and removing the last matching power restores the normal view.

The choice is made **on the server** and sent to the client, so any [entity condition](/docs/datapack/introduction/conditions) works here — including ones that read state the client does not have, like [apoli:inventory](/docs/datapack/entity-conditions/inventory) over a [power inventory](/docs/datapack/powers/inventory), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard) or [apoli:command](/docs/datapack/entity-conditions/command).

If the entity is spectating something else, the shader comes from whatever it is spectating, not from the spectator.

A shader file that fails to load (missing file, malformed JSON) is reported once, naming the file it looked for, and then ignored, so a typo does not spam the log every frame. Fix the file and reload resources (F3+T) to retry it.

> Both sides need Apoli: the server decides which shader applies and the client binds it. A client that is never told about the shader simply does not show it — nothing crashes, the effect just never appears.

## Built-in shaders

Any post-processing shader a resource pack provides can be used, and these come with the game and Apoli, under `minecraft:shaders/post/<name>.json`:

`antialias`, `art`, `bits`, `blobs`, `blobs2`, `blur`, `bumpy`, `color_convolve`, `creeper`, `deconverge`, `desaturate`, `entity_outline`, `flip`, `fxaa`, `green`, `invert`, `notch`, `ntsc`, `outline`, `pencil`, `phosphor`, `scan_pincushion`, `sobel`, `spider`, `transparency`, `wobble`

Minecraft 1.21.1 itself only ships `blur`, `creeper`, `entity_outline`, `invert`, `spider` and `transparency`; Apoli provides the other twenty, so the same shader path works on 1.20.1 and 1.21.1.

## Examples

```json
{
  	"type": "apoli:shader",
  	"shader": "minecraft:shaders/post/pencil.json"
}
```

This example makes the player view the world as a pencil sketch!

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

The sobel shader is only applied while the `example:night_sight` power is active, it outranks any other Shader power the entity holds, and the player cannot toggle it off.
