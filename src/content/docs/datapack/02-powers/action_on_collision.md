---
title: "Action On Collision (Power Type)"
description: "Runs an action while the entity that has the power overlaps another entity."
navigation_title: "Action On Collision"
---

Runs an action while the entity that has the power overlaps another entity. The actor is the entity with the power, and the target is the entity it collides with.

Type ID: `apoli:action_on_collision`

The check runs once per tick against every entity whose bounding box touches the entity's own, so unlike [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit) it doesn't need an attack, and walking into something is enough. It also fires for entities vanilla never pushes, such as armour stands, boats, items and projectiles in flight.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs on the actor and target pair. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the actor, the entity that has the power. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity being collided with. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Must pass for the actor and target pair before the power fires. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the target. |
| `radius` | [Float](/docs/datapack/data-types/float) | `0.0` | Extra blocks to grow the entity's bounding box by before looking for overlaps. `0.0` means the boxes have to touch. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks the power needs to recharge between fires. `0` fires every tick, for every colliding entity. |
| `include_riding` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the power also fires for the entity's vehicle, its passengers and entities riding the same vehicle. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |

All action and condition fields are optional. Setting several actions runs all of them, in the order listed above. The power's own `condition` is checked before any overlap is tested.

> [!WARNING]
> The cooldown belongs to the power, not to each entity. With `cooldown: 20`, walking into a crowd fires once and then waits 20 ticks instead of firing once per mob. Leave it at `0` to hit every colliding entity every tick, and keep in mind that an effect applied every tick to a crowd adds up quickly.

## Examples

Set fire to anything you touch:

```json
{
  "type": "apoli:action_on_collision",
  "cooldown": 10,
  "target_action": {
    "type": "apoli:set_on_fire",
    "duration": 60
  }
}
```

Knock illagers that come within a block and a half upward, at most twice a second:

```json
{
  "type": "apoli:action_on_collision",
  "radius": 1.5,
  "cooldown": 10,
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:entity_group",
      "group": "illager"
    }
  },
  "bientity_action": {
    "type": "apoli:add_velocity",
    "x": 0.0,
    "y": 0.4,
    "z": 0.0,
    "reference": "position"
  },
  "hud_render": {
    "should_render": true,
    "sprite_location": "apoli:textures/gui/resource_bar.png"
  }
}
```
