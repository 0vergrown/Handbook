---
title: "Send Condition (Entity Condition Type)"
description: Asks an apoli:receive_condition power on the same entity for the answer.
navigation_title: "Send Condition"
aliases: ["shappoli:send_condition"]
---

Asks an [`apoli:receive_condition`](/docs/datapack/powers/receive_condition) power on the same entity and uses its answer. If the entity doesn't have that power, it is suppressed, or its own `condition` fails, this condition is false.

That last part is what makes it useful. Granting and revoking the receiver turns every sender on and off at once, which is a clean way to model a state that many powers care about.

Type ID: `apoli:send_condition` (also `shappoli:send_condition`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `receiver` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power on the same entity. The condition is false if the entity doesn't have it, if it is suppressed, if its own `condition` fails, or if it isn't the right receiving type. |

## Example

One power defines what being transformed means:

```json
{
  "type": "apoli:receive_condition",
  "entity_condition": {
    "type": "apoli:and",
    "conditions": [
      { "type": "apoli:power_active", "power": "vampire:bat_form" },
      { "type": "apoli:resource", "resource": "vampire:blood", "comparison": ">", "compare_to": 0 }
    ]
  }
}
```

Everything that cares asks it:

```json
{
  "type": "apoli:creative_flight",
  "condition": {
    "type": "apoli:send_condition",
    "receiver": "vampire:is_transformed"
  }
}
```

Change the definition in one place and every power that asks follows.
