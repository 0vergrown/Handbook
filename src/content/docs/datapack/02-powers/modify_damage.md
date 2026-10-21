---
title: "Modify Damage (Power Type)"
description: "Changes the damage the entity deals or takes."
navigation_title: "Modify Damage"
aliases: ["modify_damage_dealt", "modify_damage_taken"]
---

Changes damage. `target_used` decides which side it applies to, and two aliases fill that field in for you: `apoli:modify_damage_dealt` sets it to `false` and `apoli:modify_damage_taken` sets it to `true`. The aliases are easier to read, so use them.

Type ID: `apoli:modify_damage` (aliases `apoli:modify_damage_dealt`, `apoli:modify_damage_taken`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the damage amount. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in operation order. |
| `target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` changes damage the entity deals, and `true` changes damage it takes. The two aliases fill this in. |
| `damage_condition` | [Damage Condition](/docs/datapack/damage-conditions) | _optional_ | Only applies to damage that passes this condition. |
| `bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only applies for this pairing, with the attacker as the actor and the entity taking the damage as the target. It fails when there is no attacker, such as for falling, fire or `/kill`. |
| `target_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Only applies when the entity taking the damage passes this condition. That is the entity being hit when dealing damage, and the entity with the power when taking it. |
| `bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | _optional_ | Runs on the attacker (actor) and the entity taking the damage (target) every time the power applies. It is skipped when there is no attacker. |
| `self_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the entity with the power every time the power applies. |
| `target_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | For damage dealt only (`target_used: false`). Runs on the entity being hit. |
| `attacker_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | For damage taken only (`target_used: true`). Runs on the attacker, when there is one. |
| `apply_armor_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | For damage taken only. Armor only reduces the hit while the entity passes this condition, and when it fails, the hit ignores armor. |
| `damage_armor_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | For damage taken only. Worn armor only loses durability from the hit while the entity passes this condition. |

The actions run once per hit, after the damage is changed, for every one of these powers that applied to the hit.

> [!TIP]
> To see what these powers do to each hit, turn on [dev mode](/docs/datapack/commands/dev-mode). Every hit they change is reported with its damage before and after.

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

Take a quarter less damage, from explosions only:

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

Take double damage from one source, the usual way an origin gets a weakness:

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

Hit undead harder, checking the pair of entities instead of the damage:

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

> [!TIP]
> `multiply_base_multiplicative` with `-1.0` reduces the damage to zero. That is a softer way to write immunity than [`apoli:invulnerability`](/docs/datapack/powers/invulnerability), because other powers can still add damage afterwards.
