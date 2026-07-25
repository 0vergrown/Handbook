---
title: Actions
description: Things that happen — how actions work and the types they come in.
---

An **action** is a thing that *happens*: heal an entity, apply an effect, play a sound, spawn a particle. Actions never run on their own — something *fires* them. That trigger might be a power (`apoli:action_on_hit`), a meta-action, or a command.

## The shape of an action

Like powers, an action is an object with a `type`:

```json
{
  "type": "apoli:heal",
  "amount": 4
}
```

## Actions come in flavours

An action always acts on *something*. That "something" decides which flavour of action it is — and a field only accepts the flavour it's typed for.

| Flavour | Acts on | Example |
| --- | --- | --- |
| **Entity** | one entity | `apoli:heal`, `apoli:apply_effect` |
| **Bi-entity** | a pair (actor → target) | `apoli:add_velocity`, `apoli:damage` |
| **Block** | a block position | `apoli:set_block`, `apoli:explode` |
| **Item** | an item stack | `apoli:modify_item`, `apoli:consume` |
| **Meta** | *other actions* | `apoli:if_else`, `apoli:and`, `apoli:chance` |

So `apoli:action_on_hit` has a `bientity_action` field (attacker and victim), while `apoli:action_over_time` has an `entity_action` field (just you).

## Meta-actions: actions that run actions

Meta-actions are the glue. They let you branch, loop and combine without any code.

```json
{
  "type": "apoli:if_else",
  "condition": { "type": "apoli:on_fire" },
  "if_action": { "type": "apoli:extinguish" },
  "else_action": { "type": "apoli:apply_effect",
    "effect": { "effect": "minecraft:glowing", "duration": 40 } }
}
```

Common meta-actions:

- `apoli:and` — run a list of actions in order.
- `apoli:if_else` / `apoli:if_else_list` — branch on a [condition](/docs/datapack/conditions/overview).
- `apoli:chance` — run an action with some probability.
- `apoli:choice` / `apoli:nothing` — pick one, or do nothing.
- `apoli:delay` — run an action after a number of ticks.

## Firing an action from a power

Most actions reach the game through an *action power*. For example, `apoli:action_on_hit` fires a bi-entity action whenever you hit something:

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": {
    "type": "apoli:add_velocity",
    "velocity": { "x": 0, "y": 0.6, "z": 0 }
  }
}
```

## Next

- [Entity actions](/docs/datapack/actions/entity-actions) — the most common flavour.
- [Conditions](/docs/datapack/conditions/overview) — the tests actions branch on.
