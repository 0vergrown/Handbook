---
title: "Team (Data Type)"
description: "A scoreboard team, given either by name or as a set of properties to match."
navigation_title: "Team"
---

Describes a scoreboard team. It accepts either a string, which is the team's name, or an object whose fields are matched against a team, or applied to it.

## As a string

```json
"team": "red"
```

This is the same as `{"name": "red"}`.

## As an object

Every field is optional. In a condition, all the fields you write must match, and the fields you leave out are ignored. In [`apoli:team`](/docs/datapack/entity-actions/team), the fields you write are the ones that change.

| Field | Type | Description |
| --- | --- | --- |
| `name` | [String](/docs/datapack/data-types/string) | The team's name, as used by `/team`. |
| `friendly_fire` | [Boolean](/docs/datapack/data-types/boolean) | Whether members can damage each other. |
| `see_friendly_invisibles` | [Boolean](/docs/datapack/data-types/boolean) | Whether members can see invisible teammates. |
| `nametag_visibility` | [String](/docs/datapack/data-types/string) | `always`, `never`, `hideForOtherTeams` or `hideForOwnTeam`. |
| `death_message_visibility` | [String](/docs/datapack/data-types/string) | The same four values as `nametag_visibility`. |
| `collision_rule` | [String](/docs/datapack/data-types/string) | `always`, `never`, `pushOtherTeams` or `pushOwnTeam`. |
| `color` | [String](/docs/datapack/data-types/string) | A formatting colour name, such as `red` or `dark_aqua`. |

`nametag_visibility`, `death_message_visibility` and `collision_rule` also accept snake_case spellings, such as `hide_for_other_teams` and `push_own_team`.

The camelCase field names Eggolib uses (`friendlyFire`, `showFriendlyInvisibles`, `nametagVisibility`, `deathMessageVisibility` and `collisionRule`) are accepted as aliases, so `eggolib:in_team` JSON loads unchanged.

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
