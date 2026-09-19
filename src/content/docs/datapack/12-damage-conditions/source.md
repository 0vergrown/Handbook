---
title: "Source (Damage Condition Type)"
description: "Checks which power dealt the damage, and where that power came from."
navigation_title: "Source"
---

Checks whether this damage was dealt by an Apoli power, and optionally which power it was and which source granted it. With no fields set it matches any damage a power caused, and nothing a sword, a fall or a creeper did.

Type ID: `apoli:source`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The power that dealt the damage. Omit it to match any power. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A source the power was granted from — an origin layer, a skill tree, a global power set or whatever granted it. Omit it to match any source. |

## What counts as a source

Every power a holder has is filed under the source that granted it, which is what `/apoli:power sources` prints and what the [apoli:power](/docs/datapack/entity-conditions/power) entity condition's own `source` field matches. Origins files its powers under `<namespace>:layer/<layer>`, so `"source": "origins:layer/origin"` means "anything the player's origin gave them".

Attribution follows the power through delayed and nested actions, so a hit from an [apoli:delay](/docs/datapack/meta-actions/delay) chain or a projectile's `bientity_action_on_hit` still names the power that started it.

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

Mundane damage only — weapons, fire, falling, but nothing a power caused:

```json
{
  "type": "apoli:source",
  "inverted": true
}
```

## Notes

- For "was this a melee hit" or "was this a projectile", use [apoli:type](/docs/datapack/damage-conditions/type), [apoli:projectile](/docs/datapack/damage-conditions/projectile) or [apoli:in_tag](/docs/datapack/damage-conditions/in_tag) — this condition answers a different question.
- For "did the attacker have origin X", wrap an entity condition in [apoli:attacker](/docs/datapack/damage-conditions/attacker) instead; `source` matches how the *power* was granted, not who the attacker is.
- Attribution is tracked from the first data pack that loads this condition onwards, and only on the server.
