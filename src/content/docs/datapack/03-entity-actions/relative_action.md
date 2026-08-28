---
title: "Relative Action (Entity Action Type)"
description: Runs an action on the entity's passenger or vehicle instead.
navigation_title: "Relative Action"
---

Runs an entity action on whatever the entity is riding, or on whatever is riding it. Which direction is decided by `target`, and the aliases fill it in: `apoli:passenger_action` targets passengers, `apoli:riding_action` targets the vehicle.

Type ID: `apoli:relative_action` (aliases `apoli:passenger_action`, `apoli:riding_action`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Run on the relative entity, with that entity as the actor.
`bientity_action` | [Bi-entity Action](/docs/datapack/bientity-actions) | _optional_ | Run with **this** entity as the actor and the relative entity as the target, so the two are still told apart.
`bientity_condition` | [Bi-entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Checked against the same actor/target pair; a relative entity that fails it is skipped.
`target` | [String](/docs/datapack/data-types/string) | `passenger` | `passenger` to act on entities riding this one, `vehicle` to act on what this one is riding. Filled in by the aliases.
`recursive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Follow the chain all the way — every passenger's passengers, or every vehicle's vehicle.

Both actions are optional and both run when both are given; an action with neither does nothing.

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

Follow the whole stack — a boat carrying a minecart carrying a player, all launched together:

```json
{
  "type": "apoli:passenger_action",
  "recursive": true,
  "action": { "type": "apoli:add_velocity", "y": 1.5 }
}
```
