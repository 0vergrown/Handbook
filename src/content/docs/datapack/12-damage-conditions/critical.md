---
title: "Critical (Damage Condition Type)"
description: "Checks whether the incoming hit is a vanilla critical hit."
navigation_title: "Critical"
---

Checks whether the incoming hit is a vanilla critical hit, the falling melee attack that shows the star particles and multiplies the base damage by 1.5.

Type ID: `apoli:critical`

## Fields

This condition has no fields.

## Examples

Bleed on crits, where the attacker's crit applies Wither to whatever they hit:

```json
{
  "type": "apoli:modify_damage_dealt",
  "damage_condition": {
    "type": "apoli:critical"
  },
  "target_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:wither",
      "duration": 60
    }
  }
}
```

Armour that only helps against crits:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": {
    "type": "apoli:critical"
  },
  "modifier": {
    "operation": "multiply_total_multiplicative",
    "value": -0.35
  }
}
```

> [!NOTE]
> The flag comes from the attacking player's own critical hit check, so it is true for exactly the hits vanilla calls critical: a player who is falling, not sprinting, not on a ladder, not in water, not blind and not riding, hitting a living entity with a charged swing. Everything else is `false`, including projectiles (even critical arrows), mob attacks, fall damage and damage dealt by other powers.
