---
title: "Damage Would Kill (Entity Condition Type)"
description: "Checks whether taking a given amount of a given damage type right now would kill the entity."
navigation_title: "Damage Would Kill"
---

Simulates a hit against the entity and checks whether it would kill them. The simulation runs the same reductions the real hit would: [apoli:modify_damage](/docs/datapack/powers/modify_damage) and [apoli:modify_projectile_damage](/docs/datapack/powers/modify_projectile_damage), invulnerability, shield blocking, the damage cooldown, armour, Resistance, Protection and absorption — and it returns `false` if an [apoli:prevent_death](/docs/datapack/powers/prevent_death) power would catch the entity.

Type ID: `apoli:damage_would_kill`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | The raw damage to simulate, before any reduction. |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The damage type to simulate, e.g. `minecraft:generic`, `minecraft:fall`. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _none_ | Applied to `amount` before the simulation. |
| `modifiers` | Array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _none_ | Same, for several modifiers. |

The condition is `false` for any entity that is not a living entity, and `false` for an entity that is already dead.

## Examples

A last-stand power that only arms when the next 6 points of magic damage would finish you:

```json
{
  "type": "apoli:overlay",
  "texture": "example:textures/gui/last_stand.png",
  "condition": {
    "type": "apoli:damage_would_kill",
    "damage_type": "minecraft:magic",
    "amount": 6
  }
}
```

Feather-fall reflex — soften your landing only when the fall you are in would actually kill you:

```json
{
  "type": "apoli:modify_falling",
  "velocity": 0.02,
  "condition": {
    "type": "apoli:damage_would_kill",
    "damage_type": "minecraft:fall",
    "amount": "fall_distance - 3"
  }
}
```

> Armour durability, Resistance stats and the modify-damage powers' `bientity_action`/`self_action` are **not** run by the simulation — it reads the world, it never changes it. What it can't see is a mod that hooks the damage pipeline outside Apoli's own handlers.

The [bi-entity version](/docs/datapack/bientity-conditions/damage_would_kill) does the same thing with the actor as the attacker, so armour-piercing and attacker-side `modify_damage` powers are taken into account.
