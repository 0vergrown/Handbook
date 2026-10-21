---
title: Conditions
description: Yes or no tests that powers and actions check.
---

A condition is a test that answers true or false. Apoli uses conditions to ask about the world, for example whether the entity is sneaking, whether it is raining or whether its health is below half. Powers use them to switch on and off, meta-actions branch on them, and actions use them to filter targets.

## The shape of a condition

A condition is a typed object like everything else:

```json
{ "type": "apoli:sneaking" }
```

A condition only reports a result. Whatever checks it decides what to do with the answer.

## Where conditions are used

- A power's shared `condition` field makes the power active only while the test passes.
- `apoli:if_else` and the other branching [meta-actions](/docs/datapack/meta-actions) pick an action based on a condition.
- Many action powers, like `apoli:action_on_hit`, take a `condition` that must hold before the action fires.
- Meta-conditions combine several conditions into one.

## Kinds of condition

Like actions, conditions have kinds based on what they test:

| Kind | Tests | Examples |
| --- | --- | --- |
| [Entity](/docs/datapack/entity-conditions) | one entity | `apoli:sneaking`, `apoli:health` |
| [Bi-entity](/docs/datapack/bientity-conditions) | a pair of entities | `apoli:attacker`, `apoli:undirected` |
| [Block](/docs/datapack/block-conditions) | a block | `apoli:block_state`, `apoli:in_tag` |
| [Item](/docs/datapack/item-conditions) | an item stack | `apoli:enchantment`, `apoli:food` |
| [Damage](/docs/datapack/damage-conditions) | a damage source | `apoli:type`, `apoli:amount` |
| [Biome](/docs/datapack/biome-conditions) | a biome | `apoli:temperature`, `apoli:precipitation` |
| [Fluid](/docs/datapack/fluid-conditions) | a fluid state | `apoli:still`, `apoli:empty` |
| [Meta](/docs/datapack/meta-conditions) | other conditions | `apoli:all_of`, `apoli:any_of` |

## Inverting

Add `"inverted": true` to flip any condition. There is no `not_sneaking` condition, so you invert `sneaking`:

```json
{ "type": "apoli:sneaking", "inverted": true }
```

## Combining conditions

To test several things at once, wrap them in a meta-condition:

```json
{
  "type": "apoli:and",
  "conditions": [
    { "type": "apoli:sneaking" },
    { "type": "apoli:on_fire", "inverted": true }
  ]
}
```

| Meta-condition | Passes when |
| --- | --- |
| `apoli:and` or `apoli:all_of` | every listed condition passes |
| `apoli:or` or `apoli:any_of` | any listed condition passes |
| `apoli:constant` | always returns the value you give it (`true` or `false`) |

Meta-conditions nest, so an `apoli:or` of two `apoli:and` conditions works.

## Next

- [Entity conditions](/docs/datapack/entity-conditions) has the most common tests.
- [Meta-actions](/docs/datapack/meta-actions) branch on conditions.
