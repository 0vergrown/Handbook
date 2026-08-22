---
title: "Difficulty (Entity Condition Type)"
description: Passes when the world difficulty is one of the listed values.
navigation_title: "Difficulty"
---

Passes when the world's difficulty is one of the values you list.

Type ID: `apoli:difficulty`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`difficulty` | [String](/docs/datapack/data-types/string) or array | **required** | One of `peaceful`, `easy`, `normal`, `hard`, or an array of them. An array passes if the current difficulty is any one of them.

## Examples

A single difficulty:

```json
{
  "type": "apoli:difficulty",
  "difficulty": "hard"
}
```

Several at once — here, a curse that only bites above Easy:

```json
{
  "type": "apoli:action_over_time",
  "interval": 40,
  "entity_action": {
    "type": "apoli:damage",
    "amount": 1,
    "damage_type": "minecraft:magic"
  },
  "condition": {
    "type": "apoli:difficulty",
    "difficulty": ["normal", "hard"]
  }
}
```

Pair it with [`apoli:if_else`](/docs/datapack/meta-actions/if_else) to scale a value rather than switch it on and off:

```json
{
  "type": "apoli:if_else",
  "condition": { "type": "apoli:difficulty", "difficulty": "easy" },
  "if_action":   { "type": "apoli:damage", "amount": 1, "damage_type": "minecraft:magic" },
  "else_action": { "type": "apoli:damage", "amount": 3, "damage_type": "minecraft:magic" }
}
```

> There is also a `difficulty` variable in [expressions](/docs/datapack/data-types/expression), reading `0` for peaceful through `3` for hard — so `"amount": "1 + difficulty"` scales without a branch at all.
