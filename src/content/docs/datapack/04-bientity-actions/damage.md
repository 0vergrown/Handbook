---
title: "Damage (Bi-Entity Action Type)"
description: "Damages the target as if the actor had attacked it."
navigation_title: "Damage"
---

Damages the target entity as if the actor had attacked it.

Type ID: `apoli:damage`

> [!WARNING]
> `amount` is optional, and leaving it out deals damage equal to the target's max health. That is deliberate, because it lets you deal a fraction of max health by giving only `modifier` or `modifiers`. It also means a misspelled or unknown field name silently becomes a one-shot, because unknown keys are ignored. If a power always deals exactly the target's max health, check the spelling of `amount` first.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | How much damage to deal. `damage` is accepted as a legacy name. Left out, the target's max health is the base value for the modifiers. |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The damage type, which decides part of the death message and, through damage type tags, whether the damage bypasses armor, shields and so on. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A modifier applied to the damage the target takes. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the damage the target takes. |

## Examples

```json
"bientity_action": {
    "type": "apoli:damage",
    "amount": 10,
    "damage_type": "minecraft:cramming"
}
```

This deals 5 hearts of `cramming` damage to the target as if the actor had hit it. If it kills the target, the death message reads "`<targetName>` was squashed by `<actorName>`", with the names of the target and the actor.

```json
"bientity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:generic",
    "modifier": {
        "operation": "multiply_total_multiplicative",
        "value": -0.75
    }
}
```

This deals 25% of the target's max health as `generic` damage. With a max health of 20, that is 5 damage, or 2.5 hearts (`20 * 0.25 = 5`).

```json
"bientity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:magic",
    "modifier": {
        "operation": "set_total",
        "resource": "example:magic_damage",
        "value": 0
    }
}
```

This deals `minecraft:magic` damage to the target, with the amount taken from the actor's `example:magic_damage` power (`data/example/powers/magic_damage.json`).

## Who gets the credit

When the actor is a projectile, or a [minion](/docs/datapack/entity-actions/summon_minion) or [clone](/docs/datapack/commands/clone) summoned by Apoli, the damage is credited to its owner. The owner counts as the attacker: the victim fights back against them, a kill drops experience and player-only loot, and the death message names them. The projectile or summon stays the direct source, so a damage condition that looks at the projectile still sees it. An actor with no owner takes the credit itself.

That makes the `bientity_action_on_hit` of a projectile, whose actor is the projectile, hit as its shooter:

```json
"bientity_action_on_hit": {
    "type": "apoli:damage",
    "amount": 6,
    "damage_type": "minecraft:magic"
}
```

## Which entity the expression reads

`amount` is an [expression](/docs/datapack/data-types/expression), and in this bi-entity action a bare variable reads the actor, the entity whose power fired the action, and not the entity taking the damage. Add the `target_` prefix to read the victim:

```json
"bientity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:player_attack",
    "amount": "5 + ((max_health - health) * 0.35)"
}
```

That deals more damage the more health the actor is missing. `"5 + ((target_max_health - target_health) * 0.35)"` would scale off the victim instead.
