---
title: "Action On Mouse Movement (Power Type)"
description: "Runs an entity action when the player moves their mouse, optionally only in chosen directions."
navigation_title: "Action On Mouse Movement"
---

Runs an entity action when the player with the power moves their mouse. It can be limited to chosen directions, and it can still fire when [apoli:modify_cursor_speed](/docs/datapack/powers/modify_cursor_speed) has stopped the movement from turning the player.

Type ID: `apoli:action_on_mouse_movement`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action](/docs/datapack/entity-actions) | _required_ | Runs on the player when the mouse moves. |
| `up` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view up. |
| `down` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view down. |
| `left` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view left. |
| `right` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view right. |
| `threshold` | [Float](/docs/datapack/data-types/float) | `0` | How many degrees the view has to move in an enabled direction within one tick before the action fires. Raise it so a resting hand doesn't trigger anything. |
| `ignore_modify_cursor_speed` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Reads the raw mouse movement instead of how far the player turned after any cursor speed change. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks before the action can fire again. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | not rendered | How the cooldown is drawn on the HUD. |

With all four directions left `false`, any movement fires the action. Set one or more and only movement along those axes counts. `up` and `left` together fire on up-left, up-right and down-left movement, because each enabled direction is tested on its own.

Movement is added up over each tick and measured in degrees of view rotation, the same unit `threshold` uses. The action runs at most once per tick for each power.

## Reading how far the mouse moved

Two [expression](/docs/datapack/data-types/expression) variables are set while the action runs:

| Variable | Meaning |
| --- | --- |
| `mouse_x` | Degrees moved horizontally this tick. Positive is right and negative is left. |
| `mouse_y` | Degrees moved vertically this tick. Positive is down and negative is up. |

## `ignore_modify_cursor_speed`

`apoli:modify_cursor_speed` scales mouse input before it turns the player, and a multiplier of `0` freezes their view completely. By default this power sees the result, so at speed `0` it never fires, because nothing moved.

Set `ignore_modify_cursor_speed: true` and the power reads the movement the mouse made, before any cursor speed change. Combine a `modify_cursor_speed` of `0` with this power and the view stays locked while flicking the mouse still does something, so the mouse works as a gesture control instead of a camera.

> [!NOTE]
> Mouse movement is client input, so the power only fires for players.

## Examples

```json
{
    "type": "apoli:action_on_mouse_movement",
    "left": true,
    "right": true,
    "threshold": 25,
    "cooldown": 10,
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "playsound minecraft:entity.player.attack.sweep master @s"
    }
}
```

A fast sideways flick plays a sweep sound. Small aiming movements stay below the threshold and do nothing.

```json
{
    "type": "apoli:action_on_mouse_movement",
    "up": true,
    "threshold": 10,
    "ignore_modify_cursor_speed": true,
    "entity_action": {
        "type": "apoli:add_velocity",
        "y": "mouse_y / -40",
        "space": "world"
    },
    "condition": {
        "type": "apoli:power_active",
        "power": "example:hover"
    }
}
```

While the player is hovering, with their view frozen by a `modify_cursor_speed` of `0`, pulling the mouse up lifts them, and the harder they pull, the faster they rise.
