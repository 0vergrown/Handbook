---
title: "Tick Rate (Block Condition Type)"
description: "Checks the tick rate of the chunk the block is in, or of its dimension, and whether time is frozen there."
navigation_title: "Tick Rate"
---

Checks the tick rate of the chunk containing the block, or of its whole dimension, once the chunk's rate and then the dimension's rate have been resolved.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | [String](/docs/datapack/data-types/string) (`chunk`, `dimension` or `server`) | `chunk` | Which rate to read. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | How to compare the rate. Leave it out to test only `frozen`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The value the rate is compared against. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, the scope must be frozen (`true`) or must not be (`false`). |

## Example

```json
{
    "type": "apoli:tick_rate",
    "comparison": "<=",
    "compare_to": 5
}
```

This passes for blocks in a chunk running at a quarter of normal speed or slower.
