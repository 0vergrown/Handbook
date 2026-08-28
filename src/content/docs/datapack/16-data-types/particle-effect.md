---
title: "Particle Effect (Data Type)"
description: "A String naming a particle type, or an Object naming it together with that type's own parameters."
navigation_title: "Particle Effect"
---

A [String](/docs/datapack/data-types/string) naming a particle type, or an [Object](/docs/datapack/data-types/object) naming it together with that type's own parameters.

## String form

Any particle that takes no parameters can be written as a bare identifier:

```json
"particle": "minecraft:happy_villager"
```

## Object form

The object form is the particle's own JSON: a `type` field plus whatever fields that particle type declares. The field names are the vanilla ones, the same as in `/particle`.

Field | Type | Default | Description
------|------|---------|------------
`type` | [Identifier](/docs/datapack/data-types/identifier) | — | The particle type to spawn.
… | | | Every other field belongs to the named particle type.

```json
"particle": {
    "type": "minecraft:dust",
    "color": [0.92, 0.31, 0.31],
    "scale": 2.0
}
```

A red dust particle at double size.

```json
"particle": {
    "type": "minecraft:block",
    "block_state": {
        "Name": "minecraft:ice"
    }
}
```

A block particle that uses the Ice texture.

> A legacy `params` string (`{"type": "minecraft:dust", "params": "0.92 0.31 0.31 2"}`) is still accepted and parsed as a `/particle` command argument, but the fields above are the supported form.

## Apoli's own particle

`apoli:custom` is a particle type Apoli registers, built from a texture you ship in a resource pack — colour, size, lifetime, gravity, rotation and frame animation all come from the JSON. It is written like any other object-form particle:

```json
"particle": {
    "type": "apoli:custom",
    "texture": "example:textures/particle/spark.png",
    "lifetime": 20,
    "color": "#FFB13B",
    "end_color": "#FF3B3B",
    "end_size": 0.0,
    "blend": "additive"
}
```

See [Custom Particle](/docs/datapack/data-types/custom-particle) for the full field list.
