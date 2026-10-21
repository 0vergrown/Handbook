---
title: "Origin Tag (Entity Condition Type)"
description: "Checks whether the player's origin carries one of the given origin tags."
navigation_title: "Origin Tag"
---

Checks whether the player's origin carries one of the given tags, instead of naming origins by ID. Tag the origins once, and a condition written against the tag keeps working when a pack adds more of them.

Type ID: `origins:origin_tag`

> [!NOTE]
> This condition comes from the Origins mod. It only passes for players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of strings | _required_ | The tags to look for. The condition passes if the origin carries any of them. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _every layer_ | Only looks at the origin held on this layer. |
| `selection` | [Selection](/docs/datapack/data-types/selection) | `main` | Which origins are checked: the chosen one, the one swapped in, the player's pool, or all of them. It means the same as on [origins:origin](/docs/datapack/origins/origin). |

Tagging an origin is a `tags` list in the origin's JSON:

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

This passes for anyone whose origin isn't tagged `universeLevel`, which suits a power that only works on players below a certain tier.

```json
{
    "type": "origins:origin_tag",
    "tag": ["undead", "construct"],
    "selection": "all"
}
```

This passes if any origin the player holds, whether chosen, swapped in or in their pool, carries either tag.
