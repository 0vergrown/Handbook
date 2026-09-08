---
title: "Tick Rate (Block Condition Type)"
description: "Checks the tick rate of the chunk the block is in, or of its dimension, and whether time is frozen there."
navigation_title: "Tick Rate"
---

Checks the tick rate of the chunk containing the block, or of its whole dimension, after the chunk → dimension fallback has been resolved.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | `chunk`, `dimension` or `server` | `chunk` | Which rate to read. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | How to compare the rate. Omit it to test only `frozen`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The value the rate is compared against. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, the scope must (or must not) be frozen. |

## Example

```json
{
    "type": "apoli:tick_rate",
    "comparison": "<=",
    "compare_to": 5
}
```

True for blocks in a chunk that is crawling at a quarter speed or slower.
