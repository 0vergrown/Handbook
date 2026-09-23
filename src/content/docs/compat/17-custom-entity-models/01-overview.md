---
title: Custom Entity Models
description: Running Apoli's render powers on top of Entity Model Features, Entity Texture Features and CEM packs like Fresh Animations.
---

[Entity Model Features](https://modrinth.com/mod/entity-model-features) (EMF) and [Entity Texture Features](https://modrinth.com/mod/entitytexturefeatures) (ETF) let a resource pack replace an entity's model, and animate it, with OptiFine CEM files — the `.jem` and `.jpm` files that packs such as [Fresh Animations](https://modrinth.com/mod/fresh-animations) and its Player Extension ship. The player you see is then EMF's model, posed by the pack's animation expressions rather than by vanilla's `setupAnim`.

Apoli's render powers work on top of that. This integration is **behaviour-gated and adds no types** — install EMF and a CEM pack and the powers you already have keep working.

## What follows what

| Apoli feature | With a CEM pack installed |
| --- | --- |
| [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) `texture` mode | drawn over the pack's model, in the pose the pack animated it into |
| `apoli:custom_model_render` `geometry` mode | bones bound to a body part follow the pack's animated part, not the vanilla one |
| [`apoli:model_color`](/docs/datapack/powers/model_color) | tints the pack's model |
| [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) | applied to the vanilla pose before the pack animates from it |
| [`apoli:prevent_feature_render`](/docs/datapack/powers/prevent_feature_render) | unchanged; it hides feature layers, not the model |

A CEM pack is free to put a part anywhere it likes. `apoli:custom_model_render` in `geometry` mode measures each body part against the **vanilla rest pose** and applies the difference to the bone bound to it, so a bone named `head` lands on the pack's head wherever the pack has moved it — including poses like Fresh Animations' crouch, which sits lower and leans less than vanilla's.

## Authoring a model that rides a CEM player

The [pivot rule](/docs/datapack/powers/custom_model_render) does not change: give every bone that names a body part the vanilla pivot for that part — `head`, `hat` and `body` at `[0, 24, 0]`, arms at `[±5, 22, 0]`, legs at `[±1.9, 12, 0]`. A bone pivoted somewhere else sweeps an arc the limb never takes, and a CEM pack's larger range of motion makes that more obvious, not less.

Bones that do **not** name a body part ride their parent, so a rig that hangs everything off one `head` bone follows the head as a unit and needs no other binding.

## Things worth knowing

> A CEM pack may read the vanilla pose to decide what the entity is doing. Fresh Animations' Player Extension recognises a crouch by the exact values vanilla writes for it (`body.rx == 0.5`, `body.ty == 3.2`, `head.ty == 4.2`). An [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) or [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) power that moves those parts changes what the pack sees, and the pack may stop recognising the pose. Rotating an arm or hiding a part is safe; re-posing the body or head is what to be careful with.

> Bones that a pack switches on the skin model — the `_wide_only` / `_thin_only` groups in Blockbench's player template — are not a convention Apoli reads. Every bone in a `.geo.json` is rendered, so keep only the arm pair you actually want in the file.

> Both mods are client-side. A dedicated server neither knows nor cares whether they are installed, so a pack using these powers stays loadable either way.
