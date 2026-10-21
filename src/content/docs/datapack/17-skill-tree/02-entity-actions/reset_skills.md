---
title: "Reset Skills (Entity Action Type)"
description: "Clears the player's purchased skills so they can rebuild, optionally refunding what they spent."
navigation_title: "Reset Skills"
---

Clears the player's purchased skills so they can rebuild, often called a respec, optionally refunding the points that were spent. Removing a skill also removes the powers it granted. Whether respecs are allowed at all is up to you, since you choose when to trigger this action.

Type ID: `apoli:reset_skills`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tree` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The root of a single tree to reset. Leave it out to reset every tree the player has bought skills in. |
| `refund` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether what was paid for the cleared skills (points and items) is given back. A refund also takes back the skills' [rewards](/docs/datapack/skill-tree/skill-tree-power-data#rewards) as far as the player still has them. Set it to `false` to reset the build without a refund, as a penalty where the player loses their points, and the player then keeps the rewards. |

## Example

```json
{
    "entity_action": {
        "type": "apoli:reset_skills",
        "tree": "example_pack:skill_tree",
        "refund": true
    }
}
```

This refunds every point the player spent in the `example_pack:skill_tree` tree and clears their picks in it, so they can choose again. Pair it with an item or a keybind power to give players a respec button.
