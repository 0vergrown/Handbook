---
title: "Receive Condition (Power Type)"
description: Holds a condition that other powers can ask about with apoli:send_condition.
navigation_title: "Receive Condition"
aliases: ["shappoli:receive_condition"]
---

Holds a condition that other powers ask about with [`apoli:send_condition`](/docs/datapack/entity-conditions/send_condition). It never does anything by itself.

The point is a single definition of some state that many powers depend on. Change the definition here and everything that asks follows; revoke the power and every sender reads false.

Type ID: `apoli:receive_condition` (also `shappoli:receive_condition`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | The answer given to an entity `apoli:send_condition`. Absent means "yes" — the sender passes as long as this power exists and is active.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | The answer given to a bi-entity `apoli:send_condition`.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | The answer given to an item `apoli:send_condition`.

A receiver with no fields at all is still useful — it answers "yes" whenever the holder has it, which turns the power itself into a flag that senders can test.

## Example

Define "transformed" once:

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

Then ask, from as many powers as you like:

```json
{
  "type": "apoli:send_condition",
  "receiver": "vampire:is_transformed"
}
```
