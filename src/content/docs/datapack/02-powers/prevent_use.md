---
title: "Prevent Use (Power Type)"
description: "Stops the entity from being used, or from using other entities."
navigation_title: "Prevent Use"
aliases: ["prevent_entity_use", "prevent_being_used"]
---

Blocks the right-click interaction between two entities. `target_used` decides which side is blocked, and two aliases fill it in for you: `apoli:prevent_entity_use` stops the entity with the power from using other entities, and `apoli:prevent_being_used` stops other entities from using it.

Type ID: `apoli:prevent_use` (aliases `apoli:prevent_entity_use`, `apoli:prevent_being_used`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | both | The hands that are blocked: `main_hand`, `off_hand` or both. |
| `result_stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Given to the actor when the use is blocked. It goes into the hand that was used if that hand is now empty, otherwise into the inventory, and it is dropped at the actor's feet if the inventory is full. |
| `target_used` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `false` stops the entity with the power from using others, and `true` stops others from using it. The aliases fill this in. |
| `bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only block for this pairing. With either alias, the actor is the entity doing the interacting and the target is the one being interacted with. |
| `item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only block when the held item passes this condition. |
| `bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | _optional_ | Runs on the pair when a use is blocked. |
| `held_item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on the held stack when a use is blocked. |
| `result_item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on `result_stack` before it is given to the actor. Without `result_stack` it does nothing, so to change the item in hand, use `held_item_action`. |

> [!NOTE]
> The block applies on both sides, so the client never plays an interaction that is about to be refused. Actions run on the server only, once per interaction.

## Examples

Nobody can put a lead on you, shear you or interact with you in any other way:

```json
{
  "type": "apoli:prevent_being_used"
}
```

You can't trade with villagers, but everything else still works:

```json
{
  "type": "apoli:prevent_entity_use",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:entity_type", "entity_type": "minecraft:villager" }
  }
}
```

Block only the off hand, and only while it holds a lead:

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
