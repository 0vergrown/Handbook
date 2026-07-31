---
title: "In Team (Entity Condition Type)"
description: "Checks whether the entity is on a scoreboard team, optionally one matching specific properties."
navigation_title: "In Team"
aliases: ["team"]
---

Checks whether the entity is on a scoreboard team, optionally one matching specific properties.

Type ID: `apoli:in_team`

Type aliases: `apoli:team`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`team` | [Team](/docs/datapack/data-types/team) | _optional_ | A team to match against.
`teams` | Array of [Team](/docs/datapack/data-types/team) | `[]` | Several teams; the condition passes if **any** of them match.

With neither field set, the condition simply checks that the entity is on *some* team.

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

!!! note

    Coming from Eggolib's `eggolib:in_team`: the field names and the string-or-object shape are the same, but a multi-field object here means **all** of those properties must match, where Eggolib passed if *any single* property matched. Split the object across `teams` to get the old behaviour.
