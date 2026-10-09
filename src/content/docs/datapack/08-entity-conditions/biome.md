---
title: "Biome (Entity Condition Type)"
description: "Checks whether the entity is in a specified biome."
navigation_title: "Biome"
---

Checks whether the entity is in a specified biome.

Type ID: `apoli:biome`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`biome` | Identifier | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in matches the specified namespace and ID.
`biomes` | Array of Identifiers | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in matches one of the specified namespace and IDs.
`condition` | Biome Condition Type | _optional_ | If specified, only evaluate the condition to true if the biome the entity is in fulfills the specified biome condition type.

## Examples

```json
"condition": {
    "type": "apoli:biome",
    "biome": "minecraft:plains"
}
```

This example will check if the entity is currently in a Plains biome.

```json
"condition": {
    "type": "apoli:biome",
    "condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:is_forest"
    }
}
```

This example will check if the entity is currently in a Forest-like biome (any biome in the `minecraft:is_forest` biome tag, through the [apoli:in_tag](/docs/datapack/biome-conditions/in_tag) biome condition).
