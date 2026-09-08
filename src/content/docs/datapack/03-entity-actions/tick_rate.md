---
title: "Tick Rate (Entity Action Type)"
description: "Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension."
navigation_title: "Tick Rate"
---

Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension. This is the one-shot form of [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) — what it sets stays set until something clears it, so pair it with `duration` or with a matching `reset` call. The same thing from the console is [`/tick entity` and `/tick chunk`](/docs/datapack/commands/tick).

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | `entity`, `chunk`, `dimension` or `server` | `entity` | What the change applies to. `chunk` and `dimension` use the entity's current position; `server` drives Minecraft's own tick rate — see [Server scope is vanilla's `/tick`](#server-scope-is-vanillas-tick). |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Logical ticks per second. `20` is normal speed, `0` stops everything. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _unchanged_ | Stops ticking entirely, regardless of `rate`. |
| `step` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Lets a frozen scope run this many ticks and then freeze again — the per-entity form of `/tick step`. |
| `sprint` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Runs the scope at full speed for this many ticks, ignoring its rate. |
| `reset` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Clears every override on that scope and gives it back the normal flow of time. Every other field is ignored. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `0` | How long the override lasts, in ticks, after which the scope goes back to what it was. `0` means until something clears it. |

Fields left out are left as they were, so a second call with only `frozen: false` unfreezes without touching the rate.

## Server scope is vanilla's `/tick`

`scope: server` does not use Apoli's own gate at all — it calls the same code `/tick` does, so
`rate` is `/tick rate`, `frozen` is `/tick freeze`, `step` is `/tick step` and `sprint` is
`/tick sprint`. Minecraft syncs that state to every client itself, which means rendering, particles
and sounds all slow down with the world and nothing stutters. It is the right scope for a global
slow-motion effect.

It is also global and it is not reference-counted: the last thing to set it wins. Apoli remembers the
rate and freeze state the server had before it first touched them, so `duration` and `reset: true`
both put that back rather than assuming 20 TPS — which matters when an operator has already run
`/tick rate` themselves.

> `scope: server` is unavailable on Minecraft 1.20.1, which has no `/tick` command. There, use
> `dimension`.

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
