---
title: "Tick Rate (Entity Action Type)"
description: "Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension."
navigation_title: "Tick Rate"
---

Sets, freezes, steps or resets the tick rate of the entity, of the chunk it stands in, or of its whole dimension. This is the one-off form of [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate). What it sets stays set until something clears it, so pair it with `duration` or with a matching `reset` call. The console equivalent is [`/tick entity` and `/tick chunk`](/docs/datapack/commands/tick).

Type ID: `apoli:tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `scope` | [String](/docs/datapack/data-types/string) (`entity`, `chunk`, `dimension` or `server`) | `entity` | What the change applies to. `chunk` and `dimension` use the entity's current position. `server` drives Minecraft's own tick rate (see [Server scope is vanilla's `/tick`](#server-scope-is-vanillas-tick)). |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Logical ticks per second. `20` is normal speed, and `0` stops everything. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | _unchanged_ | Stops ticking entirely, whatever the `rate`. |
| `step` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Lets a frozen scope run this many ticks and then freeze again, like `/tick step` for one scope. |
| `sprint` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unchanged_ | Runs the scope at full speed for this many ticks, ignoring its rate. |
| `reset` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Clears every override on that scope and gives it back the normal flow of time. Every other field is ignored. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `0` | How long the override lasts in ticks, after which the scope goes back to what it was. `0` means until something clears it. |

Fields you leave out stay as they were, so a second call with only `frozen: false` unfreezes without touching the rate.

## Server scope is vanilla's `/tick`

`scope: server` skips Apoli's own gate and calls the same code `/tick` does, so `rate` is `/tick rate`, `frozen` is `/tick freeze`, `step` is `/tick step` and `sprint` is `/tick sprint`. Minecraft syncs that state to every client itself, so rendering, particles and sounds all slow down with the world and nothing stutters. Use this scope for a global slow motion effect.

It is also global and isn't reference-counted, so the last thing to set it wins. Apoli remembers the rate and freeze state the server had before it first touched them, and `duration` and `reset: true` both restore that instead of assuming 20 TPS. That matters when an operator has already run `/tick rate` themselves.

> [!NOTE]
> `scope: server` isn't available on Minecraft 1.20.1, which has no `/tick` command. Use `dimension` there.

## Examples

```json
{
    "type": "apoli:tick_rate",
    "rate": 5,
    "duration": 100
}
```

This runs the entity at a quarter of normal speed for five seconds, then lets it go back to normal on its own.

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

This freezes every entity within six blocks for three seconds, like a time-stop shockwave.
