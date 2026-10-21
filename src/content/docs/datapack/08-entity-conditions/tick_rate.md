---
title: "Tick Rate (Entity Condition Type)"
description: "Checks the tick rate the entity is running at, and whether time is frozen for it."
navigation_title: "Tick Rate"
---

Checks the tick rate the entity is running at, once its own rate, its chunk's rate and its dimension's rate have been resolved in that order. A passenger reports the rate of the vehicle at the bottom of its stack.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | [String](/docs/datapack/data-types/string) (`entity`, `chunk`, `dimension` or `server`) | `entity` | Which rate to read: the entity's own effective rate, the rate of the chunk it stands in, the dimension's, or Minecraft's own server tick rate. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | How to compare the rate. Leave it out to test only `frozen`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The value the rate is compared against. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, the scope must be frozen (`true`) or must not be (`false`). A frozen scope reads as rate `0`. |

An entity with no override anywhere reports the server's own tick rate, which is `20` unless an operator has changed it.

## Examples

```json
{
    "type": "apoli:tick_rate",
    "comparison": "<",
    "compare_to": 20
}
```

This passes while the entity runs slower than the server.

```json
{
    "type": "apoli:tick_rate",
    "scope": "chunk",
    "frozen": true
}
```

This passes while the chunk the entity is standing in is frozen.
