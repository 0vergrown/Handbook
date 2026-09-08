---
title: "Prevent Use (Power Type)"
description: Prevents the entity from being used, or from using others.
navigation_title: "Prevent Use"
aliases: ["prevent_entity_use", "prevent_being_used"]
---

Blocks the right-click interaction between two entities. Which side is blocked is decided by `target_used`, and there are aliases so you do not have to think about it: `apoli:prevent_entity_use` stops the holder using other entities, `apoli:prevent_being_used` stops other entities using the holder.

Type ID: `apoli:prevent_use` (aliases `apoli:prevent_entity_use`, `apoli:prevent_being_used`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`hands` | array of [Hand](/docs/datapack/data-types/hand) | both | Which hands are blocked — `main_hand`, `off_hand`, or both.
`result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Replace the used stack with this when the use is blocked.
`target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` blocks the holder using others; `true` blocks others using the holder. Filled in by the aliases.
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only block for this pairing. The actor is the entity doing the interacting, the target is the one being interacted with — on both aliases.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only block when the held item matches.
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | _optional_ | Runs on the pair when a use is blocked.
`held_item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on the held stack when a use is blocked.
`result_item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on the stack the hand is holding after `result_stack` has been handed over.

> The block is applied on both sides, so the client never plays the interaction it is about to lose. Actions run on the server only, once per interaction.

## Examples

Nobody can put a lead on you, shear you or otherwise interact with you:

```json
{
  "type": "apoli:prevent_being_used"
}
```

You cannot trade with villagers, but everything else still works:

```json
{
  "type": "apoli:prevent_entity_use",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:entity_type", "entity_type": "minecraft:villager" }
  }
}
```

Block only the off-hand, and only while holding something specific:

```json
{
  "type": "apoli:prevent_entity_use",
  "hands": ["off_hand"],
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "item": "minecraft:lead" }
  }
}
```
