---
title: "apoli:chance"
description: "Executes the provided action only with a specific chance."
---

Executes the provided action only with a specific chance.

Type ID: `apoli:chance`


## Fields

> **ALIAS:** `success_action` is accepted as an alias for `action` (the name some Apace data uses for the success branch).

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Action Type | | The action which might be executed. _Alias: `success_action`._
`chance` | Float or [Expression](/docs/datapack/data-types/expression) | | The chance that the action will execute, from 0 to 1. (E.g. 0.1 means 10% chance, 0.95 means 95% chance). An Expression is evaluated each attempt against the context entity.
`fail_action` | Action Type | _optional_ | The action to execute if the specified action in the `action` field is not executed.

**Expression context:** entity actions use the acting entity; bi-entity actions use the **actor**; item actions use the holder; block actions have no entity (entity variables read `0`, world-time variables still work).

## Examples

```json
"entity_action": {
    "type": "apoli:chance",
    "action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    },
    "chance": 0.4
}
```

This example has a 40% chance to set the entity on fire for 5 seconds.

```json
"entity_action": {
    "type": "apoli:chance",
    "chance": "(xp_level / 100) + 0.1",
    "action": {
        "type": "apoli:heal",
        "amount": 2
    }
}
```

This example's chance scales with the entity's XP level: 10% at level 0, 40% at level 30.

