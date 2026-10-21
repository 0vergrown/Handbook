---
title: "Toggle (Power Type)"
description: "A state that the player switches on and off with a key."
navigation_title: "Toggle"
---

A state that the player switches on and off with a key.

Type ID: `apoli:toggle`

The [Toggle](/docs/datapack/entity-actions/toggle) entity action also flips the state, and the [Power Active](/docs/datapack/entity-conditions/power_active) entity condition checks it.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `active_by_default` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the toggle starts on. |
| `key` | [Key](/docs/datapack/data-types/key) | `{"key": "key.apoli.primary_active"}` | The active key the power responds to. |
| `retain_state` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the toggle keeps its state when the power's `condition` stops holding. With `true` the state stays as it is, and with `false` the toggle switches off when the condition fails. |
| `turn_on_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The player has to pass this to switch the toggle on with its key. It doesn't affect switching off. |
| `turn_off_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The player has to pass this to switch the toggle off with its key. It doesn't affect switching on. |

> [!NOTE]
> `turn_on_condition` and `turn_off_condition` only apply to the key. The [Toggle](/docs/datapack/entity-actions/toggle) action flips the state regardless, and `retain_state: false` still forces the toggle off as soon as the power's own `condition` stops holding. A state can always be taken away from the player, even when they couldn't have switched it off themselves.

`retain_state` only matters on a power that has a `condition`. With `retain_state: false`, the stored state is forced off as soon as the condition stops holding. It doesn't go back to `active_by_default`, so the player has to press the key again once the condition is met. Pressing the key while the condition is unmet does nothing, so a toggle that depends on a resource or a cooldown can't be switched back on early.

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

A switch that starts off and toggles with the `key.use` keybind.

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

A switch that starts on, and toggles when the player presses the `key.attack` keybind while sneaking. It keeps its state when the player stops sneaking.

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

This toggle can only be switched on while sneaking and only switched off while standing, and `condition` keeps it on only while the player is on a block. Stepping off a block forces the toggle off whether the player is crouching or not.
