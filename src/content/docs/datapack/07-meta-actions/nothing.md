---
title: "Nothing (Meta Action Type)"
description: Does nothing. Useful as an explicit no-op branch.
navigation_title: "Nothing"
---

Does nothing at all. It exists so you can write "and in this case, nothing happens" explicitly, where leaving a field out would be ambiguous or invalid.

Type ID: `apoli:nothing`

It is a meta type, so it is available wherever an action is: entity, bi-entity, block and item actions all accept it. The matching [`apoli:nothing`](/docs/datapack/meta-conditions/nothing) condition and the [`apoli:simple`](/docs/datapack/powers/simple) power (which also answers to `apoli:nothing`) do the same for condition and power fields.

## Fields

_None._

## Examples

As the `else_action` of a branch, to make it obvious the other case was considered rather than forgotten:

```json
{
  "type": "apoli:if_else",
  "condition": { "type": "apoli:sneaking" },
  "if_action": { "type": "apoli:add_velocity", "y": 1.0 },
  "else_action": { "type": "apoli:nothing" }
}
```

As the `fail_action` of an [`apoli:random_chance`](/docs/datapack/meta-actions/random_chance), where the field is optional but writing it makes the odds read clearly:

```json
{
  "type": "apoli:random_chance",
  "chance": 0.1,
  "action": { "type": "apoli:apply_effect", "effect": { "effect": "minecraft:levitation", "duration": 60 } },
  "fail_action": { "type": "apoli:nothing" }
}
```

The same type in a bi-entity field:

```json
"bientity_action": {
  "type": "apoli:if_else",
  "condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  },
  "if_action": { "type": "apoli:damage", "amount": 6, "damage_type": "minecraft:magic" },
  "else_action": { "type": "apoli:nothing" }
}
```

It is also the simplest placeholder while you build a power up — a required action field has to be *something*.
