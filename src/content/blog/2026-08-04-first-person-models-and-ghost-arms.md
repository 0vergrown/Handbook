---
title: First-person models, ghost arms, and a rope that reaches
description: Apoli 1.22.0 draws Bedrock models on your own hands, adds a punch-barrage effect to Show Both Arms (Power Type), makes Creative Flight (Power Type) obey its condition, and fixes tethers that never used their max length.
date: 2026-08-04
author: Overgrown
---

Apoli **1.22.0** (Origins **1.11.0**) is mostly about the things you see from inside your own head plus two fixes for fields that quietly did nothing.

## Your Blockbench model, on your own hands

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) has always had a `show_first_person` field, and in **geometry mode** it has always been ignored. Build a pair of clawed gauntlets, bind them to `right_arm` and `left_arm`, and everyone in the server could see them except you.

Now `show_first_person: true` draws the model's arm bones (and everything nested under them) onto the vanilla first-person arm, posed from the same bones the third-person model uses. Only the arm bones: first person draws one arm, so that is all there is to draw on. The vanilla arm is still underneath, which is usually what you want for armour and gauntlets; hide it with [`Modify Model Parts (Power Type)`](/docs/datapack/powers/modify_model_parts) when the model is meant to replace the arm rather than sit over it.

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:gauntlets",
  "texture_location": "example:textures/entity/gauntlets.png",
  "render_type": "cutout_no_cull",
  "show_first_person": true
}
```

## Models that came apart when you crouched

Two bugs in the same area, both of which only showed up once the player *moved*.

**A rig's second layer detached from its limb.** Only the first bone naming a body part actually bound to it. A model with both `right_arm` and `right_sleeve` — or `head` and `hat_layer`, or `body` and `jacket`, all of which are normal things to have in a Blockbench rig, animated one and left the other frozen at its rest pose. Standing still, it looked perfect. Sneak, raise a shield, or wind up a trident and the two halves of the limb pulled apart. Every bone that names a body part binds to it now.

**Slim skins were half a pixel out.** Apoli measures the vanilla animation as a change from the model's rest pose. That rest pose was baked from the slim player layer for slim players — whose arms sit at `y = 2.5` but vanilla normalises the arms to the wide `y = 2.0` on every frame before animating them. So every arm-bound bone on a slim player sat half a pixel off. The rest pose is now always the wide bake, which is the basis vanilla actually animates from for both models.

A body-part bone is also now always lifted into the player's frame, even when a group above it carries a rotation, so it can never animate twice over. If that costs a bone its parent's rotation, the load log says which bone and which group.

## Ghost arms

[`Show Both Arms (Power Type)`](/docs/datapack/powers/show_both_arms) gained three fields: `ghost_arms`, `ghost_spacing` and `ghost_alpha`.

A ghost is a translucent copy of the same arm, frozen at an earlier point of the swing. One punch trails a fan behind it; a fast stream of swings blurs into the punch barrage.

```json
{
  "type": "apoli:show_both_arms",
  "main_hand": true,
  "ghost_arms": 6,
  "ghost_spacing": 0.14,
  "ghost_alpha": 0.3
}
```

They appear only while an arm is actually swinging, and only on arms that are drawn at all, so pair the power with [`Swing Hand (Entity Action Type)`](/docs/datapack/entity-actions/swing_hand) on a fast [`Action Over Time (Power Type)`](/docs/datapack/powers/action_over_time) or [`Loop (Meta Action Type)](/docs/datapack/meta-actions/loop) to keep the trail going. Because they are drawn through the same code path as your real arm, everything that already changes how your arms look applies to them too: custom model renders, `model_color`, `modify_player_model`, `modify_model_parts`, disguise skins.

## Two fields that did nothing

**[`apoli:creative_flight`](/docs/datapack/powers/creative_flight) ignored its condition.** It granted flight when the power was added and then re-granted it every tick without ever testing the condition, so a power that was supposed to give you flight *while* something was true just gave you flight. It now re-evaluates every tick, fail the condition (or suppress the power) and flight goes away and you drop; pass it again and it comes back. Creative and spectator mode are never touched.

**`max_length` did nothing on a rope you can't reel.** [`Attach Rope (Entity Action Type)`](/docs/datapack/entity-actions/attach_rope) created every rope at whatever distance its two ends happened to be apart, and only the reel keys could change that afterwards. That is right for a grapple, however, you want it taut the moment it bites but a tether is not `controllable` and has no way to pay itself out, so `"max_length": 20` meant "stuck at however far apart you were when it was cast".

Ropes that are not `controllable` now start at `max_length`. Controllable ones still start taut. The new `start_length` field overrides either default when you want a taut tether or a slack grapple.