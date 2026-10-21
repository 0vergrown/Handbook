---
title: "Cooldown (Power Type)"
description: "A countdown timer that can be triggered, checked and changed."
navigation_title: "Cooldown"
---

A countdown timer that actions can trigger, check and change. Use it for power types that don't have a built-in cooldown, as a recurring timer, or as a loop that runs an action every so many ticks.

Type ID: `apoli:cooldown`

A cooldown is an [apoli:resource](/docs/datapack/powers/resource) whose value is the number of ticks left, from `0` (ready) up to `cooldown`. Everything that works on a resource also works on a cooldown: the [Resource](/docs/datapack/entity-conditions/resource) condition, [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), [apoli:change_resource](/docs/datapack/entity-actions/change_resource), [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown), expressions and `/apoli:resource`, as well as the resource's `min_action`, `max_action` and `on_change`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How many ticks the cooldown lasts once triggered. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | _hidden_ | How the cooldown is shown on the HUD. The bar fills as the cooldown recovers and disappears when it is ready. |
| `persistent` | [Boolean](/docs/datapack/data-types/boolean) | `true` | When `true`, a running cooldown carries on across logging out and server restarts. When `false`, the cooldown resets to `start_value` whenever the entity loads into the world. |
| `start_value` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks left when the power is first granted. `0` starts it ready, and `cooldown` starts it as if just used. |
| `min_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs when the cooldown reaches `0`, the moment it becomes ready. |
| `max_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs when the cooldown is set to its full length, the moment it is triggered. |
| `on_change` | [Array](/docs/datapack/data-types/array) of [On Change](/docs/datapack/powers/resource#reacting-to-changes) entries | _none_ | Runs an action when the value reaches one you name. For a cooldown, that is every value it counts down through. |

## Behaviour

- The value is the number of ticks left until the cooldown is ready. [apoli:trigger_cooldown](/docs/datapack/entity-actions/trigger_cooldown) sets it to `cooldown`.
- The cooldown counts down on the world clock. It keeps counting while the power's own `condition` fails, while the entity is offline and while its chunk is unloaded, so a cooldown that ran out in the meantime is ready the moment the entity is back.
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) with `add 20` adds a second to the time left, and `set_base 0` makes it ready at once. Writes are clamped between `0` and `cooldown`.
- The [Resource](/docs/datapack/entity-conditions/resource) condition can check `== 0` (ready) or `> 0` (cooling down).
- `min_action` fires once, when the time left reaches `0`. Setting the value to `0` yourself fires it too, but writing `0` to a cooldown that is already ready doesn't.

## Examples

A 10-second cooldown shown on the HUD:

```json
{
  "type": "apoli:cooldown",
  "cooldown": 200,
  "hud_render": {
    "should_render": true,
    "bar_index": 3
  }
}
```

A cooldown whose length depends on the player's XP level:

```json
{
  "type": "apoli:cooldown",
  "cooldown": "100 + 10 * xp_level"
}
```

A loop that heals the entity every three seconds. `start_value` starts the cooldown running, and `min_action` heals and triggers it again:

```json
{
  "type": "apoli:cooldown",
  "cooldown": 60,
  "start_value": 60,
  "hud_render": {
    "should_render": true,
    "bar_index": 6
  },
  "min_action": {
    "type": "apoli:and",
    "actions": [
      {
        "type": "apoli:heal",
        "amount": 2
      },
      {
        "type": "apoli:trigger_cooldown",
        "power": "*:*"
      }
    ]
  }
}
```

A warning one second before a cooldown is ready again:

```json
{
  "type": "apoli:cooldown",
  "cooldown": 400,
  "on_change": [
    {
      "value": 20,
      "entity_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.note_block.chime"
      }
    }
  ]
}
```
