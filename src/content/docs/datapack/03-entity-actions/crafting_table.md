---
title: "Crafting Table (Entity Action Type)"
description: "Opens a 3×3 crafting grid for the player, with no crafting table in the world."
navigation_title: "Crafting Table"
---

Opens the Crafting Table screen for the player, as if they had right-clicked one. Nothing has to exist in the world, so this works as a portable 3×3 grid.

Type ID: `apoli:crafting_table`

## Fields

This action has no fields.

## Examples

```json
"entity_action": {
    "type": "apoli:crafting_table"
}
```

Bound to a key, as a power that lets the player carry a workbench:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary_active" },
  "entity_action": { "type": "apoli:crafting_table" }
}
```

## Notes

- It runs on the server only, and does nothing when the target isn't a player.
- The screen stays open until the player closes it. Walking away doesn't close it, unlike a real crafting table once you leave its range.
- Items left in the grid go back to the player's inventory when the screen closes, and drop at their feet if it is full, the same as with a real table.
- [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) applies here too. Its `block_action` runs at the block the player was standing on when the screen opened.
