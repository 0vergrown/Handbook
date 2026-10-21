---
title: "Team (Entity Action Type)"
description: "Joins, leaves, creates, edits, empties or deletes a scoreboard team, like the /team command."
navigation_title: "Team"
aliases: ["modify_team", "join_team", "leave_team"]
---

Joins, leaves, creates, edits, empties or deletes a scoreboard team. It is the data pack equivalent of the `/team` command.

Type ID: `apoli:team`

Type aliases: `apoli:join_team` (sets `"operation": "join"`), `apoli:leave_team` (`"leave"`) and `apoli:modify_team` (`"modify"`).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `operation` | [String](/docs/datapack/data-types/string) | `join` | What to do. See [Operations](#operations). |
| `team` | [Team](/docs/datapack/data-types/team) | _optional_ | Which team, and which properties to set. Leave it out to use the entity's current team. |
| `create_if_missing` | [Boolean](/docs/datapack/data-types/boolean) | `true` | For `join` and `create`, makes the team if it doesn't exist yet. |

### Operations

| Operation | Effect |
| --- | --- |
| `join` | Adds the entity to the team. Any properties on `team` are applied to the team first. |
| `leave` | Removes the entity from whatever team it is on. |
| `create` | Makes the team (if it is missing) and applies the properties, without joining it. |
| `modify` | Applies the properties to an existing team. Does nothing if the team doesn't exist. |
| `empty` | Removes every member from the team. |
| `delete` | Deletes the team entirely. |

## Examples

Join a team, creating it with the right settings on first use:

```json
{
  "type": "apoli:team",
  "operation": "join",
  "team": {
    "name": "vampires",
    "friendly_fire": false,
    "see_friendly_invisibles": true,
    "color": "dark_red"
  }
}
```

Leave when the power is lost:

```json
{ "type": "apoli:leave_team" }
```

Turn off friendly fire on the team the holder is already on:

```json
{
  "type": "apoli:modify_team",
  "team": { "friendly_fire": false }
}
```

> [!WARNING]
> Teams are server state that everyone shares. `delete` and `empty` affect all members, including entities other than the one running the action.
