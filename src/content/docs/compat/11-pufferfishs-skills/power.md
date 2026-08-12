---
title: "Power (Reward Type)"
description: "Grants an Apoli power while a Pufferfish's Skills skill is unlocked."
navigation_title: "Power"
---

Grants an Apoli power to the player while the skill holding this reward is unlocked, and takes it back when the skill is locked or refunded. Registered only when [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed.

Type ID: `apoli:power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The power to grant. |
| `operation` | String | `add` | `add` grants the power while unlocked; `remove` inverts it — the power is held while the skill is **locked** and dropped once it is unlocked. |

## Examples

```json
{
    "type": "apoli:power",
    "data": {
        "power": "example:double_jump"
    }
}
```

Unlocking the skill grants `example:double_jump`; refunding it takes the power away again.

```json
{
    "type": "apoli:power",
    "data": {
        "power": "example:slow_falling_penalty",
        "operation": "remove"
    }
}
```

The player carries `example:slow_falling_penalty` until this skill is unlocked, at which point the reward stops granting it.

> `operation: remove` cannot strip a power the player got from somewhere else — Apoli powers are held per source, and a reward only ever controls its own. It works by granting the power while locked, so use it for drawbacks the skill tree itself introduced.
