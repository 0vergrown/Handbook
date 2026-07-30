---
title: "apoli:same_team"
description: "[Bi-entity Condition Type](../bientityconditiontypes.md)"
---

Bi-entity Condition Type

Checks whether the actor and the target are on the same scoreboard team.

Type ID: `apoli:same_team`

Type aliases: `apoli:allied`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`allow_teamless` | Boolean | `false` | If `true`, two entities that are both on **no** team count as allied.

## Example

Cancel friendly fire between teammates:

```json
{
   "type":"apoli:prevent_entity_damage",
   "bientity_condition":{
      "type":"apoli:same_team"
   }
}
```

## See also

- [`apoli:in_team`](/docs/datapack/entity-conditions/in_team)
