---
title: "Reaching arms hold still, and edited arms show in first person"
description: "Apoli 1.114.0: override_animation on a reach stops the arm swinging, and an arm you edit for first person is drawn even while you hold something."
date: 2026-10-10
author: Overgrown
---

Apoli **1.114.0**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1, with Origins **1.47.5** built against it. Two follow-ups to [last release's `reach`](/blog/scale-fixes-ghost-arms-for-everyone-and-reaching-hands).

## A reach can hold still

Punching or using an item still swung a reaching arm in first person, carrying it away from its point. Set `override_animation` to `true` on the `reach` and the arm holds the pose instead, in every view; the item in that hand stops swinging with it, and [ghost arms](/docs/datapack/powers/show_both_arms) leave it alone. Without `override_animation` the first-person arm swings from its reach pose as before. See [Reaching for a point](/docs/datapack/data-types/model-part-transformation#reaching-for-a-point).

## Edited arms show in first person

Minecraft only draws your main arm in first person while that hand is empty, and never your off arm, so a first-person pose disappeared as soon as you picked something up. Now any arm that [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) edits in the `first_person` view is drawn there, next to whatever its hand is holding, the off arm included. Visibility edits and held-item edits don't count, so hiding an arm or turning an item doesn't make an arm appear.
