---
title: "Action On Scroll Wheel (Power Type)"
description: "Runs an entity action when the player scrolls the mouse wheel."
navigation_title: "Action On Scroll Wheel"
aliases: ["action_on_scroll"]
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the player with the power scrolls the mouse wheel, optionally after a number of notches in one direction.

Type ID: `apoli:action_on_scroll_wheel`

Aliases: `apoli:action_on_scroll`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | | The action to run on the player. |
| `direction` | [String](/docs/datapack/data-types/string) | `any` | The way the wheel has to turn: `up`, `down` or `any`. |
| `scroll_amount` | [Integer](/docs/datapack/data-types/integer) | `1` | How many notches are needed before the action runs. |
| `within_ticks` | [Integer](/docs/datapack/data-types/integer) | `10` | How long a partial count lasts without another notch. `0` never expires. |
| `reset_on_direction_change` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `direction: "any"`, scrolling the other way restarts the count instead of adding to it. |
| `prevent_hotbar_change` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Swallows the scroll so the selected hotbar slot doesn't move. |
| `cooldown` | [Expression](/docs/datapack/data-types/expression) | `0` | Ticks before the power can fire again. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | not rendered | Draws the cooldown as a resource bar. |

`scroll_amount` counts notches, not scroll events with a size. One click of a normal wheel is one notch in either direction. With `scroll_amount: 3` and `within_ticks: 10`, the player has half a second to get three clicks in, and a fourth click starts a new count.

> [!NOTE]
> `prevent_hotbar_change` only holds while the power is active, and it is evaluated on the player's own client. It swallows the scroll in the world, not in menus, so scrolling a chest or a Creative tab works as usual.

## Examples

Scroll in either direction to cycle an ability, without the hotbar moving:

```json
{
  "type": "apoli:action_on_scroll_wheel",
  "prevent_hotbar_change": true,
  "entity_action": {
    "type": "apoli:change_resource",
    "resource": "example:selected_ability",
    "change": 1,
    "operation": "add"
  }
}
```

Three quick flicks upward to launch:

```json
{
  "type": "apoli:action_on_scroll_wheel",
  "direction": "up",
  "scroll_amount": 3,
  "within_ticks": 8,
  "cooldown": 60,
  "hud_render": {
    "sprite_location": "apoli:textures/gui/resource_bar.png",
    "bar_index": 2
  },
  "entity_action": {
    "type": "apoli:add_velocity",
    "y": 1.2
  }
}
```

## Notes

- Scrolling is client input, so on a player this needs Apoli on the client. Any other entity can still be sent notches with [`/apoli:key scroll`](/docs/datapack/commands/key), which is also how you test the power without scrolling through your hotbar.
- The power's `condition` is checked on the server, so every condition type works, including the ones a client can't answer. The client reports the scroll whenever the player has the power at all.
- `prevent_hotbar_change` is the exception. The client has to decide whether to swallow the scroll before the server hears about it, so it reads the `condition` locally. Base that condition on something the client can see, such as a resource, a toggle or an entity flag, or it won't hold.
