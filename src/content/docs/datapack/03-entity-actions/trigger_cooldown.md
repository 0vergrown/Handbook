---
title: "Trigger Cooldown (Entity Action Type)"
description: "Starts a power's cooldown, as if the power had just been used."
navigation_title: "Trigger Cooldown"
---

Starts a power's cooldown as if the power had just been used, so it can't fire again until the cooldown runs out. It works on every power that has a cooldown, not only [apoli:cooldown](/docs/datapack/powers/cooldown).

Type ID: `apoli:trigger_cooldown`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](/docs/datapack/data-types/identifier) | | The power whose cooldown to start. (The legacy field `resource` is still accepted as an alias.) |

## Which powers

Any power type with a `cooldown`: [apoli:cooldown](/docs/datapack/powers/cooldown), [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press) (`active_self`), [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence), [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit), [apoli:action_on_kill](/docs/datapack/powers/action_on_kill), [apoli:action_on_collision](/docs/datapack/powers/action_on_collision), [apoli:action_on_mouse_movement](/docs/datapack/powers/action_on_mouse_movement), [apoli:action_on_scroll_wheel](/docs/datapack/powers/action_on_scroll_wheel) and [apoli:game_event_listener](/docs/datapack/powers/game_event_listener). A power without a cooldown is left alone.

## Behaviour

- If the cooldown is ready (`0`), it is set to the power's full `cooldown` and starts counting down, and the power's HUD bar shows it straight away.
- If the cooldown is already running, this action does nothing — the countdown carries on from where it is.
- To set a cooldown to an exact number of ticks regardless, use [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) with `operation: set_base`.

## Example

Two abilities that share a cooldown — using the dash also puts `example:blink` on cooldown, and `example:blink` does the same to the dash:

```json
{
    "type": "apoli:active_self",
    "key": "key.apoli.primary_active",
    "cooldown": 100,
    "hud_render": {
        "should_render": true
    },
    "entity_action": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "apoli:trigger_cooldown",
                "power": "example:blink"
            },
            {
                "type": "apoli:add_velocity",
                "z": 1.5,
                "space": "local"
            }
        ]
    }
}
```
