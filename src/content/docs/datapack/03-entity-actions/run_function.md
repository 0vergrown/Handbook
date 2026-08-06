---
title: "Run Function (Entity Action Type)"
description: "Runs an apoli:function power by id, with arguments."
navigation_title: "Run Function"
---

Runs an [`apoli:function`](/docs/datapack/powers/function) power by id, passing it arguments.

Type ID: `apoli:run_function`

The entity does **not** need to hold the function power. The id is looked up in the loaded powers, so one function serves every power in the pack.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `function` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The `apoli:function` power to run. |
| `arguments` | [Object](/docs/datapack/data-types/object) | `{}` | One entry per parameter the function declares. Values may be any JSON the target field accepts. |

## Examples

```json
{
  "type": "apoli:run_function",
  "function": "example:hurt",
  "arguments": {
    "amount": 3
  }
}
```

No arguments:

```json
{
  "type": "apoli:run_function",
  "function": "example:launch"
}
```

## Notes

> The function's own `condition` is checked before it runs, so a function can gate itself for every caller at once.

> A missing power, a power that isn't an `apoli:function`, a missing argument, or exceeding the 16-call recursion cap all log a warning **once** per function id per data-pack load, then do nothing. None of them interrupt the surrounding action list.
