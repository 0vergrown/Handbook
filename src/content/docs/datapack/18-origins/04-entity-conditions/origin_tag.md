---
title: "Origin Tag (Entity Condition Type)"
description: "Checks whether the player's origin carries one of the given origin tags."
navigation_title: "Origin Tag"
---

Checks whether the player's origin carries one of the given tags, rather than naming origins by id. Tag the origins once and a condition written against the tag keeps working when a pack adds more of them.

Type ID: `origins:origin_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | string or array of strings | — | The tag(s) to look for. Passes if the origin carries any of them. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _every layer_ | Only look at the origin held on this layer. |
| `selection` | `main`, `active`, `pool` or `all` | `main` | Which origins are checked — the chosen one, the one currently swapped in, the player's pool, or all of them. Same meaning as on [origins:origin](/docs/datapack/origins/origin). |

Tagging an origin is a `tags` list on the origin JSON:

```json
{
    "name": "super op origin",
    "description": "TOO OP",
    "tags": ["universeLevel"],
    "icon": { "item": "minecraft:tnt" },
    "powers": [],
    "impact": 3
}
```

Tags are plain strings, matched exactly and case-sensitively.

## Examples

```json
{
    "type": "origins:origin_tag",
    "tag": "universeLevel",
    "inverted": true
}
```

Passes for anyone whose origin is **not** tagged `universeLevel` — the usual shape for "this only works on people below your weight class".

```json
{
    "type": "origins:origin_tag",
    "tag": ["undead", "construct"],
    "selection": "all"
}
```

Passes if any origin the player holds — chosen, swapped or in their pool — is tagged either way.
