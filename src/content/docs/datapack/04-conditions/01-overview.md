---
title: Conditions
description: Yes/no tests that gate powers and actions.
---

A **condition** is a test that answers *true* or *false*. Conditions are how Apoli asks questions about the world: are you sneaking? is it raining? is your health below half? They gate powers, branch [meta-actions](/docs/datapack/actions/meta-actions), and filter targets.

## The shape of a condition

The familiar typed object:

```json
{ "type": "apoli:sneaking" }
```

Conditions never *do* anything — they only report. Something else decides what to do with the answer.

## Where conditions are used

- **On a power** — the shared `condition` field makes a power active only while the test passes.
- **In a meta-action** — `apoli:if_else` and friends branch on a condition.
- **In an action power** — many, like `apoli:action_on_hit`, take a `condition` that must hold for the action to fire.
- **Inside other conditions** — meta-conditions combine several tests.

## Flavours

Like actions, conditions come typed by what they examine:

| Flavour | Tests | Example |
| --- | --- | --- |
| **Entity** | one entity | `apoli:sneaking`, `apoli:health` |
| **Bi-entity** | a pair | `apoli:attacker`, `apoli:undirected` |
| **Block** | a block | `apoli:block_state`, `apoli:in_tag` |
| **Item** | an item stack | `apoli:enchantment`, `apoli:food` |
| **Damage** | a damage source | `apoli:type`, `apoli:fire` |
| **Biome / Fluid** | surroundings | `apoli:temperature`, `apoli:fluid` |

## Inverting

Add `"inverted": true` to flip any condition. There is no `not_sneaking` — you invert `sneaking`:

```json
{ "type": "apoli:sneaking", "inverted": true }
```

## Combining — the meta-conditions

To test several things at once, wrap them:

```json
{
  "type": "apoli:and",
  "conditions": [
    { "type": "apoli:sneaking" },
    { "type": "apoli:on_fire", "inverted": true }
  ]
}
```

| Meta-condition | Passes when… |
| --- | --- |
| `apoli:and` / `apoli:all_of` | **every** listed condition passes |
| `apoli:or` / `apoli:any_of` | **any** listed condition passes |
| `apoli:constant` | always the value you give it (`true`/`false`) |

Nest these freely — an `apoli:or` of two `apoli:and`s is fine.

## Next

- [Entity conditions](/docs/datapack/conditions/entity-conditions) — the common tests.
- [Meta-actions](/docs/datapack/actions/meta-actions) — where conditions do their branching.
