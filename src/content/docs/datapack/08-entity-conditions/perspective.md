---
title: "Perspective (Entity Condition Type)"
description: "Checks which camera view a player is using: first person, or third person from behind or the front."
navigation_title: "Perspective"
---

Checks which camera view a player is using. Always fails for entities that are not players.

Type ID: `apoli:perspective`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `perspective` | String or Array of Strings | _required_ | Passes if the player is in any of these views: `first_person`, `third_person` (either third-person view), `third_person_back` or `third_person_front`. |

Each client reports its view to the server whenever it changes, so the condition works in any power, on either side. A player whose client does not have Apoli always reads as `first_person`.

On a client, only your own view is known: another player always reads as `first_person` there. That only matters for conditions evaluated by your client, such as the ones on render powers.

## Examples

Glow only while you look at yourself from the front:

```json
{
  "type": "apoli:self_glow",
  "condition": {
    "type": "apoli:perspective",
    "perspective": "third_person_front"
  }
}
```

Pass only in first person, with the universal [`inverted`](/docs/datapack/introduction/conditions) field:

```json
{
  "type": "apoli:perspective",
  "perspective": "third_person",
  "inverted": true
}
```
