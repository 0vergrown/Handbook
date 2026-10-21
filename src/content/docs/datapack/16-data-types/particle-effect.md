---
title: "Particle Effect (Data Type)"
description: "A string naming a particle type, or an object naming it together with that type's own parameters."
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

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The particle type to spawn. |
| other fields | | | Every other field belongs to the named particle type. |

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

A block particle with the ice texture.

> [!WARNING]
> A `params` string (`{"type": "minecraft:dust", "params": "0.92 0.31 0.31 2"}`) is parsed as a `/particle` command argument, and that syntax differs between versions. On 1.20.1 it is the space-separated form shown here. On 1.21.1 the game reads it as SNBT with the same field names as the object form, so a space-separated string can't be read there and no particle spawns. Write the fields out instead, since the object form above is read the same way on every version.

> [!TIP]
> A particle Apoli can't build is named in the log the first time it is used, and nothing spawns where it is used. If a power that should give off particles is silent, look for that line first.

## Apoli's own particle

`apoli:custom` is a particle type Apoli registers, built from a texture you ship in a resource pack. Its colour, size, lifetime, gravity, rotation and frame animation all come from the JSON. It is written like any other particle in object form:

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
