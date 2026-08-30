---
title: "Action On Scroll Wheel (Power Type)"
description: "Executes an entity action when the holder scrolls the mouse wheel."
navigation_title: "Action On Scroll Wheel"
aliases: ["action_on_scroll"]
---

Executes an [Entity Action](/docs/datapack/entity-actions) when the holder scrolls the mouse wheel, optionally after a given number of notches in one direction.

Type ID: `apoli:action_on_scroll_wheel`

Aliases: `apoli:action_on_scroll`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | | The action to run on the holder. |
| `direction` | String | `any` | Which way the wheel has to turn: `up`, `down` or `any`. |
| `scroll_amount` | Integer | `1` | How many notches are needed before the action runs. |
| `within_ticks` | Integer | `10` | How long a partial count survives without another notch. `0` never expires. |
| `reset_on_direction_change` | Boolean | `true` | With `direction: "any"`, scrolling the other way restarts the count instead of adding to it. |
| `prevent_hotbar_change` | Boolean | `false` | Swallow the scroll so the held hotbar slot does not move. |
| `cooldown` | [Expression](/docs/datapack/data-types/expression) | `0` | Ticks before the power can fire again. |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | not rendered | Draws the cooldown as a resource bar. |

`scroll_amount` counts **notches**, not scroll events with a magnitude — one click of a normal wheel is one notch either way. With `scroll_amount: 3` and `within_ticks: 10` the holder has half a second to get three clicks in; a fourth click starts a fresh count.

> `prevent_hotbar_change` only holds while the power is active, and it is evaluated on the holder's own client. It swallows the scroll in the world, not in menus — scrolling a chest or a creative tab is untouched.

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

- Scrolling is client input, so on a player this needs Apoli on the client. Any other entity can still be fed notches with [`/apoli:key scroll`](/docs/datapack/commands/key), which is how you test the power without wheeling through your hotbar.
- The power's `condition` is checked on the **server**, so every condition type works, including the ones a client cannot answer. The client reports the scroll whenever the holder has the power at all.
- `prevent_hotbar_change` is the exception: the client has to decide whether to swallow the scroll before the server hears about it, so it reads the `condition` locally. Gate it on something the client can see (a resource, a toggle, an entity flag) or it will not hold.
