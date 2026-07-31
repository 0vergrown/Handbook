---
title: "Shader (Power Type)"
description: "Applies a post-processing shader to the vision of the entity that has the power."
navigation_title: "Shader"
---

Applies a post-processing shader to the vision of the entity that has the power.

Type ID: `apoli:shader`

!!! note

    For more information about post-processing shaders, visit [Minecraft Wiki: Shaders (Before 1.9)](https://minecraft.wiki/w/Shaders/Before_1.9)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`shader` | Identifier | | Specifies the location of the shader resource file to use.
`toggleable` | Boolean | `true` | Determines if the applied shader can be toggled.

## Examples

```json
{
  	"type": "apoli:shader",
  	"shader": "minecraft:shaders/post/pencil.json"
}
```

This example makes the player view the world as a pencil sketch!
