---
title: "Attack Charge (Entity Condition Type)"
description: "Checks how far the player's attack-strength meter has recharged right now."
navigation_title: "Attack Charge"
aliases: ["spam_attack", "attack_cooldown"]
---

Checks how far the player's attack-strength meter has currently recharged — the same meter the vanilla crosshair indicator shows. Unlike the [damage condition of the same name](/docs/datapack/damage-conditions/attack_charge), it works at any time, not only for a hit. While the player's own melee hit is being dealt — in the actions of [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), for instance — it reads the charge of that swing, before the game resets the meter. The `attack_charge` [Expression](/docs/datapack/data-types/expression#bound-variables) variable reads the same value.

Type ID: `apoli:attack_charge`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `<=` | How the charge is compared to `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.9` | The charge to compare against, from `0.0` (just swung) to `1.0` (fully recharged). |

Always `false` for non-players — only players have an attack-strength meter.

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

Scale the threshold off a resource so a pack can make charging faster or slower to satisfy:

```json
{
    "type": "apoli:attack_charge",
    "comparison": ">=",
    "compare_to": "1.0 - resource('example:focus') * 0.1"
}
```
