---
title: "Toggle (Power Type)"
description: "Provides a state that can be toggled with the specified Key."
navigation_title: "Toggle"
---

Provides a state that can be toggled with the specified Key.

Type ID: `apoli:toggle`

> This power type provides a state that can be toggled with the [Toggle (Entity Action Type)](/docs/datapack/entity-actions/toggle) and check the state of with the [Power Active (Entity Condition Type)](/docs/datapack/entity-conditions/power_active).

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`active_by_default` | Boolean | `true` | Determines whether the state of this power type should be ON by default.
`key` | Key | `{"key": "key.apoli.primary_active"}` | Which active key this power should respond to.
`retain_state` | Boolean | `true` | Determines whether the power remains active even if the specified condition (if any) is no longer met. If set to `true`, the power will stay in its current state regardless of the condition. If set to `false`, the power will deactivate when the condition is not fulfilled.

> **`retain_state` only does anything on a power that has a `condition`.** With `retain_state: false`, the stored state is forced **OFF** the moment the condition stops holding — it is not restored to `active_by_default`, so the holder has to press the key again once the condition is satisfied. Pressing the key while the condition is unmet does nothing, so a toggle guarded by a resource or a cooldown can't be re-armed early.

## Examples

```json
{
    "type": "apoli:toggle",
    "active_by_default": false,
    "key": {
        "key": "key.use"
    }
}
```

This example will provide a switch that is not active by default, and can be toggled with the `key.use` keybind.

```json
{
    "type": "apoli:toggle",
    "active_by_default": true,
    "retain_state": true,
    "key": {
        "key": "key.attack"
    },
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

This example will provide a switch that is active by default and can be toggled via sneaking and pressing the `key.attack` keybind. This example will also retain its state if the entity is no longer sneaking.
