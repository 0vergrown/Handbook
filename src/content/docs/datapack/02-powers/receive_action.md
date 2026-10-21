---
title: "Receive Action (Power Type)"
description: "Holds actions that other powers can run with apoli:send_action."
navigation_title: "Receive Action"
aliases: ["shappoli:receive_action"]
---

Holds actions that other powers run with [`apoli:send_action`](/docs/datapack/entity-actions/send_action). On its own it does nothing until something calls it.

Use it to write a behaviour once and call it from many places. Because it is a normal power, granting, revoking or suppressing it changes what every sender does without touching the senders.

Type ID: `apoli:receive_action` (also `shappoli:receive_action`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the entity with the power whenever this power receives anything, whatever kind of action sent it. It runs after the action for that kind below. |
| `entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs when an entity `apoli:send_action` calls this power. |
| `entity_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The condition for the entity action. When it fails, nothing runs, including `action`. |
| `bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | _optional_ | Runs when a bi-entity `apoli:send_action` calls this power. |
| `bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | The condition for the bi-entity action. |
| `item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs when an item `apoli:send_action` calls this power. |
| `item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | The condition for the item action. |

Set at least one action field, because a receiver with none does nothing. The power's own top-level `condition` is checked before any of this, so to senders a receiver whose condition fails doesn't exist.

## Example

A receiver that spends blood and plays a sound, and through `action` always triggers a cooldown, whatever kind of action called it:

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
