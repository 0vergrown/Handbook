---
title: "Attack Charge (Damage Condition Type)"
description: "Checks how charged the attacker's melee swing was, and by default whether they were spam-clicking."
navigation_title: "Attack Charge"
aliases: ["spam_attack", "attack_cooldown"]
---

Checks how charged the attacker's melee swing was. Minecraft scales melee damage by an attack strength meter that refills after every swing. By default this condition is true when the hit landed before that meter refilled, which means the player was spam-clicking.

Type ID: `apoli:attack_charge`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `<=` | How the charge is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.9` | The charge to compare against, from `0.0` (just swung) to `1.0` (fully recharged). |

`0.9` is the threshold vanilla uses to decide whether a hit can be a critical or a sweep attack, so the defaults match Minecraft's own idea of a hit that isn't at full strength.

## Examples

Punish spam-clicking by halving the damage of any hit thrown before the meter refilled:

```json
{
    "type": "apoli:modify_damage_dealt",
    "modifier": {
        "operation": "multiply_total_multiplicative",
        "value": -0.5
    },
    "damage_condition": {
        "type": "apoli:spam_attack"
    }
}
```

Reward patience instead. `inverted` flips the condition so it means the hit was properly timed:

```json
{
    "type": "apoli:modify_damage_dealt",
    "modifier": {
        "operation": "multiply_base_additive",
        "value": 0.5
    },
    "damage_condition": {
        "type": "apoli:attack_charge",
        "inverted": true
    }
}
```

Require a fully charged swing, with no tolerance at all:

```json
"damage_condition": {
    "type": "apoli:attack_charge",
    "comparison": ">=",
    "compare_to": 1.0
}
```

> [!WARNING]
> The condition is only true for player melee attacks. Projectiles, fall damage, mob attacks and damage dealt by other powers never record a charge, so the condition is `false` for all of them, and so `true` for all of them when `inverted` is set. If you mean a properly timed melee hit, combine the inverted form with a check that the damage came from a player, such as [apoli:attacker](/docs/datapack/damage-conditions/attacker).

There is an [entity condition with the same ID](/docs/datapack/entity-conditions/attack_charge) that reads the player's current charge outside of a damage event, for HUD powers or powers that run every tick.
