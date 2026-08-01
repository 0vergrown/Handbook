---
title: "Show Both Arms (Power Type)"
description: "Draws the arm that first person normally leaves out, so the holder can see both hands."
navigation_title: "Show Both Arms"
---

Draws the arm that first person normally leaves out, so the holder can see both hands.

Type ID: `apoli:show_both_arms`

Vanilla only ever draws one bare arm in first person: the main hand's, and only while the main hand is empty. The off hand's arm is never drawn, and neither arm is drawn while you are holding something. This power fills those gaps.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`off_hand` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Draw the off arm when the off hand is empty. This is the "see both hands" behaviour.
`main_hand` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Draw the main arm even while the main hand is holding an item, so you see the arm as well as the item. Filled maps are skipped — vanilla already draws both arms for those.

> This is a client-side rendering power and only affects the holder's own view. It draws the *player's real arm*, not a copy: everything that changes how your arms look elsewhere applies here too — [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) skins and texture overlays (per-layer `show_first_person`), [apoli:model_color](/docs/datapack/powers/model_color), [apoli:modify_player_model](/docs/datapack/powers/modify_player_model), [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) transformations and keyframes, [apoli:disguise](/docs/datapack/bientity-actions/disguise) / [apoli:disguise_as](/docs/datapack/entity-actions/disguise_as) player skins, and swings from [apoli:swing_hand](/docs/datapack/entity-actions/swing_hand). Hiding an arm with `modify_model_parts` hides it in first person too.

## Examples

```json
{
    "type": "apoli:show_both_arms"
}
```

The plain "see both hands" power: while your off hand is empty its arm is drawn next to your main arm.

```json
{
    "type": "apoli:show_both_arms",
    "main_hand": true,
    "off_hand": true,
    "condition": {
        "type": "apoli:power_active",
        "power": "example:combat_stance"
    }
}
```

Both arms stay visible while `example:combat_stance` is active, including the main arm while a weapon is held.
