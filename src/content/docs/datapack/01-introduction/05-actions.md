---
title: Actions
description: What actions are, what fires them, and the kinds they come in.
---

An action is something that happens: healing an entity, applying an effect, playing a sound, spawning a particle. Actions never run on their own. Something fires them, usually a power such as [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), or a meta-action running them from inside another action.

## The shape of an action

Like a power, an action is an object with a `type`:

```json
{
  "type": "apoli:heal",
  "amount": 4
}
```

## Kinds of action

An action always acts on something, and what it acts on decides its kind. A field only accepts the kind of action it is typed for.

| Kind | Acts on | Examples |
|------|---------|----------|
| [Entity](/docs/datapack/entity-actions) | one entity | `apoli:heal`, `apoli:apply_effect` |
| [Bi-entity](/docs/datapack/bientity-actions) | a pair of entities, an actor and a target | `apoli:add_velocity`, `apoli:damage` |
| [Block](/docs/datapack/block-actions) | a block position | `apoli:set_block`, `apoli:explode` |
| [Item](/docs/datapack/item-actions) | an item stack | `apoli:modify`, `apoli:consume` |
| [Meta](/docs/datapack/meta-actions) | other actions | `apoli:if_else`, `apoli:and`, `apoli:random_chance` |

So `apoli:action_on_hit` has a `bientity_action` field for the attacker and the victim, while `apoli:action_over_time` has an `entity_action` field for the entity with the power.

## Meta-actions

Meta-actions run other actions. They branch, loop and combine actions without any code.

```json
{
  "type":"apoli:if_else",
  "condition":{
    "type":"apoli:on_fire"
  },
  "if_action":{
    "type":"apoli:extinguish"
  },
  "else_action":{
    "type":"apoli:apply_effect",
    "effect":{
      "effect":"minecraft:glowing",
      "duration":40
    }
  }
}
```

Common meta-actions:

- `apoli:and` runs a list of actions in order.
- `apoli:if_else` and `apoli:if_else_list` branch on a [condition](/docs/datapack/introduction/conditions).
- `apoli:chance` runs an action with some probability.
- `apoli:choice` picks one action from a list, and `apoli:nothing` does nothing. `apoli:nothing` is a meta type, so it also works as a condition and as a power.
- `apoli:delay` runs an action after a number of ticks.

## Running an action from a power

Most actions run because a power fires them. For example, `apoli:action_on_hit` runs a bi-entity action whenever the entity hits something:

```json
{
  "type":"apoli:action_on_hit",
  "bientity_action":{
    "type":"apoli:add_velocity",
    "space":"world",
    "y":0.6
  }
}
```
