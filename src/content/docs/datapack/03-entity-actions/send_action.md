---
title: "Send Action (Entity Action Type)"
description: Hands this action off to an apoli:receive_action power on the same entity.
navigation_title: "Send Action"
aliases: ["shappoli:send_action"]
---

Hands off to an [`apoli:receive_action`](/docs/datapack/powers/receive_action) power on the same entity, which decides what actually happens.

This is how you write shared behaviour once. Instead of copying the same block of actions into six powers, put it in one receiver and have the six send to it — and because the receiver is a normal power, it can be granted, revoked, suppressed and conditioned like any other, so the same trigger can do different things depending on which receiver the entity currently holds.

Type ID: `apoli:send_action` (also `shappoli:send_action`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`receiver` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The id of a power on the same entity. Nothing happens if the entity does not have it, if it is suppressed, if its own `condition` fails, or if it is not the right receiving type.

## Example

One receiver holds the "you spent blood" behaviour:

```json
{
  "type": "apoli:receive_action",
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:change_resource", "resource": "vampire:blood", "change": -1 },
      { "type": "apoli:play_sound", "sound": "minecraft:entity.generic.drink" }
    ]
  }
}
```

Every power that costs blood just sends to it, and none of them needs to know how blood works:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      { "type": "apoli:set_on_fire", "duration": 4 },
      { "type": "apoli:send_action", "receiver": "vampire:spend_blood" }
    ]
  }
}
```

Swap the receiver for one that costs hunger instead and every sender changes with it.
