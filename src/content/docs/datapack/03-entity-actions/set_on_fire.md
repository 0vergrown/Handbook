---
title: "apoli:set_on_fire"
description: "Sets the entity on fire for the specified amount of time in seconds."
---

Sets the entity on fire for the specified amount of time in seconds.

Type ID: `apoli:set_on_fire`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) |  | The amount of seconds the entity should burn.


## Examples

```json
"entity_action": {
    "type": "apoli:set_on_fire",
    "duration": 5
}
```

This example will set the entity on fire for 5 seconds.

