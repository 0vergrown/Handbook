---
title: "Modify Resource (Reward Type)"
description: "Drives an Apoli resource from how many times a Pufferfish's Skills skill is unlocked."
navigation_title: "Modify Resource"
---

Writes an [apoli:resource](/docs/datapack/powers/resource) value derived from the skill's unlock count, so buying, refunding and repeat-buying the skill all move the resource the right way. Registered only when [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed.

Type ID: `apoli:modify_resource`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The power whose value is written. Any id [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) accepts works here, including cooldowns. |
| `value` | Integer | **required** | The per-unlock amount. |
| `operation` | String | `add` | `add` writes `base + value × count`; `set` writes `value` while the skill is unlocked and `base` while it is not. |
| `base` | Integer | `0` | The value written when the skill is not unlocked. |

`count` is how many times the skill has been bought — always `0` or `1` unless the skill is repeatable.

The written value is still clamped by the target power's own `min`/`max`.

## Why it writes instead of adding

Skills re-applies every reward when a player logs in, so a reward that *added* to a persistent Apoli resource would stack up a little more on every login. Deriving the value from `count` makes re-applying a no-op, which is what keeps this reward safe across restarts and datapack reloads. If you want a one-off "+5 mana, right now" effect instead, run [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) as an entity action from a power the skill grants.

## Examples

```json
{
    "type": "apoli:modify_resource",
    "data": {
        "resource": "example:max_mana",
        "value": 10
    }
}
```

Each level of a repeatable skill raises `example:max_mana` by 10; refunding a level lowers it again.

```json
{
    "type": "apoli:modify_resource",
    "data": {
        "resource": "example:spell_slots",
        "operation": "set",
        "value": 3,
        "base": 1
    }
}
```

While the skill is unlocked the player has 3 spell slots, otherwise 1.
