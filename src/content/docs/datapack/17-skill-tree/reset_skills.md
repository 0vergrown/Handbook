---
title: "apoli:reset_skills"
description: "Deselects the player's purchased skills so they can rebuild ('respec'), optionally refunding the points that were spent."
---

Deselects the player's purchased skills so they can rebuild ("respec"), optionally refunding the points that were spent. Removing a skill also removes the powers it granted. Whether respec is allowed at all is up to you — you simply choose whether to trigger this action.

Type ID: `apoli:reset_skills`
## Fields

| Field    | Type                   | Default    | Description                                                                                                                                              |
|----------|------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `tree`   | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The **root** of a single tree to reset. If omitted, every tree the player has purchased into is reset.                                                   |
| `refund` | [Boolean](/docs/datapack/data-types/boolean)    | `true`     | Whether the points spent on the deselected skills are given back. Set to `false` to reset the build without a refund (a "you lose your points" penalty). |

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

This example refunds every point the player spent in the `example_pack:skill_tree` tree and clears their picks in it, letting them choose again. Pair it with an item or a keybind power to give players a "respec" button.

