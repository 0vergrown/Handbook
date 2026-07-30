---
title: "apoli:team"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Joins, leaves, creates, edits, empties or deletes a scoreboard team — the datapack equivalent of the `/team` command.

Type ID: `apoli:team`

Type aliases: `apoli:join_team` (implies `"operation": "join"`), `apoli:leave_team` (`"leave"`), `apoli:modify_team` (`"modify"`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`operation` | String | `join` | What to do — see below.
`team` | [Team](/docs/datapack/data-types/team) | _optional_ | Which team, and which properties to set. If omitted, the entity's **current** team is used.
`create_if_missing` | Boolean | `true` | For `join` and `create`, make the team if it does not exist yet.

### Operations

Operation | Effect
----------|--------
`join` | Adds the entity to the team. Any properties on `team` are applied to it first.
`leave` | Removes the entity from whatever team it is on.
`create` | Makes the team (if missing) and applies the properties, without joining it.
`modify` | Applies the properties to an existing team. Does nothing if the team does not exist.
`empty` | Removes every member from the team.
`delete` | Deletes the team entirely.

## Examples

Join a team, creating it with the right settings on first use:

```json
{
   "type":"apoli:team",
   "operation":"join",
   "team":{
      "name":"vampires",
      "friendly_fire":false,
      "see_friendly_invisibles":true,
      "color":"dark_red"
   }
}
```

Leave on power loss:

```json
{
   "type":"apoli:leave_team"
}
```

Turn off friendly fire on the team the holder is already on:

```json
{
   "type":"apoli:modify_team",
   "team":{
      "friendly_fire":false
   }
}
```

!!! caution

    Teams are server state shared by everyone. `delete` and `empty` affect all members, not just the entity running the action.

## See also

- [`apoli:in_team`](/docs/datapack/entity-conditions/in_team)
- [Team](/docs/datapack/data-types/team)
