---
title: "Add Skill Points (Entity Action Type)"
description: "Gives a player skill points in a tree, or takes them away."
navigation_title: "Add Skill Points"
---

Gives the player skill points in a tree, so you can hand out points for whatever actions you like.

Type ID: `apoli:add_skill_points`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the skill tree the points go to. It must be the root of the tree. |
| `points` | [Integer](/docs/datapack/data-types/integer) | `1` | How many points to add. Negative values take points away, down to zero. |

## Example

```json
{
    "entity_action": {
        "type": "apoli:add_skill_points",
        "skill_tree": "example_pack:skill_tree",
        "points": 1
    }
}
```

This adds 1 point to the `example_pack:skill_tree` tree.
