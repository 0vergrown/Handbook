---
title: "Tick Rate (Block Action Type)"
description: "Sets, freezes, steps or resets the tick rate of the chunk the block is in, or of its whole dimension."
navigation_title: "Tick Rate"
---

Sets, freezes, steps or resets the tick rate of the chunk containing the block, or of its whole dimension. A slowed chunk runs its block entities, its scheduled block and fluid ticks and its random ticks at that rate, so furnaces smelt, crops grow and hoppers move at whatever fraction of normal speed you ask for.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | `chunk`, `dimension` or `server` | `chunk` | Whether the change covers the block's chunk, the whole dimension, or the server. `server` drives Minecraft's own tick rate, exactly as `/tick` does — see [the entity action](/docs/datapack/entity-actions/tick_rate#server-scope-is-vanillas-tick). |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Logical ticks per second. `20` is normal speed, `0` stops everything. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _unchanged_ | Stops ticking entirely, regardless of `rate`. |
| `step` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Lets a frozen scope run this many ticks and then freeze again. |
| `sprint` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Runs the scope at full speed for this many ticks, ignoring its rate. |
| `reset` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Clears every override on that scope. Every other field is ignored. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `0` | How long the override lasts, in ticks. `0` means until something clears it. |

An entity standing in a slowed chunk inherits that rate unless it has one of its own, so freezing a chunk freezes what is standing in it too.

## Example

```json
{
    "type": "apoli:tick_rate",
    "rate": 2,
    "duration": 200
}
```

Crawls the chunk to a tenth speed for ten seconds.
