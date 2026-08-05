---
title: "Action On Collision (Power Type)"
description: "Executes an action while the entity that has the power is overlapping another entity."
navigation_title: "Action On Collision"
---

Executes an action while the entity that has the power is overlapping another entity.

**Type ID:** `apoli:action_on_collision`

> In the context of this power type, the **actor** is the entity that has the power and the **target** is the entity it is colliding with.

This is checked once per tick against every entity whose bounding box intersects the holder's, so unlike [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit) it does not need an attack — walking into something is enough. It also fires for entities vanilla never pushes, such as armour stands, boats, items and projectiles in flight.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Action run with the actor/target pair. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Action run on the actor (the entity that has the power). |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Action run on the entity being collided with. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Gates firing on the (actor, target) pair. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Gates firing on the target. |
| `radius` | [Float](/docs/datapack/data-types/float) | `0.0` | Extra blocks to inflate the holder's bounding box by before looking for overlaps. `0.0` means the boxes must actually touch. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks the power needs to recharge between fires. `0` fires every tick, for **every** colliding entity. |
| `include_riding` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to also fire for the entity the holder is riding, its passengers, and entities sharing its vehicle. |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |

All action and condition fields are optional. Specifying several actions runs all of them, in the order listed above. The power's own `condition` is checked before any overlap is tested.

> **`cooldown` is per power, not per entity.** With `cooldown: 20`, walking into a crowd fires once and then waits 20 ticks — it does not fire once per mob. Leave it at `0` if you want every colliding entity to be hit every tick, and remember that a tick-rate effect on a crowd adds up fast.

## Examples

Burn anything you touch:

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

Push away hostile mobs that get within a block and a half of you, at most twice a second:

```json
{
  "type": "apoli:action_on_collision",
  "radius": 1.5,
  "cooldown": 10,
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:entity_group",
      "group": "monster"
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
