---
title: "Stat (Data Type)"
description: "An Object specifying a statistic via a statistic type and an Identifier."
navigation_title: "Stat"
---

An [Object](/docs/datapack/data-types/object) specifying a statistic via a statistic type and an [Identifier](/docs/datapack/data-types/identifier).

## Fields

Field | Type | Default | Description
------|------|---------|------------
`type` | [Identifier](/docs/datapack/data-types/identifier) | | The type of the statistic.
`id` | [Identifier](/docs/datapack/data-types/identifier) | | The name of the statistic; may depend on the specified type of the statistic.

## Examples

```json
"stat": {
    "type": "minecraft:custom",
    "id": "minecraft:time_since_rest"
}
```

This example specifies the statistic for tracking the time since the last time a player has rested.

```json
"stat": {
    "type": "minecraft:mined",
    "id": "minecraft:dirt"
}
```

This example specifies the statistic for tracking how much Dirt blocks a player has mined.
