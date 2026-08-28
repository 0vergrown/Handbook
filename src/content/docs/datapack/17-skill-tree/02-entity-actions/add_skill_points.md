---
title: "Add Skill Points (Entity Action Type)"
description: "Adds skill points to a players tree, allowing the developer to allocate points for certain actions."
navigation_title: "Add Skill Points"
---

Adds skill points to a players tree, allowing the developer to allocate points for certain actions.

Type ID: `apoli:add_skill_points`
## Fields

| Field        | Type                   | Default | Description                                                                               |
|--------------|------------------------|---------|-------------------------------------------------------------------------------------------|
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | **required** | ID of the skill tree the points are given to. This must be the **root** of the tree. |
| `points`     | [Integer](/docs/datapack/data-types/integer) | `1` | How many points to add. Negative values take points away, down to zero. |

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

This example will add 1 point to the `example_pack:skill_tree` tree.
