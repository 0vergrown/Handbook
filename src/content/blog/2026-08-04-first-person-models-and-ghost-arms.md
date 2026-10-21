---
title: First-person models, ghost arms, and a rope that reaches
description: "Apoli 1.22.0 draws Bedrock models on your own hands, adds a punch barrage effect to apoli:show_both_arms, makes apoli:creative_flight obey its condition, and fixes tethers that never used their max length."
date: 2026-08-04
author: Overgrown
---

Apoli 1.22.0 (Origins 1.11.0) is mostly about the things you see from inside your own head, plus two fixes for fields that quietly did nothing.

## Your Blockbench model, on your own hands

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) has always had a `show_first_person` field, and in geometry mode it has always been ignored. Build a pair of clawed gauntlets, bind them to `right_arm` and `left_arm`, and everyone on the server could see them except you.

Now `show_first_person: true` draws the model's arm bones, and everything nested under them, onto the vanilla first person arm, posed from the same bones the third person model uses. It only draws the arm bones, since first person draws one arm and that is all there is to draw on. The vanilla arm is still underneath, which is usually what you want for armour and gauntlets. Hide it with [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) when the model is meant to replace the arm instead of sitting over it.

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

There were two bugs in the same area, and both only showed up once the player moved.

A rig's second layer came away from its limb. Only the first bone naming a body part actually bound to it. A model with both `right_arm` and `right_sleeve`, or `head` and `hat_layer`, or `body` and `jacket`, all normal things to have in a Blockbench rig, animated one and left the other frozen at its rest pose. Standing still, it looked perfect. Sneak, raise a shield or wind up a trident, and the two halves of the limb pulled apart. Every bone that names a body part binds to it now.

Slim skins were half a pixel out. Apoli measures the vanilla animation as a change from the model's rest pose, and for slim players that rest pose was baked from the slim player layer. Slim arms sit at `y = 2.5`, but vanilla normalises the arms to the wide `y = 2.0` on every frame before animating them, so every arm-bound bone on a slim player sat half a pixel off. The rest pose is now always the wide bake, which is what vanilla actually animates from for both models.

A body part bone is also always lifted into the player's frame now, even when a group above it has a rotation, so it can never animate twice over. If that costs a bone its parent's rotation, the load log says which bone and which group.

## Ghost arms

[`apoli:show_both_arms`](/docs/datapack/powers/show_both_arms) gained three fields: `ghost_arms`, `ghost_spacing` and `ghost_alpha`.

A ghost is a see-through copy of the same arm, frozen at an earlier point of the swing. One punch trails a fan behind it, and a fast stream of swings blurs into a punch barrage.

```json
{
  "type": "apoli:show_both_arms",
  "main_hand": true,
  "ghost_arms": 6,
  "ghost_spacing": 0.14,
  "ghost_alpha": 0.3
}
```

They only appear while an arm is swinging, and only on arms that are drawn at all, so pair the power with [`apoli:swing_hand`](/docs/datapack/entity-actions/swing_hand) on a fast [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) or [`apoli:loop`](/docs/datapack/meta-actions/loop) to keep the trail going. They are drawn through the same code as your real arm, so everything that already changes how your arms look applies to them too: custom model renders, `model_color`, `modify_player_model`, `modify_model_parts` and disguise skins.

## Two fields that did nothing

[`apoli:creative_flight`](/docs/datapack/powers/creative_flight) ignored its condition. It granted flight when the power was added and then granted it again every tick without ever testing the condition, so a power that was supposed to give you flight while something was true just gave you flight. It now checks every tick. Fail the condition, or suppress the power, and flight goes away and you drop. Pass it again and it comes back. Creative and spectator mode are never touched.

`max_length` did nothing on a rope you can't reel. [`apoli:attach_rope`](/docs/datapack/entity-actions/attach_rope) created every rope at whatever distance its two ends happened to be apart, and only the reel keys could change that afterwards. That is right for a grapple, which you want taut the moment it bites. A tether isn't `controllable` and has no way to pay itself out, though, so `"max_length": 20` meant it was stuck at however far apart you were when it was cast.

Ropes that aren't `controllable` now start at `max_length`, and controllable ones still start taut. The new `start_length` field overrides either default when you want a taut tether or a slack grapple.
