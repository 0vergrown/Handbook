---
title: "Action On Mouse Movement (Power Type)"
description: "Executes an entity action when the holder moves their mouse, optionally only in chosen directions."
navigation_title: "Action On Mouse Movement"
---

Executes an entity action when the holder moves their mouse — optionally only when they move it in a chosen direction, and optionally even when [apoli:modify_cursor_speed](/docs/datapack/powers/modify_cursor_speed) has stopped that movement from turning them.

Type ID: `apoli:action_on_mouse_movement`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | Entity Action | — | Run on the holder when the mouse moves. |
| `up` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view up. |
| `down` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view down. |
| `left` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view left. |
| `right` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Fire when the mouse moves the view right. |
| `threshold` | [Float](/docs/datapack/data-types/float) | `0` | Degrees the view must move in an enabled direction within one tick before the action fires. Raise it so a resting hand doesn't trigger anything. |
| `ignore_modify_cursor_speed` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Read the raw mouse movement instead of what actually turned the holder. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks before the action can fire again. |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | not rendered | How the cooldown is drawn on the HUD. |

**Leave all four directions `false` and any movement fires it.** Set one or more and only movement along those axes counts — `up` and `left` together fire on up-left, up-right *and* down-left, because each enabled direction is tested on its own.

Movement is accumulated per tick and measured in **degrees of view rotation**, the same units `threshold` uses. The action runs at most once per tick per power.

## Reading how far the mouse moved

Two [expression](/docs/datapack/data-types/expression) variables are bound while the action runs:

| Variable | Meaning |
| --- | --- |
| `mouse_x` | Degrees moved horizontally this tick. Positive is right, negative is left. |
| `mouse_y` | Degrees moved vertically this tick. Positive is down, negative is up. |

## `ignore_modify_cursor_speed`

`apoli:modify_cursor_speed` scales mouse input before it turns the player, and a multiplier of `0` freezes their view completely. By default this power sees the *result* — so at speed `0` it never fires, because nothing moved.

Set `ignore_modify_cursor_speed: true` and it reads the movement the mouse actually made instead. That is what makes "your view is locked, but flicking the mouse still does something" possible: pair a `modify_cursor_speed` of `0` with this power and the mouse becomes a gesture control rather than a camera.

> This is client input, so it only fires for players.

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

A fast horizontal flick swings something; small aiming adjustments are below the threshold and do nothing.

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

While hovering — with the view frozen by a `modify_cursor_speed` of `0` — pulling the mouse up lifts the player, faster the harder they pull.
