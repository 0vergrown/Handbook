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
`ghost_arms` | [Integer](/docs/datapack/data-types/integer) | `0` | How many extra "ghost" copies of each drawn arm to trail behind the live one while it swings. `0` disables the effect; the maximum is `16`.
`ghost_spacing` | [Float](/docs/datapack/data-types/float) | `0.12` | How far back each ghost sits, as a fraction of one swing. The *n*th ghost is drawn at the pose the arm held `n × ghost_spacing` of a swing ago, wrapping into the previous swing. Keep `ghost_arms × ghost_spacing` at or below `1.0`; copies further back than a whole swing are skipped.
`ghost_alpha` | [Float](/docs/datapack/data-types/float) | `0.35` | Opacity of the ghosts (0.0 – 1.0). They are drawn translucent so the live arm reads clearly through them.

## Ghost arms

Ghosts are copies of the same arm frozen at earlier points of the swing, so a single punch leaves a fanned trail behind it and a fast stream of swings blurs into a flurry — the anime "punch barrage". They only appear **while an arm is actually swinging**, and only on arms that are being drawn at all: the bare main arm vanilla draws for you, plus whichever arms `main_hand` / `off_hand` add. Drive the swings with [apoli:swing_hand](/docs/datapack/entity-actions/swing_hand) on a fast [apoli:action_over_time](/docs/datapack/powers/action_over_time) to keep the trail alive.

If several `show_both_arms` powers are active, the arms are the union of all of them and the ghost settings come from whichever power asks for the most ghosts.

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

```json
{
    "type": "apoli:show_both_arms",
    "main_hand": true,
    "ghost_arms": 6,
    "ghost_spacing": 0.14,
    "ghost_alpha": 0.3,
    "condition": {
        "type": "apoli:power_active",
        "power": "example:rush_attack"
    }
}
```

A punch barrage: while `example:rush_attack` is on, both fists are visible and each swing drags six translucent copies of itself behind it. Pair it with a power that swings the hands several times a second.

> To make both arms swing at once, run [apoli:swing_hand](/docs/datapack/entity-actions/swing_hand) twice in the same tick, once for each hand. This power only decides which arms are *drawn* in first person — the swing itself comes from the action.
