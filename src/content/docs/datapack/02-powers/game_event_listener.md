---
title: "Game Event Listener (Power Type)"
description: "Executes an action upon listening to a game event or vibration."
navigation_title: "Game Event Listener"
---

Executes an action upon listening to a game event or vibration.

Type ID: `apoli:game_event_listener`

> In the context of this power type, the '**actor**' entity is the entity that emmited the game event or vibration while the '**target**' entity is the entity that has the power.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`trigger_order` | String | `"unspecified"` | Determines whether the power type should prioritize game events by distance (`"by_distance"`) or arbitrarily (`"unspecified"`).
`entity` | Boolean | `true` | Determines whether the power type should listen to game events emitted by entities.
`block` | Boolean | `true` | Determines whether the power type should listen to game events emitted by blocks.
`bientity_action` | Bi-entity Action Type | _optional_ | If specified, this action will be executed on either or both the '**actor**' and '**target**' entities.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the specified actions will only be executed if this condition is fulfilled by either or both '**actor**' and '**target**' entities.
`block_action` | Block Action Type | _optional_ | If specified, this block action type will be executed at the position where the game event or vibration was emitted.
`block_condition` | Block Condition Type | _optional_ | If specified, only executes the actions if the game event or vibration is emitted by a block that fulfills the block condition.
`cooldown` | Integer | `1` | Interval of ticks this power needs to recharge before being able to listen to game events or vibrations again.
`hud_render` | Hud Render | `{"should_render": false}` | Determines how the cooldown of this power is visualized on the HUD.
`event` | Identifier | _optional_ | If specified, will make the power only listen for the game events with this namespace and IDs.
`events` | Array of Identifiers | _optional_ | If specified, will make the power only listen for the game events with these namespace and IDs.
`event_tag` | Identifier | _optional_ | If specified, will make the power only listen for the game events inside game event tag. The leading `#` is optional.
`show_particle` | Boolean | `true` | Determines whether the vibration should emit a particle effect.

## Examples

```json
{
    "type": "apoli:game_event_listener",
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:set_on_fire",
            "duration": 5
        }
    },
    "event": "minecraft:hit_ground"
}
```

This example will set the entity with the power on fire every time the `hit_ground` game event is emmited.

> **Verified 2026-07-10** end-to-end on a dedicated server (lightning_strike via block_action, self-emitted hit_ground via bientity_action, command-granted mid-play). Registration now retries until the holder's chunk is fully loaded — previously a listener granted while its chunk was still loading could silently never register. Note that `minecraft:hit_ground` is emitted by vanilla on **any** landing with fall distance > 0 (even a 1-block hop); filter with a bientity/block condition if you only want damaging falls. When testing on a dedicated server with no players online, entity ticking pauses after 15 seconds — mobs freeze and no events fire.
