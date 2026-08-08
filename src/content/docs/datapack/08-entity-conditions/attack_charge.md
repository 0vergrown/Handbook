---
title: "Attack Charge (Entity Condition Type)"
description: "Checks how far the player's attack-strength meter has recharged right now."
navigation_title: "Attack Charge"
aliases: ["spam_attack", "attack_cooldown"]
---

Checks how far the player's attack-strength meter has currently recharged — the same meter the vanilla crosshair indicator shows. Unlike the [damage condition of the same name](/docs/datapack/damage-conditions/attack_charge), this reads the live value at any time, not the value recorded for a specific hit.

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
