---
title: "Receive Action (Power Type)"
description: Holds a block of actions that other powers can trigger with apoli:send_action.
navigation_title: "Receive Action"
aliases: ["shappoli:receive_action"]
---

Holds a block of actions that other powers trigger with [`apoli:send_action`](/docs/datapack/entity-actions/send_action). On its own it does nothing — it waits to be called.

Use it to write a behaviour once and call it from many places. Because it is a normal power, granting, revoking or suppressing it changes what every sender does, without touching the senders.

Type ID: `apoli:receive_action` (also `shappoli:receive_action`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the holder whenever this power receives anything, whichever flavour sent it. Fires after the flavour-specific action below.
`entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs when an entity `apoli:send_action` calls in.
`entity_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Gate on the entity action. When it fails, nothing runs — not even `action`.
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | _optional_ | Runs when a bi-entity `apoli:send_action` calls in.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Gate on the bi-entity action.
`item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs when an item `apoli:send_action` calls in.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Gate on the item action.

At least one action field is worth setting; a receiver with none is a no-op. A power's own top-level `condition` is checked before any of this, so a receiver whose condition fails is simply not there as far as senders are concerned.

## Example

A receiver that spends blood, plays a sound, and — through `action` — always logs the spend regardless of which flavour called:

```json
{
  "type": "apoli:receive_action",
  "entity_condition": {
    "type": "apoli:resource",
    "resource": "vampire:blood",
    "comparison": ">",
    "compare_to": 0
  },
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:change_resource", "resource": "vampire:blood", "change": -1 },
      { "type": "apoli:play_sound", "sound": "minecraft:entity.generic.drink" }
    ]
  },
  "action": {
    "type": "apoli:trigger_cooldown",
    "power": "vampire:blood_cooldown"
  }
}
```

Any number of powers can now call it:

```json
{
  "type": "apoli:send_action",
  "receiver": "vampire:spend_blood"
}
```
