---
title: Overview
description: What Apoli and Origins are, and how data packs fit in.
---

**Apoli** is a data-driven *power engine* for Minecraft. It doesn't add any content of its own — no items, no mobs, no origins. Instead it adds a vocabulary: a way to describe **powers** in JSON, and the machinery to attach those powers to entities and make them do things in-game.

**Origins** is an addon built on top of Apoli. It's the mod most players have heard of — pick an origin when you spawn, and it grants you a bundle of Apoli powers. But Origins is just one way to hand powers out. Anything Origins can do, your data pack can do too.

> If you're here to *play*, you want Origins. If you're here to *build*, you want Apoli — and that's what these docs are about.

## Why a power engine?

Before Apoli, a mod that wanted to give the player double jump, or fire immunity, or a custom hunger mechanic, had to be written in Java and compiled. Apoli turns those mechanics into **data**. A power is a JSON file. You can write one in a data pack, drop it in a world, and `/reload` — no code, no build step.

A single power can:

- change an [attribute](/docs/datapack/data-types/attribute-modifier) (speed, max health, attack damage…)
- run [actions](/docs/datapack/introduction/actions) when something happens — on hit, on use, on a keybind, over time
- gate itself behind [conditions](/docs/datapack/introduction/conditions) — only in rain, only at night, only while sneaking
- bundle other powers together with [`apoli:multiple`](/docs/datapack/powers/multiple)

## The three building blocks

Almost everything in Apoli is one of three things. Learn these and the rest is detail:

| Block         | What it is                                   | Example                             |
|---------------|----------------------------------------------|-------------------------------------|
| **Power**     | A thing an entity *has*. The top-level unit. | `apoli:attribute`, `apoli:multiple` |
| **Action**    | A thing that *happens*. Runs on a trigger.   | `apoli:heal`, `apoli:apply_effect`  |
| **Condition** | A yes/no *test*. Gates powers and actions.   | `apoli:sneaking`, `apoli:in_rain`   |

Powers, actions and conditions all share the same shape: a JSON object with a `"type"` field that names it, plus whatever fields that type needs.

## Where to go next

- New to data packs? Start with [Getting started](/docs/datapack/introduction/getting-started).
- Want the shape of a power? Read [Anatomy of a power](/docs/datapack/introduction/anatomy-of-a-power).
- Building for Java instead? See the [Addon docs](/docs/addon).
