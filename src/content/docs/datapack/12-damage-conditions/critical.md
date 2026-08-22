---
title: "Critical (Damage Condition Type)"
description: "Checks whether the incoming hit is a vanilla critical hit."
navigation_title: "Critical"
---

Checks whether the incoming hit is a vanilla **critical hit** — the falling melee attack that plays the star particles and multiplies the base damage by 1.5.

Type ID: `apoli:critical`

## Fields

None.

## Examples

Bleed on crits — the attacker's crit applies Wither to whatever they hit:

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

> The flag is captured from the attacking player's own critical-hit check, so it is true for exactly the hits vanilla would call critical: a player, falling, not sprinting, not on a ladder, not in water, not blind, not riding, hitting a living entity with a charged swing. Everything else — projectiles (including crit arrows), mob attacks, fall damage, damage dealt by other powers — is `false`.
