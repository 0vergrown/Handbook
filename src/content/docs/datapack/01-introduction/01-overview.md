---
title: Overview
description: What Apoli and Origins are, and where data packs come in.
---

Apoli is a data-driven power engine for Minecraft. On its own it adds no items, mobs or origins. It adds a way to describe powers in JSON, and the code that attaches those powers to entities and makes them work in game.

Origins is an addon built on Apoli, and the mod most players know. A player picks an origin when they first spawn and gets that origin's set of Apoli powers. Origins is only one way to hand out powers, and a data pack can do anything Origins does.

If you only want to play, install Origins. These docs are about building things with Apoli.

## Why a power engine

Without Apoli, a mechanic like a double jump, fire immunity or a custom hunger system has to be written in Java and compiled into a mod. Apoli turns those mechanics into data. A power is a JSON file: you write it in a data pack, add the pack to a world and run `/reload`, with no code and no build step.

A single power can:

- change an [attribute](/docs/datapack/data-types/attribute-modifier) such as speed, max health or attack damage
- run [actions](/docs/datapack/introduction/actions) when something happens, for example on a hit, on use, on a key press or over time
- switch itself on only while its [conditions](/docs/datapack/introduction/conditions) hold, for example only in rain, only at night or only while sneaking
- bundle other powers together with [`apoli:multiple`](/docs/datapack/powers/multiple)

## Powers, actions and conditions

Most of what you write for Apoli is one of three kinds of object:

| Kind | What it is | Examples |
|------|------------|----------|
| Power | Something an entity has. Powers are the top-level unit. | `apoli:attribute`, `apoli:multiple` |
| Action | Something that happens when a trigger fires. | `apoli:heal`, `apoli:apply_effect` |
| Condition | A yes or no test that powers and actions check. | `apoli:sneaking`, `apoli:in_rain` |

All three have the same shape: a JSON object with a `"type"` field that names the type, plus the fields that type needs.

## Where to go next

- If you haven't made a data pack before, start with [Getting started](/docs/datapack/introduction/getting-started).
- [Anatomy of a power](/docs/datapack/introduction/anatomy-of-a-power) explains the JSON shape that every page in this reference uses.
- To extend Apoli from Java, read the [Addon docs](/docs/addon).
