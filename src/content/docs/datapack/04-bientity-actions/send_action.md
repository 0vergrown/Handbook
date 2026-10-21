---
title: "Send Action (Bi-Entity Action Type)"
description: Hands this bi-entity action off to an apoli:receive_action power on the actor.
navigation_title: "Send Action"
aliases: ["shappoli:send_action"]
---

Hands off to an [`apoli:receive_action`](/docs/datapack/powers/receive_action) power on the actor and passes both entities through. The receiver reads them with its `bientity_action` and `bientity_condition` fields.

Type ID: `apoli:send_action` (also `shappoli:send_action`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `receiver` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power on the actor. Nothing happens if the actor doesn't have it, if it is suppressed, if its own `condition` fails, or if it isn't the right receiving type. |

## Example

The receiver decides what punishing the attacker means for this origin:

```json
{
  "type": "apoli:receive_action",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  },
  "bientity_action": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:magic"
  }
}
```

Anything that hits you can send to it, and the receiver's own condition decides whether it applies:

```json
{
  "type": "apoli:action_when_hit",
  "bientity_action": {
    "type": "apoli:send_action",
    "receiver": "mypack:retaliate"
  }
}
```
