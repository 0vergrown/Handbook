---
title: "apoli:add_skill_points"
description: "Adds skill points to a players tree, allowing the developer to allocate points for certain actions."
---

Adds skill points to a players tree, allowing the developer to allocate points for certain actions.

Type ID: `apoli:add_skill_points`
## Fields

| Field        | Type                   | Default | Description                                                                               |
|--------------|------------------------|---------|-------------------------------------------------------------------------------------------|
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) |         | ID of the skill tree that the point will be given to (MUST BE THE ROOT OF THE SKILL TREE) |

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
