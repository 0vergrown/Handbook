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
`shader` | Identifier | | Specifies the location of the shader resource file to use.
`toggleable` | Boolean | `true` | Determines if the applied shader can be toggled.
`priority` | Integer | `0` | Which shader wins when the entity holds more than one Shader power at once. Highest priority is applied; ties are broken arbitrarily.

## Behaviour

Only one post-processing shader can be active at a time, so Apoli picks the highest-`priority` Shader power whose `condition` currently passes and loads that one. The choice is re-evaluated every tick, so a shader gated behind a `condition` switches on and off with it, and removing the last matching power restores the normal view.

The choice is made **on the server** and sent to the client, so any [entity condition](/docs/datapack/introduction/conditions) works here — including ones that read state the client does not have, like [apoli:inventory](/docs/datapack/entity-conditions/inventory) over a [power inventory](/docs/datapack/powers/inventory), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard) or [apoli:command](/docs/datapack/entity-conditions/command).

If the entity is spectating something else, the shader comes from whatever it is spectating, not from the spectator.

A shader file that fails to load (missing file, malformed JSON) is reported once and then ignored, so a typo does not spam the log every frame. Fix the file and reload resources (F3+T) to retry it.

> Both sides need Apoli 1.36.2 or newer. A client on an older build is simply never told about the shader — nothing crashes, the effect just never appears.

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
