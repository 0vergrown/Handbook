---
title: "Team (Data Type)"
description: "A scoreboard team, given either by name or as a set of properties to match."
---

Describes a scoreboard team. Accepts either a **string** (the team's name) or an **object** whose fields are matched against — or applied to — a team.

## As a string

```json
"team": "red"
```

Equivalent to `{"name": "red"}`.

## As an object

Every field is optional. When used in a condition, **all** the fields you specify must match; fields you leave out are ignored. When used in [`apoli:team`](/docs/datapack/entity-actions/team), the fields you specify are the ones that get changed.

Field | Type | Description
------|------|-------------
`name` | String | The team's name, as used by `/team`.
`friendly_fire` | Boolean | Whether members can damage each other.
`see_friendly_invisibles` | Boolean | Whether members can see invisible teammates.
`nametag_visibility` | String | `always`, `never`, `hideForOtherTeams` or `hideForOwnTeam`.
`death_message_visibility` | String | Same four values as `nametag_visibility`.
`collision_rule` | String | `always`, `never`, `pushOtherTeams` or `pushOwnTeam`.
`color` | String | A formatting colour name, e.g. `red`, `dark_aqua`.

`nametag_visibility`, `death_message_visibility` and `collision_rule` also accept snake_case spellings (`hide_for_other_teams`, `push_own_team`, …).

The camelCase field spellings used by Eggolib — `friendlyFire`, `showFriendlyInvisibles`, `nametagVisibility`, `deathMessageVisibility`, `collisionRule` — are accepted as aliases, so `eggolib:in_team` JSON loads unchanged.

```json
"team": {
  "name": "red",
  "friendly_fire": false,
  "nametag_visibility": "never"
}
```

## Used by

- [`apoli:in_team`](/docs/datapack/entity-conditions/in_team)
- [`apoli:team`](/docs/datapack/entity-actions/team)
