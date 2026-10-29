---
title: Compatibility
description: "The mods Apoli integrates with, and what each integration adds."
---

Apoli ships integrations with a number of other mods. Each one is a gated module: install the other mod and Apoli adds types or changes its behaviour for it, and leave it out and nothing changes. Apoli never depends on any of them.

## Supported mods

| Mod | Section | What it adds |
| --- | --- | --- |
| [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat) | [Birdsong](/docs/compat/birdsong/overview) | Types from the Birdsong addon that react to who is talking, how loudly and what they say. |
| [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories), [Curios](https://modrinth.com/mod/curios) | [Accessories](/docs/compat/accessories/overview) | Accessory slots, control over equipping and unequipping, and slot conditions. |
| [Figura](https://modrinth.com/mod/figura) | [Figura](/docs/compat/figura/overview) | Lets `apoli:modify_player_model` use a Figura avatar. |
| [Icarus](https://modrinth.com/mod/icarus) | [Icarus](/docs/compat/icarus/overview) | The `apoli:wings` flight power. |
| [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) | [Hardcore Revival](/docs/compat/hardcore-revival/overview) | Knockout and revive triggers, actions and a condition. |
| [WoodWalkers](https://modrinth.com/mod/walkers) | [WoodWalkers](/docs/compat/woodwalkers/overview) | Conditions, actions and powers that read and drive a player's shape. |
| [Pufferfish's Skills](https://modrinth.com/mod/skills) | [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) | Apoli powers and resources as Skills rewards, and Skills categories as skill trees. |
| [KubeJS](https://modrinth.com/mod/kubejs) | [KubeJS](/docs/compat/kubejs/overview) | The scripting runtime behind the `apoli:script` types. |
| [Not Enough Recipe Book](https://modrinth.com/mod/notenoughrecipebook) | [Not Enough Recipe Book](/docs/compat/not-enough-recipe-book/overview) | No new types. Keeps power-gated recipes working with the recipe book removed. |
| [3D Skin Layers](https://modrinth.com/mod/3dskinlayers), [Ears](https://modrinth.com/mod/ears) | [Skin Rendering](/docs/compat/skin-rendering/overview) | No new types. Makes their skin geometry follow the model and colour powers. |
| [Entity Model Features](https://modrinth.com/mod/entity-model-features) and CEM packs | [Custom Entity Models](/docs/compat/custom-entity-models/overview) | No new types. Runs the render powers on top of packs like Fresh Animations. |
| Sodium, Lithium, Flywheel, BadOptimizations and others | [Performance Mods](/docs/compat/performance-mods/overview) | No new types. Keeps the render powers working with the mods that replace parts of vanilla rendering. |
| [Sable](https://github.com/ryanhcode/sable) | [Sable](/docs/compat/sable/overview) | No new types. Makes phasing, walking on fluid and ropes work with Sable's sub-levels. |
| [Better Combat](https://modrinth.com/mod/better-combat) | [Better Combat](/docs/compat/better-combat/overview) | No new types. Prevents a crash in its attack handling. |
| [Ledger](https://modrinth.com/mod/ledger), Indexor | [Block Logging](/docs/compat/block-logging/overview) | No new types. Names the power and origin behind a logged block edit. |
| [You're in Grave Danger](https://modrinth.com/mod/yigd) | [You're in Grave Danger](/docs/compat/youre-in-grave-danger/overview) | No new types. Puts power inventories in the grave and adds a grave inscription. |
| [Gravestones](https://modrinth.com/mod/pneumono_gravestones) | [Gravestones](/docs/compat/gravestones/overview) | No new types. The same for Pneumono's Gravestones. |
| [GraveStone Mod](https://modrinth.com/mod/gravestone-mod) | [GraveStone Mod](/docs/compat/gravestone-mod/overview) | No new types. The same for the GraveStone Mod on NeoForge. |

## Two kinds of gating

Registration-gated types are only registered when the other mod is loaded. Using one in a data pack without that mod is a load error for that power, exactly like a mistyped type ID. Everything under Accessories, Icarus, Hardcore Revival and WoodWalkers works this way.

Behaviour-gated types are always registered and always load, but do nothing useful without the other mod: conditions read `false` and triggers never fire. The KubeJS types work this way, so a pack that uses them stays loadable on a server without KubeJS. Birdsong's voice types are behaviour-gated on Simple Voice Chat, and the [Birdsong overview](/docs/compat/birdsong/overview#the-apoli-ids) explains what their IDs do on a server without Birdsong itself.

Pufferfish's Skills sits in between. Its reward types are only registered with Skills installed, but they live in Skills' own category files, so nothing in an Apoli pack fails to load without it. The other integrations add no types of their own, and only change how existing types behave when the other mod is installed.

> [!TIP]
> Check the section for the mod you are targeting, since each type page says which kind it is.

## Writing your own

If you are building an addon and want the same pattern for a mod Apoli doesn't cover, see [Writing compat](/docs/compat/writing-compat/gated-modules).
