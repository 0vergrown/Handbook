---
title: "Send Condition (Bi-Entity Condition Type)"
description: Asks an apoli:receive_condition power on the actor for the answer.
navigation_title: "Send Condition"
aliases: ["shappoli:send_condition"]
---

Asks an [`apoli:receive_condition`](/docs/datapack/powers/receive_condition) power on the actor, passing both entities through so the receiver can answer with its `bientity_condition`.

Type ID: `apoli:send_condition` (also `shappoli:send_condition`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `receiver` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power on the actor. The condition is false if the actor doesn't have it, if it is suppressed, if its own `condition` fails, or if it isn't the right receiving type. |

## Example

The receiver decides who counts as an ally:

```json
{
  "type": "apoli:receive_condition",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:command", "command": "team list", "comparison": ">", "compare_to": 0 }
  }
}
```

Any power with a bi-entity condition can ask it:

```json
{
  "type": "apoli:entity_glow",
  "bientity_condition": {
    "type": "apoli:send_condition",
    "receiver": "mypack:counts_as_ally"
  }
}
```
