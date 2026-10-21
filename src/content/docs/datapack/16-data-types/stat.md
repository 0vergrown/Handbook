---
title: "Stat (Data Type)"
description: "An object that names a statistic by its type and ID."
navigation_title: "Stat"
---

An [Object](/docs/datapack/data-types/object) that names a statistic by its statistic type and an [Identifier](/docs/datapack/data-types/identifier).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The type of the statistic. |
| `id` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The name of the statistic, which depends on its type. |

## Examples

```json
"stat": {
    "type": "minecraft:custom",
    "id": "minecraft:time_since_rest"
}
```

This names the statistic that tracks the time since a player last rested.

```json
"stat": {
    "type": "minecraft:mined",
    "id": "minecraft:dirt"
}
```

This names the statistic that tracks how many dirt blocks a player has mined.
