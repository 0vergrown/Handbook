---
title: Macros
description: Write a piece of power JSON once and reuse it with arguments. Macros expand while the data pack loads, so they cost nothing in game.
---

A macro is a named piece of JSON that you write once and insert into any power file by calling it. Apoli expands every call while the data pack loads, so the power that reaches the game is exactly what you would have written out by hand, and a macro costs nothing while the game runs.

Type ID: `apoli:macro`

Macros help when several powers share a shape and differ in a few values: ten abilities that play the same particles and sound, a family of resources with the same `hud_render`, or a damage action that only changes its amount.

## Defining a macro

A macro is a file in your `powers` folder with `"type": "apoli:macro"`. Its ID is the file's ID, so `data/example/powers/macros/burst.json` defines `example:macros/burst`. A macro is only a template. It never loads as a power and can't be granted.

```json
{
    "type": "apoli:macro",
    "value": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "apoli:spawn_particles",
                "particle": "minecraft:flame",
                "count": "[count]",
                "spread": { "x": 0.4, "y": 0.6, "z": 0.4 }
            },
            {
                "type": "apoli:play_sound",
                "sound": "minecraft:entity.blaze.shoot"
            }
        ]
    }
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | Any JSON | _required_ | What a call is replaced with: an object, a list, a string or a number. Write `[name]` wherever an argument goes. |
| `parameters` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | _inferred_ | The argument names `value` uses. Leave it out and they are read from the `[name]` placeholders in `value`. |

Any other field on a definition is ignored with a warning, including `load_condition`. Put the `load_condition` on the powers that call the macro instead.

A macro can also be an entry of an [`apoli:multiple`](/docs/datapack/powers/multiple). The key names it the way it would name a sub-power, so a `helper` entry in `example:kit` defines `example:kit_helper`. It is taken out of the bundle and never becomes a sub-power.

## Calling a macro

Anywhere a power file has a JSON object, such as an action, a condition, a `hud_render`, a sub-power or the whole file, you can write a call instead:

```json
{
    "type": "apoli:action_on_key_press",
    "key": "key.origins.primary_active",
    "entity_action": {
        "type": "apoli:macro",
        "macro": "example:macros/burst",
        "arguments": { "count": 12 }
    }
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `macro` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The macro to insert. |
| `arguments` | [Object](/docs/datapack/data-types/object) | `{}` | One entry per parameter. A value can be any JSON, including another macro call. |

The call object is replaced by the macro's `value` with every placeholder filled in. Nothing written next to `macro` and `arguments` survives, so any other field on a call is dropped with a warning.

A whole power can be a call. This file is a complete power once the macro expands:

```json
{
    "type": "apoli:macro",
    "macro": "example:macros/mana_pool",
    "arguments": { "size": 40, "bar": 3 }
}
```

## Placeholders

A placeholder is a parameter name in square brackets. Names use letters, digits, `_`, `-` and `.`, and start with a letter or `_`.

- A string that is exactly a placeholder, like `"count": "[count]"`, becomes the argument itself, so a number stays a number and an object stays an object.
- A placeholder inside a longer string is inserted as text: `"command": "say [who] arrived"`. Numbers are written without a trailing `.0`, and booleans as `true` or `false`.
- Anything else in square brackets is plain text. Target selectors (`@e[distance=..5]`), JSON text (`["", {"text": "x"}]`), NBT paths and table reads (`example:table[0]`) are left alone.
- With `parameters` written out, only those names are placeholders and every other `[...]` stays as written, so `"parameters": []` makes the whole `value` literal. Each listed name must appear in `value`.

A call has to pass every parameter. An argument the macro does not declare is ignored with a warning, which is how a misspelt argument name shows up.

## Macros that call macros

A macro's `value` may call other macros, and a call's `arguments` may contain calls. Arguments are expanded first, so a macro can be handed its own output:

```json
{
    "type": "apoli:macro",
    "macro": "example:macros/twice",
    "arguments": {
        "action": {
            "type": "apoli:macro",
            "macro": "example:macros/twice",
            "arguments": { "action": { "type": "apoli:heal", "amount": 1 } }
        }
    }
}
```

A macro that ends up calling itself is an error, and so is nesting deeper than 32 macros. One power file may expand to at most 250,000 values. Past that it is not loaded, because a chain of macros that each call the next one twice doubles in size at every level.

## `*` inside macros

`*` stands for "the file this is written in", as it does everywhere else (see [Identifier](/docs/datapack/data-types/identifier#3--means-the-file-i-am-written-in)), with one difference:

- In a call's `macro` field, `*` is the file the call is written in. Inside a macro's `value` that is the macro's own file, so a macro can call its neighbours as `*:helper`. For a macro inside `apoli:multiple` it is the bundle, so `*:*_other` names a sibling macro.
- Every other `*` in a macro's `value` is left alone until the call expands, and then means the power the call ended up in, as if you had typed the JSON there. A macro can refer to "this power's resource" with `*:*_mana`.

## When something is wrong

Every problem is logged with the power, where the call sits in the file and the chain of macros it went through:

```
[Apoli] Macro error in example:fire_punch at entity_action.actions[1]: macro example:macros/burst needs the argument [count]
```

A call that fails stays in the file as written, so the field it sits in fails like any unknown type: an optional field is dropped with a warning and the rest of the power loads. With [dev mode](/docs/datapack/commands/dev-mode) on, the same lines appear in chat, along with a count of macros defined and calls expanded, whenever you turn dev mode on and after every `/reload`.

> [!NOTE]
> Macros expand in power files, in `data/<namespace>/powers`. Origin, layer, global power and skill tree files do not read them.

> [!TIP]
> [`apoli:function`](/docs/datapack/powers/function) is the runtime counterpart: a real power that runs as an entity action and is built the first time it is called. A macro is plain JSON reuse, works in any position and is gone before the game starts.
