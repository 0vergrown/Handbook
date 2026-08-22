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
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only block for this pairing.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only block when the held item matches.

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
