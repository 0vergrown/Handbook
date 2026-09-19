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
`turn_on_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The holder must meet this to switch the toggle **on** with its key. It has no say over switching off.
`turn_off_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The holder must meet this to switch the toggle **off** with its key. It has no say over switching on.

> `turn_on_condition` and `turn_off_condition` gate the **key** only. The [Toggle (Entity Action Type)](/docs/datapack/entity-actions/toggle) flips the state regardless, and `retain_state: false` still forces the toggle off the moment the power's own `condition` stops holding — so a state can always be taken away from the holder even when they could not have let go of it themselves.

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

```json
{
    "type": "apoli:toggle",
    "turn_on_condition": {
        "type": "apoli:sneaking"
    },
    "turn_off_condition": {
        "type": "apoli:sneaking",
        "inverted": true
    },
    "condition": {
        "type": "apoli:on_block"
    }
}
```

This example can only be switched on while sneaking and only switched off while standing, and `condition` keeps it on only while the holder is on a block — step off one and the toggle is forced off no matter which way they are crouching.
