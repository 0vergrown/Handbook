---
title: "Set On Fire (Entity Action Type)"
description: "Sets the entity on fire for a number of seconds."
navigation_title: "Set On Fire"
---

Sets the entity on fire for a number of seconds.

Type ID: `apoli:set_on_fire`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How many seconds the entity burns for. |

## Examples

```json
"entity_action": {
    "type": "apoli:set_on_fire",
    "duration": 5
}
```

This sets the entity on fire for 5 seconds.
