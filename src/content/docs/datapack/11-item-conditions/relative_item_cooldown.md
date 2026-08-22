---
title: "Relative Item Cooldown (Item Condition Type)"
description: Compares the item's cooldown as a fraction of its total.
navigation_title: "Relative Item Cooldown"
---

Compares how much of the stack's use cooldown is left, as a fraction from `1.0` (just used, full cooldown remaining) down to `0.0` (ready). Fails when nothing is holding the stack.

Type ID: `apoli:relative_item_cooldown`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | **required** | How to compare — `<`, `<=`, `>`, `>=`, `==`, `!=`.
`compare_to` | [Float](/docs/datapack/data-types/float) | **required** | The fraction to compare against, `0.0` to `1.0`.

## Example

Glow while an ender pearl is still on cooldown, so the player can see when it is ready without watching the icon:

```json
{
  "type": "apoli:self_glow",
  "condition": {
    "type": "apoli:equipped_item",
    "equipment_slot": "mainhand",
    "item_condition": {
      "type": "apoli:relative_item_cooldown",
      "comparison": ">",
      "compare_to": 0.0
    }
  }
}
```

Or only allow something once the cooldown is more than half gone:

```json
{
  "type": "apoli:relative_item_cooldown",
  "comparison": "<",
  "compare_to": 0.5
}
```
