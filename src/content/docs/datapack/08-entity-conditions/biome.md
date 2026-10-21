---
title: "Biome (Entity Condition Type)"
description: "Checks whether the entity is in a given biome, one of several biomes, or a biome that passes a condition."
navigation_title: "Biome"
---

Checks whether the entity is in a given biome, one of several biomes, or a biome that passes a biome condition.

Type ID: `apoli:biome`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `biome` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of the biome the entity must be in. |
| `biomes` | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Several biome IDs. The entity must be in one of them. |
| `condition` | [Biome Condition Type](/docs/datapack/biome-conditions) | _optional_ | The biome the entity is in must pass this condition. |

## Examples

```json
"condition": {
    "type": "apoli:biome",
    "biome": "minecraft:plains"
}
```

This checks whether the entity is in a plains biome.

```json
"condition": {
    "type": "apoli:biome",
    "condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:is_forest"
    }
}
```

This checks whether the entity is in a forest-like biome, meaning any biome in the `minecraft:is_forest` biome tag, through the [apoli:in_tag](/docs/datapack/biome-conditions/in_tag) biome condition.
