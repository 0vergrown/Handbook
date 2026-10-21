---
title: "Attack Charge (Entity Condition Type)"
description: "Checks how far the player's attack strength meter has recharged right now."
navigation_title: "Attack Charge"
aliases: ["spam_attack", "attack_cooldown"]
---

Checks how far the player's attack strength meter has recharged, the same meter the vanilla crosshair indicator shows. The [damage condition of the same name](/docs/datapack/damage-conditions/attack_charge) only works for a hit, while this one works at any time. While the player's own melee hit is being dealt, in the actions of [apoli:action_on_hit](/docs/datapack/powers/action_on_hit) for example, it reads the charge of that swing before the game resets the meter. The `attack_charge` [expression](/docs/datapack/data-types/expression#bound-variables) variable reads the same value.

Type ID: `apoli:attack_charge`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `<=` | How the charge is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.9` | The charge to compare against, from `0.0` (just swung) to `1.0` (fully recharged). |

It is always `false` for entities that aren't players, because only players have an attack strength meter.

## Examples

Glow while your swing is fully charged:

```json
{
    "type": "apoli:glowing",
    "condition": {
        "type": "apoli:attack_charge",
        "comparison": ">=",
        "compare_to": 1.0
    }
}
```

Scale the threshold off a resource, so a pack can make the charge easier or harder to reach:

```json
{
    "type": "apoli:attack_charge",
    "comparison": ">=",
    "compare_to": "1.0 - resource('example:focus') * 0.1"
}
```
