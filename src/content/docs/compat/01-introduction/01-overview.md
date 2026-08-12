---
title: Compatibility
description: The mods Apoli integrates with, and the extra types each one unlocks.
---

Apoli ships integrations with a handful of other mods. Each one is a **gated module**: install the other mod and Apoli registers extra power, action and condition types for it; leave it out and those types simply don't exist. Apoli never hard-depends on any of them.

## Supported mods

| Mod | Section | What it unlocks |
| --- | --- | --- |
| [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat) | [Simple Voice Chat](/docs/compat/simple-voice-chat/overview) | React to who is talking, how loudly, and what they say. |
| [Trinkets](https://modrinth.com/mod/trinkets) / [Accessories](https://modrinth.com/mod/accessories) / [Curios](https://modrinth.com/mod/curios) | [Accessories](/docs/compat/accessories/overview) | Accessory slots, equip/unequip control, slot conditions. |
| [Figura](https://modrinth.com/mod/figura) | [Figura](/docs/compat/figura/overview) | Point `apoli:modify_player_model` at a Figura avatar. |
| [Icarus](https://modrinth.com/mod/icarus) | [Icarus](/docs/compat/icarus/overview) | The `apoli:wings` flight power. |
| [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) | [Hardcore Revival](/docs/compat/hardcore-revival/overview) | Knockout / revive triggers, actions and a condition. |
| [Not Enough Recipe Book](https://modrinth.com/mod/notenoughrecipebook) | [Not Enough Recipe Book](/docs/compat/not-enough-recipe-book/overview) | No new types — keeps power-gated recipes working with the recipe book removed. |
| [3D Skin Layers](https://modrinth.com/mod/3dskinlayers) / [Ears](https://modrinth.com/mod/ears) | [Skin Rendering](/docs/compat/skin-rendering/overview) | No new types — makes their skin geometry follow the model and colour powers. |
| [Sable](https://github.com/ryanhcode/sable) | [Sable](/docs/compat/sable/overview) | No new types — makes `apoli:phasing` work on blocks Sable moved into a sub-level. |

## Two kinds of gating

**Registration-gated.** The type is only registered when the other mod is loaded. Using it in a data pack without that mod is a load error for that power, exactly like a typo'd type id. Everything under Accessories, Icarus and Hardcore Revival works this way.

**Behaviour-gated.** The type is always registered and always loads, but does nothing useful without the other mod — conditions read `false`, triggers never fire. The Simple Voice Chat types work this way, so a pack that uses them stays loadable on a server without voice chat.

Not Enough Recipe Book, Skin Rendering and Sable are neither: they add no types at all. They only change how existing types behave when the other mod is installed.

> Check the section for the mod you're targeting — each type page says which kind it is.

## Writing your own

If you are building an addon and want the same pattern for a mod Apoli doesn't cover, see [Writing compat](/docs/compat/writing-compat/gated-modules).
