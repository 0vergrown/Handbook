---
title: "Tick Rate (Entity Condition Type)"
description: "Checks the tick rate the entity is actually running at, and whether time is frozen for it."
navigation_title: "Tick Rate"
---

Checks the tick rate the entity is actually running at, after the entity → chunk → dimension fallback has been resolved. A passenger reports its root vehicle's rate.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | `entity`, `chunk` or `dimension` | `entity` | Which rate to read: the entity's own effective rate, the rate of the chunk it stands in, or the dimension's. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | How to compare the rate. Omit it to test only `frozen`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The value the rate is compared against. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, the scope must (or must not) be frozen — a frozen scope reads as rate `0`. |

An entity with no override anywhere reports the server's own tick rate, which is `20` unless an operator has changed it.

## Examples

```json
{
    "type": "apoli:tick_rate",
    "comparison": "<",
    "compare_to": 20
}
```

True while the entity is running slower than the server.

```json
{
    "type": "apoli:tick_rate",
    "scope": "chunk",
    "frozen": true
}
```

True while the chunk the entity is standing in is frozen.
