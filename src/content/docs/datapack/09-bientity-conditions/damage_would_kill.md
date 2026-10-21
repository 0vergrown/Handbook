---
title: "Damage Would Kill (Bi-Entity Condition Type)"
description: "Checks whether the actor dealing a given amount of a given damage type would kill the target."
navigation_title: "Damage Would Kill"
---

Simulates the actor hitting the target and checks whether the target would die. The damage source carries the actor, so attacker-side [apoli:modify_damage](/docs/datapack/powers/modify_damage) powers, which way a shield faces and damage types that pierce armour all count. The simulation applies the same reductions the real hit would (invulnerability, shield blocking, the damage cooldown, armour, Resistance, Protection and absorption), and returns `false` if an [apoli:prevent_death](/docs/datapack/powers/prevent_death) power would save the target.

Type ID: `apoli:damage_would_kill`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | The raw damage to simulate, before any reduction. Expressions are evaluated on the actor. |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The damage type to simulate, such as `minecraft:player_attack`. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _none_ | Applied to `amount` before the simulation. |
| `modifiers` | Array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _none_ | The same, for several modifiers. |

The condition is `false` when the target isn't a living entity, and when the target is already dead.

## Examples

An execute that only triggers on the finishing blow:

```json
{
  "type": "apoli:modify_damage_dealt",
  "bientity_condition": {
    "type": "apoli:damage_would_kill",
    "damage_type": "minecraft:player_attack",
    "amount": 7
  },
  "bientity_action": {
    "type": "apoli:add_velocity",
    "y": 0.4
  }
}
```

Mark a target your next swing would kill:

```json
{
  "type": "apoli:entity_glow",
  "bientity_condition": {
    "type": "apoli:damage_would_kill",
    "damage_type": "minecraft:player_attack",
    "amount": 7
  },
  "red": 1.0,
  "green": 0.1,
  "blue": 0.1
}
```

> [!NOTE]
> A render power such as `apoli:entity_glow` evaluates its conditions on the client, where enchantment protection and conditions that only the server knows read as absent, so the prediction there is close but not exact. Anything evaluated on the server (damage, actions, `modify_damage`) gets the full picture.

> [!NOTE]
> The simulation reads the world and never changes it, so no armour is damaged and no action fires. Damage handled by other mods' own pipelines is invisible to it.

The [entity version](/docs/datapack/entity-conditions/damage_would_kill) is the same check without an attacker, for asking whether incoming damage would kill you.
