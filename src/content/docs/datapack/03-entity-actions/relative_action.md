---
title: "Relative Action (Entity Action Type)"
description: Runs an action on the entity's passenger or vehicle instead.
navigation_title: "Relative Action"
---

Runs an entity action on whatever the entity is riding, or on whatever is riding it. `target` decides the direction, and the aliases fill it in: `apoli:passenger_action` targets passengers and `apoli:riding_action` targets the vehicle.

Type ID: `apoli:relative_action` (aliases `apoli:passenger_action` and `apoli:riding_action`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the relative entity, with that entity as the actor. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with this entity as the actor and the relative entity as the target, so the two can still be told apart. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Checked against the same actor and target. A relative entity that fails it is skipped. |
| `target` | [String](/docs/datapack/data-types/string) | `passenger` | `passenger` acts on entities riding this one, and `vehicle` acts on what this one is riding. The aliases fill this in. |
| `recursive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Follows the chain all the way: every passenger's passengers, or every vehicle's vehicle. |

Both actions are optional, and both run when both are given. With neither, the action does nothing.

## Examples

Set whoever is riding you on fire:

```json
{
  "type": "apoli:passenger_action",
  "action": { "type": "apoli:set_on_fire", "duration": 4 }
}
```

Heal the horse you are riding whenever you eat:

```json
{
  "type": "apoli:action_on_item_use",
  "item_condition": { "type": "apoli:food" },
  "entity_action": {
    "type": "apoli:riding_action",
    "action": { "type": "apoli:heal", "amount": 4 }
  }
}
```

Launch the whole stack together, such as a boat carrying a minecart carrying a player:

```json
{
  "type": "apoli:passenger_action",
  "recursive": true,
  "action": { "type": "apoli:add_velocity", "y": 1.5 }
}
```
