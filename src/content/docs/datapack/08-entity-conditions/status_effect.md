---
title: "Status Effect (Entity Condition Type)"
description: "Checks whether the entity has a status effect, optionally within a range of amplifiers and durations."
navigation_title: "Status Effect"
---

Checks whether the entity has a status effect, optionally within a range of amplifiers and durations.

Type ID: `apoli:status_effect`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the status effect to check for. |
| `min_amplifier` | [Integer](/docs/datapack/data-types/integer) | `0` | The lowest amplifier the effect can have. |
| `max_amplifier` | [Integer](/docs/datapack/data-types/integer) | `2147483647` | The highest amplifier the effect can have. |
| `min_duration` | [Integer](/docs/datapack/data-types/integer) | `-1` | The fewest ticks the effect can have left. |
| `max_duration` | [Integer](/docs/datapack/data-types/integer) | `2147483647` | The most ticks the effect can have left. |

## Examples

```json
"condition": {
    "type": "apoli:status_effect",
    "effect": "minecraft:speed",
    "min_amplifier": 1
}
```

This checks whether the entity has Speed II or stronger.
