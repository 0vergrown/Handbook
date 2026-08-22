---
title: "Modify Damage (Power Type)"
description: Modifies the damage this entity deals or takes.
navigation_title: "Modify Damage"
aliases: ["modify_damage_dealt", "modify_damage_taken"]
---

Modifies damage. Which side it applies to is decided by `target_used`, and the two aliases exist so you never have to write that field: `apoli:modify_damage_dealt` sets it to `false`, `apoli:modify_damage_taken` sets it to `true`. Use the aliases — they read better.

Type ID: `apoli:modify_damage` (aliases `apoli:modify_damage_dealt`, `apoli:modify_damage_taken`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the damage amount.
`modifiers` | array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order.
`target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` modifies damage the holder **deals**; `true` modifies damage the holder **takes**. Filled in for you by the two aliases.
`damage_condition` | [Damage Condition](/docs/datapack/damage-conditions) | _optional_ | Only apply to damage matching this.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only apply for this attacker/target pairing.

## Examples

Hit 50% harder:

```json
{
  "type": "apoli:modify_damage_dealt",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.5
  }
}
```

Take a quarter less damage from explosions only:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": { "type": "apoli:explosive" },
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": -0.25
  }
}
```

A classic weakness — double damage from a specific source, which is how most origins are balanced:

```json
{
  "type": "apoli:modify_damage_taken",
  "damage_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_fire"
  },
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 1.0
  }
}
```

Only hit undead harder, using the pairing rather than the damage:

```json
{
  "type": "apoli:modify_damage_dealt",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  },
  "modifier": { "operation": "multiply_base_multiplicative", "value": 1.0 }
}
```

> `multiply_base_multiplicative` with `-1.0` reduces the damage to zero, which is a softer way to write immunity than [`apoli:invulnerability`](/docs/datapack/powers/invulnerability) because other powers can still add to it afterwards.
