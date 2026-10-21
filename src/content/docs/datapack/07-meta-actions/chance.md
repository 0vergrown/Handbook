---
title: "Chance (Meta Action Type)"
description: "Runs an action only some of the time, with a given chance."
navigation_title: "Chance"
---

Runs an action only some of the time, with a given chance.

Type ID: `apoli:chance`

## Fields

> [!NOTE]
> `success_action` is accepted as an alias for `action`, which is the name some Apace data uses for the success branch.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | Action type | _required_ | The action that might run. `success_action` is accepted as an alias. |
| `chance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | The chance that the action runs, from 0 to 1, so 0.1 is a 10% chance and 0.95 is a 95% chance. An expression is evaluated on each attempt against the context entity. |
| `fail_action` | Action type | _optional_ | The action to run when `action` doesn't. |

The expression context depends on the kind of action: entity actions use the acting entity, bi-entity actions use the actor, and item actions use the holder. Block actions have no entity, so entity variables read `0`, while world time variables still work.

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

This has a 40% chance to set the entity on fire for 5 seconds.

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

The chance here grows with the entity's XP level, from 10% at level 0 to 40% at level 30.
