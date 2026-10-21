---
title: "Modify Resource (Reward Type)"
description: "Sets an Apoli resource from how many times a Pufferfish's Skills skill is unlocked."
navigation_title: "Modify Resource"
---

Writes an [apoli:resource](/docs/datapack/powers/resource) value worked out from the skill's unlock count, so buying, refunding and buying the skill again all move the resource the right way. It is only registered when [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed.

Type ID: `apoli:modify_resource`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The power whose value is written. Any ID [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) accepts works here, including cooldowns. |
| `value` | [Integer](/docs/datapack/data-types/integer) | _required_ | The amount for each unlock. |
| `operation` | [String](/docs/datapack/data-types/string) | `add` | `add` writes `base + value × count`, and `set` writes `value` while the skill is unlocked and `base` while it isn't. |
| `base` | [Integer](/docs/datapack/data-types/integer) | `0` | The value written when the skill isn't unlocked. |

`count` is how many times the skill has been bought, which is always `0` or `1` unless the skill can be bought repeatedly.

The written value is still clamped by the target power's own `min` and `max`.

## Why it writes instead of adding

Skills applies every reward again when a player logs in, so a reward that added to a persistent Apoli resource would pile up a little more on every login. Working the value out from `count` makes applying it again change nothing, which is what keeps this reward safe across restarts and data pack reloads. For a one-off "+5 mana, right now" effect, run [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) as an entity action from a power the skill grants.

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

Each level of a repeatable skill raises `example:max_mana` by 10, and refunding a level lowers it again.

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

While the skill is unlocked, the player has 3 spell slots, and 1 otherwise.
