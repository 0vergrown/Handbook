---
title: "Same Team (Bi-Entity Condition Type)"
description: "Checks whether the actor and the target are on the same scoreboard team."
navigation_title: "Same Team"
aliases: ["allied"]
---

Checks whether the actor and the target are on the same scoreboard team.

Type ID: `apoli:same_team` (alias `apoli:allied`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `allow_teamless` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, two entities that are both on no team count as allied. |

## Example

Cancel friendly fire between teammates:

```json
{
  "type": "apoli:prevent_entity_damage",
  "bientity_condition": { "type": "apoli:same_team" }
}
```
