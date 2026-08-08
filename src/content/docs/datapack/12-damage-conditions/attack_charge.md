---
title: "Attack Charge (Damage Condition Type)"
description: "Checks how charged the attacker's melee swing was — by default, whether they were click-spamming."
navigation_title: "Attack Charge"
aliases: ["spam_attack", "attack_cooldown"]
---

Checks how charged the attacker's melee swing was. Minecraft scales melee damage by an attack-strength meter that refills after every swing; by default this condition is true when the hit landed **before** that meter refilled — that is, when the player was spam-clicking.

Type ID: `apoli:attack_charge`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `<=` | How the charge is compared to `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.9` | The charge to compare against, from `0.0` (just swung) to `1.0` (fully recharged). |

`0.9` is the same threshold vanilla uses to decide whether a hit gets a critical or a sweep attack, so the defaults match Minecraft's own idea of "not a full-strength hit".

## Examples

Punish click-spamming — halve the damage of any hit thrown before the meter refilled:

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

Reward patience instead — `inverted` flips it to "this was a properly timed hit":

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

> The condition is only true for **player melee attacks**. Projectiles, fall damage, mob attacks and damage dealt by other powers never record a charge, so the condition is `false` for all of them — and therefore `true` for all of them when `inverted` is set. If you mean "a properly timed melee hit", combine the inverted form with a check that the damage came from a player, such as [apoli:attacker](/docs/datapack/damage-conditions/attacker).

There is an [entity condition with the same id](/docs/datapack/entity-conditions/attack_charge) that reads the player's *current* charge outside of a damage event, for HUD or tick-driven powers.
