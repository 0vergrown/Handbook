---
title: "Cooldown (Item Action Type)"
description: "Puts the item on cooldown for the player holding it, like an ender pearl after a throw."
navigation_title: "Cooldown"
---

Puts the item on cooldown for the player holding it, with the same grey sweep an ender pearl shows after a throw. While it lasts, the player cannot use that item.

Type ID: `apoli:cooldown`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`ticks` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How long the cooldown lasts, in ticks (20 ticks is one second). An Expression is evaluated once each time the action runs, against the player holding the item. `0` or less does nothing.

## Examples

```json
{
    "type": "apoli:action_on_key_press",
    "key": "key.apoli.primary_active",
    "entity_action": {
        "type": "apoli:equipped_item_action",
        "equipment_slot": "mainhand",
        "action": {
            "type": "apoli:cooldown",
            "ticks": 100
        }
    }
}
```

This example puts whatever the player is holding on a 5-second cooldown when they press their primary ability key.

```json
"item_action": {
    "type": "apoli:cooldown",
    "ticks": "20 * 3"
}
```

This example uses an [Expression](/docs/datapack/data-types/expression) for a 3-second cooldown.

> The cooldown applies to the **item type**, not to one stack. Putting one ender pearl on cooldown puts every ender pearl in that player's inventory on cooldown, just like vanilla does.

> A new cooldown **replaces** the one the item already has. It does not add to it. If vanilla also sets a cooldown on the same use (an ender pearl's 1-second throw cooldown), whichever runs last wins.

> Only players have item cooldowns. If the item is held by a mob, is in no one's hands, or the slot is empty, the action does nothing.
