---
title: "Particle Effect"
description: "A data type that's either a String which defines only the particle type or an Object which defines the particle type and its additional parameters."
---

A data type that's either a [String](/docs/datapack/data-types/string) which defines only the particle type or an [Object](/docs/datapack/data-types/object) which defines the particle type and its additional parameters.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`type` | [Identifier](/docs/datapack/data-types/identifier) | | The namespace and ID of the particle type.
`params` | [String](/docs/datapack/data-types/string) | | The additional parameter for the particle type.

## Examples

```json
"particle": "minecraft:happy_villager"
```

A happy villager particle type.

```json
"particle": {
    "type": "minecraft:dust",
    "params": "0.922 0.314 0.314 2"
}
```

A red dust particle type with a count of 8.

```json
"particle": {
    "type": "minecraft:block",
    "params": "minecraft:ice"
}
```

A block particle type that uses the Ice texture.
