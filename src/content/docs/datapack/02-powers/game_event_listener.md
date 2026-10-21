---
title: "Game Event Listener (Power Type)"
description: "Runs an action when the entity hears a game event or vibration."
navigation_title: "Game Event Listener"
---

Runs an action when the entity that has the power hears a game event or vibration. The actor is the entity that emitted the game event, and the target is the entity with the power.

Type ID: `apoli:game_event_listener`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trigger_order` | [String](/docs/datapack/data-types/string) | `"unspecified"` | Whether game events are handled nearest first (`"by_distance"`) or in any order (`"unspecified"`). |
| `entity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the power listens to game events emitted by entities. |
| `block` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the power listens to game events emitted by blocks. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the actions only run when the actor and target pass this condition. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs at the position where the game event was emitted. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the game event comes from a block that passes this condition. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks the power needs to recharge before it can hear game events again. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |
| `event` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the power only listens for this game event. |
| `events` | [Array](/docs/datapack/data-types/array) of [Identifiers](/docs/datapack/data-types/identifier) | _optional_ | If set, the power only listens for these game events. |
| `event_tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the power only listens for game events in this tag. The leading `#` is optional. |
| `show_particle` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the vibration shows a particle. |

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

This sets the entity with the power on fire every time it hears the `hit_ground` game event.

> [!NOTE]
> Vanilla emits `minecraft:hit_ground` on any landing with a fall distance above 0, even a one-block hop, so filter with a bi-entity or block condition if you only want damaging falls.

> [!TIP]
> When you test on a dedicated server with no players online, entity ticking pauses after 15 seconds. Mobs freeze and no events fire.
