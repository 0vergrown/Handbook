---
title: "In Team (Entity Condition Type)"
description: "Checks whether the entity is on a scoreboard team, optionally one matching specific properties."
navigation_title: "In Team"
aliases: ["team"]
---

Checks whether the entity is on a scoreboard team, optionally one that matches specific properties.

Type ID: `apoli:in_team` (alias `apoli:team`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `team` | [Team](/docs/datapack/data-types/team) | _optional_ | A team to match against. |
| `teams` | Array of [Team](/docs/datapack/data-types/team) | `[]` | Several teams. The condition passes if any of them match. |

With neither field set, the condition only checks that the entity is on some team.

## Examples

On the `red` team:

```json
{
  "type": "apoli:in_team",
  "team": "red"
}
```

On any team whose nametags are hidden:

```json
{
  "type": "apoli:in_team",
  "team": { "nametag_visibility": "never" }
}
```

On any team at all:

```json
{ "type": "apoli:in_team" }
```

> [!NOTE]
> If you are coming from Eggolib's `eggolib:in_team`, the field names and the string or object shape are the same, but an object with several fields here means all of those properties must match. Eggolib passed if any single property matched. Split the object across `teams` to get that behaviour.
