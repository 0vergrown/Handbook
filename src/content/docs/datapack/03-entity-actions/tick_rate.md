---
title: "Tick Rate (Entity Action Type)"
description: "Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension."
navigation_title: "Tick Rate"
---

Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension. This is the one-shot form of [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) — what it sets stays set until something clears it, so pair it with `duration` or with a matching `reset` call.

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | `entity`, `chunk` or `dimension` | `entity` | What the change applies to. `chunk` and `dimension` use the entity's current position. |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Logical ticks per second. `20` is normal speed, `0` stops everything. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _unchanged_ | Stops ticking entirely, regardless of `rate`. |
| `step` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Lets a frozen scope run this many ticks and then freeze again — the per-entity form of `/tick step`. |
| `sprint` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Runs the scope at full speed for this many ticks, ignoring its rate. |
| `reset` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Clears every override on that scope and gives it back the normal flow of time. Every other field is ignored. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `0` | How long the override lasts, in ticks. `0` means until something clears it. |

Fields left out are left as they were, so a second call with only `frozen: false` unfreezes without touching the rate.

## Examples

```json
{
    "type": "apoli:tick_rate",
    "rate": 5,
    "duration": 100
}
```

Runs the entity at a quarter speed for five seconds, then lets it go back to normal on its own.

```json
{
    "type": "apoli:area_of_effect",
    "shape": "sphere",
    "radius": 6,
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:tick_rate",
            "frozen": true,
            "duration": 60
        }
    }
}
```

Freezes every entity within six blocks for three seconds — a time-stop shockwave.
