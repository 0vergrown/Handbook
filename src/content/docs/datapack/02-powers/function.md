---
title: "Function (Power Type)"
description: "A reusable, parameterised entity action other powers call by id."
navigation_title: "Function"
---

A named bundle of actions that other powers call by id, optionally with arguments. It does nothing on its own — holding this power has no effect until something runs it with [`apoli:run_function`](/docs/datapack/entity-actions/run_function).

Type ID: `apoli:function`

It is the data-pack equivalent of an `.mcfunction` with macro arguments: write the behaviour once, call it from ten powers with different numbers.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](/docs/datapack/entity-actions) | _required_ | What the function does. Runs on whichever entity called it. |
| `parameters` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | inferred | The argument names the body uses. Leave it out and it is read from the `[name]` placeholders in the body. |

A **placeholder** is a parameter name in square brackets — `[amount]` — written anywhere inside `entity_action`. Declaring a parameter the body never uses, or using one that isn't declared, is a load error.

## Examples

A damage function with one argument:

```json
{
    "type": "apoli:function",
    "entity_action": {
        "type": "apoli:damage",
        "amount": "[amount]",
        "damage_type": "minecraft:generic"
    }
}
```

Call it from anywhere:

```json
{
    "type": "apoli:action_on_hit",
    "entity_action": {
        "type": "apoli:run_function",
        "function": "example:hurt",
        "arguments": { "amount": 3 }
    }
}
```

Placeholders substitute by **value**, not by text, so `"amount": "[amount]"` with `"amount": 3` yields the number `3` — an int field stays an int. A placeholder that is only *part* of a larger string is spliced in as text instead:

```json
{
    "type": "apoli:function",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "tag @s add form_[name]"
    }
}
```

Because substitution happens before the field is parsed, an argument can be anything that field accepts — including an [expression](/docs/datapack/data-types/expression):

```json
{ "type": "apoli:run_function", "function": "example:hurt", "arguments": { "amount": "health / 4" } }
```

## Notes

> A function with **no** parameters is parsed once when the data pack loads, so calling it costs exactly what the action inside costs. A parameterised one is built on first use per distinct set of arguments and cached (8 variants, least-recently-used evicted) — the same approach vanilla uses for macro functions. Calling one function with hundreds of different numbers will rebuild it often; prefer an [expression](/docs/datapack/data-types/expression) argument over many literal ones.

> Recursion is capped at 16 nested calls. Past that the call is dropped and the server logs the function's id once. A function that calls itself is a data-pack bug, not a supported loop — use [`apoli:loop`](/docs/datapack/meta-actions/loop) or [`apoli:delay`](/docs/datapack/meta-actions/delay).

> Only `entity_action` is supported. Bi-entity, block and item actions need context an entity action cannot supply, and are reachable anyway through the meta actions that do have it.
