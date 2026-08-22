---
title: "Damage (Bi-Entity Action Type)"
description: "Applies damage to the target entity as if the actor entity has attacked it."
navigation_title: "Damage"
---

Applies damage to the target entity as if the actor entity has attacked it.

Type ID: `apoli:damage`

> **`amount` is optional, and omitting it deals damage equal to the target's max health.** That is intended — it is how you write "damage a fraction of max health" by supplying only `modifier`/`modifiers`. But it also means a **misspelled or unknown field name silently becomes a one-shot**, because unknown keys are ignored. If a power always deals exactly the target's max health, check the spelling of `amount` first.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The amount of damage to deal. Also accepted under the legacy name `damage`. If omitted, the target's max health is used as the base value for the modifier(s).
`damage_type` | [Identifier](/docs/datapack/data-types/identifier) | | Defines the properties of the damage source that will be dealt, such as part of its death message, and whether it can bypass armor, shield, etc. (via damage type tags.)
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If specified, this modifier will be applied to the damage taken by the '**target**' entity.
`modifiers` | [Array](/docs/datapack/data-types/array) of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the damage taken by the '**target**' entity.

## Examples

```json
"bientity_action": {
    "type": "apoli:damage",
    "amount": 10,
    "damage_type": "minecraft:cramming"
}
```

This example will deal 5 hearts of `cramming` damage to the target as if the actor has hit them, and that, if killed, will display a *"`<targetName>` was squashed by `<actorName>`",* where `<targetName>` is the name of the target and `<actorName>` is the name of the actor.

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

This example will deal 25% `generic` damage to the target entity. If the max health of the target entity is 20, this will deal 5 (2 and a half hearts of) `generic` damage (`20 * 0.25 = 5`.)

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

This example will deal `minecraft:magic` damage to the target entity, with its damage value depending on the value of the `example:magic_damage` (`data/example/powers/magic_damage.json`) power from the actor entity.

## Which entity the Expression reads

`amount` is an [Expression](/docs/datapack/data-types/expression), and in this bi-entity action a bare variable reads the **actor** — the entity whose power fired the action — not the entity taking the damage. Prefix with `target_` for the victim:

```json
"bientity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:player_attack",
    "amount": "5 + ((max_health - health) * 0.35)"
}
```

That deals more damage the more health the **actor** is missing. `"5 + ((target_max_health - target_health) * 0.35)"` would scale off the victim instead.

> Before Apoli 1.40.0 the expression was evaluated against the target and there was no way to reach the actor, so an actor-based formula silently collapsed to its constant term. Packs that relied on the old binding need `target_` added.
