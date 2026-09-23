---
title: "Crafting Table (Entity Action Type)"
description: "Opens a 3×3 crafting grid for the player, with no crafting table in the world."
navigation_title: "Crafting Table"
---

Opens the Crafting Table screen for the player, as if they had right-clicked one. Nothing has to exist in the world — this is a portable 3×3 grid.

Type ID: `apoli:crafting_table`

## Fields

_None._

## Examples

```json
"entity_action": {
    "type": "apoli:crafting_table"
}
```

Bound to a key, as a "carry a workbench" power:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary_active" },
  "entity_action": { "type": "apoli:crafting_table" }
}
```

## Notes

- Server-side only; it does nothing when the target is not a player.
- The screen stays open until the player closes it. Walking away does not shut it, the way a real crafting table does once you leave its range.
- Items left in the grid come back to the player's inventory on close, and drop at their feet if it is full — the same as a real table.
- [`apoli:modify_crafting`](/docs/datapack/powers/modify_crafting) applies here too. Its `block_action` runs at the block the player was standing on when the screen opened.
