---
title: "origins:biome"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether the entity is in a specified biome.

Type ID: `origins:biome`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`biome` | Identifier | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in matches the specified namespace and ID.
`biomes` | Array of Identifiers | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in matches one of the specified namespace and IDs.
`condition` | Biome Condition Type | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in fulfills the specified biome condition type.


## Examples

```json
"condition": {
    "type": "origins:biome",
    "biome": "minecraft:plains"
}
```

This example will check if the entity is currently in a Plains biome.



```json
"condition": {
    "type": "origins:biome",
    "condition": {
        "type": "origins:category",
        "category": "forest"
    }
}
```

This example will check if the entity is currently in a Forest-like biome.
