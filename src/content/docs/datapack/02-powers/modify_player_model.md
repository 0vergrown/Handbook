---
title: "Modify Player Model (Power Type)"
description: "Replaces the holder's player model while the power is active — with one of Apoli's built-in models, an addon-registered model, or a…"
navigation_title: "Modify Player Model"
---

Replaces the holder's player model while the power is active — with one of Apoli's built-in models, a model registered by an addon mod, or a [Figura](https://modrinth.com/mod/figura) avatar shipped in a resource pack.

Type ID: `apoli:modify_player_model`

> This is a client-side rendering power and only affects players. Equip/unequip is driven by the power's regular `condition` field: while the condition holds the model is applied, and when it fails (or the power is lost) the player's own model/avatar is restored.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`model` | [Identifier](/docs/datapack/data-types/identifier) | — | Which model to apply. Resolved against the built-in and addon-registered models first, then as a Figura avatar (see below). `apoli:vanilla` keeps the player's normal shape.
`texture_location` | [Identifier](/docs/datapack/data-types/identifier) | the holder's own skin | Texture to draw the model with, first-person hand included.
`model_texture_location` | [Identifier](/docs/datapack/data-types/identifier) | the model's own | Texture for the parts of a model that are **not** drawn from the player skin — the horse half of `apoli:centaur`, for instance.
`animations` | [Model Animation](/docs/datapack/data-types/model-animation) | — | Bedrock clips played on top of the model's vanilla pose.

## Built-in models

Six models ship with Apoli itself, so `model` can name them without any addon:

Id | What it is
---|---
`apoli:four_arms` | A second pair of arms below the first. Both pairs follow the vanilla arm animation.
`apoli:six_arms` | Two extra pairs of arms below the first, fanned out from the shoulder. All three pairs follow the vanilla arm animation.
`apoli:stinkfly` | An insect stance: a two-segment abdomen, a forward-set head, and a second pair of legs that mirror the first.
`apoli:digi_legs` | Digitigrade legs — each leg becomes a thigh, shin and paw that fold like an animal's.
`apoli:centaur` | A centaur: the player's own head, torso and arms raised onto a four-legged horse body. The player's legs are hidden and the horse's legs walk in a trot driven by the player's own movement.
`apoli:vanilla` | The player's ordinary model, unchanged. Use it when you only want `texture_location` or `animations`.

They are real player models, so the holder's own skin is drawn on them (wide and slim are both baked), and armour, held items, the cape and every vanilla animation keep working.

The horse half of `apoli:centaur` is drawn from its own texture, `apoli:textures/entity/centaur/horse.png` — a standard 64 × 64 horse skin, so any horse texture drops straight in. Override it globally with a resource pack, or per power with `model_texture_location`.

The extra limbs each one adds can be targeted by name from [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) and from the `body_parts` list of [apoli:custom_model_render](/docs/datapack/powers/custom_model_render):

Model | Extra part names
---|---
`apoli:four_arms` | `right_second_arm`, `left_second_arm`, `right_second_sleeve`, `left_second_sleeve`
`apoli:six_arms` | `right_second_arm`, `left_second_arm`, `right_third_arm`, `left_third_arm`, and each one's `_sleeve`
`apoli:stinkfly` | `right_second_leg`, `left_second_leg`, `right_second_pants`, `left_second_pants`
`apoli:centaur` | `horse_body`, `horse_mane`, `horse_tail`, `front_left_leg`, `front_right_leg`, `back_left_leg`, `back_right_leg`, plus `horse_legs` for all four and `horse` for the whole lower half

`apoli:digi_legs` adds no new top-level parts — its thigh, shin and paw live inside `right_leg` and `left_leg`, so hiding or colouring a leg covers the whole limb.

> Armour is drawn by vanilla's own armour model, which only knows the seven humanoid parts. It follows the swapped model's head, body, arms and legs, but it is not reshaped: leg armour on `apoli:digi_legs` keeps its straight vanilla shape, and the extra limbs on `apoli:four_arms`, `apoli:six_arms` and `apoli:stinkfly` wear nothing. Hide the pieces you don't want with [apoli:prevent_feature_render](/docs/datapack/powers/prevent_feature_render).

## Textures

Leave `texture_location` out and the model wears the holder's own skin — that is what the built-in models are UV-mapped for, and it is why a player keeps their identity while transformed.

Set it when the model reaches past what a 64 × 64 skin covers:

```json
{
    "type": "apoli:modify_player_model",
    "model": "example:chimera",
    "texture_location": "example:textures/entity/chimera.png"
}
```

The texture applies to the third-person model and to the first-person hand. It does **not** resize the skin layout — a model whose UVs run past 64 × 64 needs a texture that matches, and the vanilla parts of that model still read from the vanilla skin regions.

Two powers gated on [apoli:player_model_type](/docs/datapack/entity-conditions/player_model_type) give you separate wide and slim textures, since the slim arms sample a narrower strip.

> A [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) in `texture` mode with `render_as_overlay: false`, and an active disguise from [apoli:disguise_as](/docs/datapack/entity-actions/disguise_as), both replace the skin outright and win over `texture_location`.

## Animations

`animations` takes the same clips as [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) — a Blockbench Bedrock export at `assets/<namespace>/animations/<path>.animation.json` — and plays them on the player's own body. Entries are read top to bottom and the first whose `condition` passes is the one that plays; see [Model Animation](/docs/datapack/data-types/model-animation) for `speed`, `loop` and the rest.

```json
{
    "type": "apoli:modify_player_model",
    "model": "apoli:vanilla",
    "animations": {
        "animation": "example:wings",
        "name": "hover"
    }
}
```

> **Every entry after the first conditional one is a fallback, and a fallback plays.** If the only clip that does anything visible carries a `condition`, then whenever that condition is false the *next* entry plays instead — and if that one is a subtle idle sway, the power looks completely dead. Put the conditional entries first and make the last, unconditional entry the one you want as the resting state, or gate the whole power with its own `condition` field instead.

Bone names are the vanilla part names — `head`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`, and the overlay names — matched case- and underscore-insensitively, so a clip authored against `RightArm` binds without renaming. The extra limbs of `apoli:four_arms`, `apoli:six_arms` and `apoli:stinkfly` are addressable by their own names too.

A pose that never changes is usually better baked into a model than animated. Reach for `animations` when the pose has to *move* or has to switch on a condition.

One extra name is recognised: a bone called **`root`** moves the whole model, which is how an avatar sits its wearer higher or further back. Only its `position` channel is read — rotating every part around its own pivot is not the same as rotating the model, so rotation and scale on `root` are ignored. The cape and ears do not follow it.

Keyframes are **added to** the pose the player already has, so an animated `right_arm` still swings as the player walks.

> **Porting a Figura avatar's animations.** Open its `.bbmodel` in Blockbench and export the animations (*File → Export → Bedrock Animation*), which writes exactly this format including the axis flips. Rename the avatar's root group to `root` so the whole-model offset survives. Figura's Lua is not ported — anything the avatar drove from a script has to become a `condition` on an entry.

## Vanilla animations come for free

You do not need to port walking, running, swimming, flying, sneaking or sleeping. The built-in and addon-registered models are real player models driven by the same vanilla code as an ordinary player, so every vanilla animation and pose already plays on them. `animations` is for the poses vanilla does *not* have.

## Combining with custom_model_render

[apoli:custom_model_render](/docs/datapack/powers/custom_model_render) layers on top of whichever model is being drawn, so the two powers stack. In `texture` mode the replacement skin is painted onto the swapped model instead of the vanilla one — that is how you give `apoli:digi_legs` a texture that is not the player's skin. In `geometry` mode the custom bones track the swapped model's live pose, so a geometry model bound to `body` or `right_arm` follows the new model.

## Figura avatars

If Figura is installed on the client and `model` is not a registered addon model, the identifier is resolved to a **compiled Figura avatar** in the client resources:

```
model: "mymod:werewolf"  →  assets/mymod/figura_avatars/werewolf.nbt
```

The avatar is applied to that player exactly the way the Figura wardrobe equips one — the full avatar loads (models, textures, animations, scripts, sounds), so anything a wardrobe-equipped avatar can do works here too. On unequip, Figura's own reload path brings back whatever the player had before (their local wardrobe avatar or their uploaded one).

**Producing the `.nbt` file:** author the avatar as usual in `figura/avatars/`, equip it in the wardrobe, then run Figura's export command:

```
/figura export avatar werewolf
```

This writes `figura/werewolf.nbt` — copy it to `assets/<namespace>/figura_avatars/<path>.nbt` in your mod or resource pack.

## Registered addon models

Client-side, addon mods can register model factories with `ApoliPlayerModels.register(id, factory)` (wide and slim variants are baked per renderer, like vanilla). A registered id takes priority over a Figura avatar of the same name and swaps the vanilla `PlayerModel` during rendering, keeping the player's skin texture.

## Notes

- If several `modify_player_model` powers are active, the **first active one wins**.
- The built-in models need nothing installed. A Figura avatar needs the avatar in every client's resources (ship it in the mod, or via server resource pack) and Figura installed. Without Figura (or if the `.nbt` is missing) the power does nothing and a warning is logged once.
- Reloading resources (F3+T) hot-swaps updated avatars, like Figura's own avatar hot-swap.
- Figura's panic mode (default keybind in Figura's settings) hides avatars as usual; the power re-applies once panic is turned off.

## Examples

```json
{
    "type": "apoli:modify_player_model",
    "model": "mymod:werewolf",
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

Applies the `assets/mymod/figura_avatars/werewolf.nbt` avatar while the player sneaks and restores the player's own model when they stop.

A built-in model needs nothing but the id:

```json
{
    "type": "apoli:modify_player_model",
    "model": "apoli:digi_legs"
}
```
