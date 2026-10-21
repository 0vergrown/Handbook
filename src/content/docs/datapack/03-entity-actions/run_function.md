---
title: "Run Function (Entity Action Type)"
description: "Runs an apoli:function power by ID, with arguments."
navigation_title: "Run Function"
---

Runs an [`apoli:function`](/docs/datapack/powers/function) power by ID and passes it arguments.

Type ID: `apoli:run_function`

The entity doesn't need to hold the function power. The ID is looked up in the loaded powers, so one function serves every power in the pack.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `function` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The `apoli:function` power to run. |
| `arguments` | [Object](/docs/datapack/data-types/object) | `{}` | One entry per parameter the function declares. A value can be any JSON the target field accepts. |

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

Without arguments:

```json
{
  "type": "apoli:run_function",
  "function": "example:launch"
}
```

## Notes

> [!NOTE]
> The function's own `condition` is checked before it runs, so a function can gate itself for every caller at once.

> [!NOTE]
> A missing power, a power that isn't an `apoli:function`, a missing argument, or going past the cap of 16 nested calls each log a warning once per function ID per data pack load, then do nothing. None of them interrupt the surrounding action list.
