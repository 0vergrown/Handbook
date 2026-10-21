---
title: "Source (Damage Condition Type)"
description: "Checks which power dealt the damage, and where that power came from."
navigation_title: "Source"
---

Checks whether the damage was dealt by an Apoli power, and optionally which power it was and which source granted it. With no fields set, it matches any damage a power caused, and nothing a sword, a fall or a creeper did.

Type ID: `apoli:source`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The power that dealt the damage. Leave it out to match any power. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A source the power was granted from, such as an origin layer, a skill tree, a global power set or anything else that grants powers. Leave it out to match any source. |

## What counts as a source

Every power a holder has is filed under the source that granted it. That is what [`/apoli:power has <targets>`](/docs/datapack/commands/power) prints next to each power, and what the `source` field of the [apoli:power](/docs/datapack/entity-conditions/power) entity condition matches. Origins files its powers under `<namespace>:layer/<layer>`, so `"source": "origins:layer/origin"` means anything the player's origin gave them.

The power is tracked through delayed and nested actions, so a hit from an [apoli:delay](/docs/datapack/meta-actions/delay) chain or a projectile's `bientity_action_on_hit` still names the power that started it.

## Examples

Take no damage from anything a power did:

```json
{
  "type": "apoli:source"
}
```

Immune to one specific move:

```json
{
  "type": "apoli:source",
  "power": "example:fire_breath"
}
```

Everything an origin's powers do is halved, while ordinary weapons hurt normally:

```json
{
  "type": "apoli:modify_damage_taken",
  "modifier": {
    "operation": "multiply_total",
    "value": -0.5
  },
  "damage_condition": {
    "type": "apoli:source",
    "source": "origins:layer/origin"
  }
}
```

Ordinary damage only, from weapons, fire or falling, but nothing a power caused:

```json
{
  "type": "apoli:source",
  "inverted": true
}
```

## Notes

- To ask whether a hit was melee or a projectile, use [apoli:type](/docs/datapack/damage-conditions/type), [apoli:projectile](/docs/datapack/damage-conditions/projectile) or [apoli:in_tag](/docs/datapack/damage-conditions/in_tag). This condition answers a different question.
- To ask whether the attacker had a given origin, wrap an entity condition in [apoli:attacker](/docs/datapack/damage-conditions/attacker) instead. `source` matches how the power was granted, not who the attacker is.
- Damage is tracked from the first data pack load that includes this condition onwards, and only on the server.
