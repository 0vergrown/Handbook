---
title: Cookbook
description: "Worked answers to the questions addon authors ask most."
---

The rest of the addon docs explain the API one piece at a time. This section answers questions in the shape people ask them, with code written against the real API.

Every recipe targets Fabric 1.21.1 with Mojang mappings, which is the main tree. Where another loader or version differs, the recipe says so, and [loaders and versions](/docs/addon/loaders/per-loader) collects the rest.

## Powers

| I want to | Recipe |
| --- | --- |
| Check whether an entity has a power right now | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#is-this-power-active) |
| Read the fields of whichever power matched | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#read-its-config) |
| Grant or revoke a power from code | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#grant-and-revoke) |
| Turn a power off without removing it | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#suppress-instead-of-revoke) |
| List everything one source grants | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#what-does-this-source-grant) |
| Remember per-entity state for my power | [Powers on an entity](/docs/addon/cookbook/powers-on-an-entity#per-entity-state) |

## Origins

| I want to | Recipe |
| --- | --- |
| Get all the powers of an origin | [Origins from Java](/docs/addon/cookbook/origins-from-java#all-the-powers-of-an-origin) |
| Find out which origin a player has | [Origins from Java](/docs/addon/cookbook/origins-from-java#which-origin-does-this-player-have) |
| Do it without depending on Origins | [Origins from Java](/docs/addon/cookbook/origins-from-java#without-depending-on-origins) |
| React when a player's origin changes | [Origins from Java](/docs/addon/cookbook/origins-from-java#react-to-a-change) |

## New types

| I want | Recipe |
| --- | --- |
| A new entity action | [Writing actions](/docs/addon/cookbook/writing-actions#an-entity-action) |
| An action that touches attacker and victim | [Writing actions](/docs/addon/cookbook/writing-actions#a-bi-entity-action) |
| An action on a block or an item stack | [Writing actions](/docs/addon/cookbook/writing-actions#a-block-action), [item action](/docs/addon/cookbook/writing-actions#an-item-action) |
| An action that takes a nested action | [Writing actions](/docs/addon/cookbook/writing-actions#taking-a-nested-action) |
| A new entity condition | [Writing conditions](/docs/addon/cookbook/writing-conditions#an-entity-condition) |
| A condition on an item stack | [Writing conditions](/docs/addon/cookbook/writing-conditions#an-item-condition) |
| A condition comparing two entities | [Writing conditions](/docs/addon/cookbook/writing-conditions#a-bi-entity-condition) |
| A condition on a damage source, fluid or biome | [Writing conditions](/docs/addon/cookbook/writing-conditions#the-read-only-flavours) |
| A field a pack author can write as a number or a formula | [Writing conditions](/docs/addon/cookbook/writing-conditions#accepting-an-expression) |

## Hooking the game

| I want to | Recipe |
| --- | --- |
| Make a vanilla method respect a power | [Hooking the game](/docs/addon/cookbook/hooking-the-game#the-shape-of-a-power-mixin) |
| Avoid fighting other mods for the same instruction | [Hooking the game](/docs/addon/cookbook/hooking-the-game#never-redirect-a-contested-call) |
| Only load a hook when another mod is present | [Hooking the game](/docs/addon/cookbook/hooking-the-game#gate-a-mixin-on-another-mod) |
| Keep the hook off the hot path | [Hooking the game](/docs/addon/cookbook/hooking-the-game#the-early-out-ladder) |

## Before you ship

Read [performance](/docs/addon/systems/performance). Apoli runs on servers with a lot of players and a lot of powers, and the difference between a recipe that returns early and one that doesn't is measured in whole ticks.
