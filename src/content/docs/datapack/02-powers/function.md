---
title: "Function (Power Type)"
description: "A reusable entity action with arguments that other powers call by ID."
navigation_title: "Function"
---

A named set of actions that other powers call by ID, optionally with arguments. It does nothing on its own. Having this power has no effect until something runs it with [`apoli:run_function`](/docs/datapack/entity-actions/run_function).

Type ID: `apoli:function`

It is the data pack equivalent of an `.mcfunction` with macro arguments: write the behaviour once, and call it from ten powers with different numbers.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action](/docs/datapack/entity-actions) | _required_ | What the function does. It runs on whichever entity called it. |
| `parameters` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | inferred | The argument names the body uses. Leave it out and they are read from the `[name]` placeholders in the body. When it is written out, only these names are placeholders. |

A placeholder is a parameter name in square brackets, such as `[amount]`, written anywhere inside `entity_action`. Names use letters, digits, `_`, `-` and `.`, and start with a letter or `_`. Anything else in square brackets is plain text, so target selectors (`@e[type=minecraft:pig]`), JSON text (`["", {"text": "x"}]`) and table reads (`example:table[0]`) work inside a body. With `parameters` written out, every other `[...]` stays as written, so `"parameters": []` makes the whole body literal. Declaring a parameter the body never uses is a load error.

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

A placeholder that is the whole string is replaced by the value itself, so `"amount": "[amount]"` with `"amount": 3` gives the number `3`, and a field that takes an integer still gets one. A placeholder that is only part of a longer string is inserted as text, with numbers written without a trailing `.0` and booleans as `true` or `false`:

```json
{
    "type": "apoli:function",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "tag @s add form_[name]"
    }
}
```

The argument is substituted before the field is parsed, so it can be anything that field accepts, including an [expression](/docs/datapack/data-types/expression):

```json
{ "type": "apoli:run_function", "function": "example:hurt", "arguments": { "amount": "health / 4" } }
```

## Notes

- A function with no parameters is parsed once when the data pack loads, so calling it costs exactly what the action inside costs. One with parameters is built the first time it is used with each set of arguments and then cached, keeping the 8 most recently used variants. Vanilla handles macro functions the same way. Calling one function with hundreds of different numbers rebuilds it often, so pass an [expression](/docs/datapack/data-types/expression) argument instead of many literal values.
- Recursion is capped at 16 nested calls. Past that the call is dropped and the server logs the function's ID once. A function calling itself isn't a supported way to loop, so use [`apoli:loop`](/docs/datapack/meta-actions/loop) or [`apoli:delay`](/docs/datapack/meta-actions/delay).
- Only `entity_action` is supported. Bi-entity, block and item actions need context that an entity action can't supply, and the meta actions that do have that context can reach them anyway.
- To reuse JSON anywhere else, such as a condition, a `hud_render` or a whole power, use a [macro](/docs/datapack/introduction/macros). Macros follow the same placeholder rules but expand while the data pack loads, so nothing is left to build while the game runs.
