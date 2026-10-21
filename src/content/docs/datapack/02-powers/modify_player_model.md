---
title: "Modify Player Model (Power Type)"
description: "Replaces the holder's player model with a built-in model, an addon model or a Figura avatar while the power is active."
navigation_title: "Modify Player Model"
---

Replaces the holder's player model while the power is active. The new model can be one of Apoli's built-in models, a model registered by an addon mod, or a [Figura](https://modrinth.com/mod/figura) avatar shipped in a resource pack.

Type ID: `apoli:modify_player_model`

> [!NOTE]
> This is a client-side rendering power and only affects players. The power's regular `condition` field equips and unequips the model: while the condition holds the model is applied, and when it fails (or the power is lost) the player's own model or avatar comes back.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Which model to apply. Built-in and addon models are checked first, then Figura avatars (see below). `apoli:vanilla` keeps the player's normal shape. |
| `texture_location` | [Identifier](/docs/datapack/data-types/identifier) | the model's own | Texture for the parts of a model that aren't drawn from the player's skin, such as the horse half of `apoli:centaur`. The skin itself is never replaced (see [Textures](#textures)). |
| `model_texture_location` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Another name for `texture_location`. When both are set, this one is used. |
| `animations` | [Model Animation](/docs/datapack/data-types/model-animation) | _optional_ | Bedrock clips played on top of the model's vanilla pose. |

## Built-in models

Six models ship with Apoli itself, so `model` can name them without any addon:

| ID | What it is |
| --- | --- |
| `apoli:four_arms` | A second pair of arms below the first. Both pairs follow the vanilla arm animation. |
| `apoli:six_arms` | Two extra pairs of arms below the first, fanned out from the shoulder. All three pairs follow the vanilla arm animation. |
| `apoli:stinkfly` | An insect stance: a two-segment abdomen, a head set forward, and a second pair of legs that mirror the first. |
| `apoli:digi_legs` | Digitigrade legs. Each leg becomes a thigh, shin and paw that fold like an animal's. |
| `apoli:centaur` | The player's own head, torso and arms raised onto a four-legged horse body. The player's legs are hidden, and the horse's legs trot with the player's own movement. |
| `apoli:vanilla` | The player's ordinary model, unchanged. Use it when you only want `animations`. |

They are real player models, so the holder's own skin is drawn on them (wide and slim are both baked), and armour, held items, the cape and every vanilla animation keep working.

The horse half of `apoli:centaur` is drawn from its own texture, `apoli:textures/entity/centaur/horse.png`. It is a standard 64 × 64 horse skin, so any horse texture drops straight in. Override it for everyone with a resource pack, or per power with `texture_location`.

The extra limbs each model adds can be targeted by name from [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) and from the `body_parts` list of [apoli:custom_model_render](/docs/datapack/powers/custom_model_render):

| Model | Extra part names |
| --- | --- |
| `apoli:four_arms` | `right_second_arm`, `left_second_arm`, `right_second_sleeve`, `left_second_sleeve` |
| `apoli:six_arms` | `right_second_arm`, `left_second_arm`, `right_third_arm`, `left_third_arm`, and each one's `_sleeve` |
| `apoli:stinkfly` | `right_second_leg`, `left_second_leg`, `right_second_pants`, `left_second_pants` |
| `apoli:centaur` | `horse_body`, `horse_mane`, `horse_tail`, `front_left_leg`, `front_right_leg`, `back_left_leg`, `back_right_leg`, plus `horse_legs` for all four and `horse` for the whole lower half |

`apoli:digi_legs` adds no new top-level parts. Its thigh, shin and paw live inside `right_leg` and `left_leg`, so hiding or colouring a leg covers the whole limb.

> [!NOTE]
> Armour is drawn by vanilla's own armour model, which only knows the seven humanoid parts. It follows the swapped model's head, body, arms and legs without being reshaped: leg armour on `apoli:digi_legs` keeps its straight vanilla shape, and the extra limbs on `apoli:four_arms`, `apoli:six_arms` and `apoli:stinkfly` wear nothing. Hide the pieces you don't want with [apoli:prevent_feature_render](/docs/datapack/powers/prevent_feature_render).

## Textures

The parts of a model that come from the player (the head, body, arms and legs of every built-in model) always wear the holder's own skin, which is why a player keeps their identity while transformed. `texture_location` paints only the parts a model adds that aren't drawn from the skin, such as the horse half of `apoli:centaur`:

```json
{
    "type": "apoli:modify_player_model",
    "model": "apoli:centaur",
    "texture_location": "example:textures/entity/zebra_centaur.png"
}
```

The texture only has to cover those parts. For the centaur, that is a standard 64 × 64 horse skin. Models without such parts (`apoli:vanilla`, `apoli:four_arms`, `apoli:six_arms`, `apoli:stinkfly` and `apoli:digi_legs`) have nothing for it to paint.

To give the player a different skin, pair the model with an [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) in `texture` mode. It paints whichever model is being drawn, extra limbs included, and `show_first_person` carries it onto the first person hand:

```json
{
    "type": "apoli:multiple",
    "model": {
        "type": "apoli:modify_player_model",
        "model": "apoli:four_arms"
    },
    "skin": {
        "type": "apoli:custom_model_render",
        "texture_location": "example:textures/entity/four_armed_yeti.png",
        "show_first_person": true
    }
}
```

`custom_model_render` also takes separate `wide_texture_location` and `slim_texture_location` textures, since the slim arms sample a narrower strip of the skin.

> [!NOTE]
> An active disguise from [apoli:disguise_as](/docs/datapack/entity-actions/disguise_as) replaces the whole appearance and wins over both.

## Animations

`animations` takes the same clips as [apoli:custom_model_render](/docs/datapack/powers/custom_model_render), a Blockbench Bedrock export at `assets/<namespace>/animations/<path>.animation.json`, and plays them on the player's own body. Entries are read top to bottom and the first whose `condition` passes is the one that plays. See [Model Animation](/docs/datapack/data-types/model-animation) for `speed`, `loop` and the rest.

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

> [!WARNING]
> Every entry after the first conditional one is a fallback, and a fallback plays. If the only clip that does anything visible has a `condition`, then whenever that condition is false the next entry plays instead, and if that one is a subtle idle sway, the power looks dead. Put the conditional entries first and make the last, unconditional entry the resting state you want, or gate the whole power with its own `condition` field.

Bone names are the vanilla part names (`head`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg` and the overlay names), matched ignoring case and underscores, so a clip written against `RightArm` binds without renaming. The extra limbs of `apoli:four_arms`, `apoli:six_arms` and `apoli:stinkfly` can be addressed by their own names too.

A pose that never changes is usually better baked into a model than animated. Use `animations` when the pose has to move or has to switch on a condition.

One extra name is recognised: a bone called `root` moves the whole model, which is how an avatar sits its wearer higher or further back. Only its `position` channel is read. Rotating every part around its own pivot isn't the same as rotating the model, so rotation and scale on `root` are ignored. The cape and ears don't follow it.

Keyframes are added to the pose the player already has, so an animated `right_arm` still swings as the player walks.

> [!TIP]
> To port a Figura avatar's animations, open its `.bbmodel` in Blockbench and export the animations with File > Export > Bedrock Animation, which writes exactly this format including the axis flips. Rename the avatar's root group to `root` so the whole-model offset survives. Figura's Lua isn't ported, so anything the avatar drove from a script has to become a `condition` on an entry.

## Vanilla animations already work

You don't need to port walking, running, swimming, flying, sneaking or sleeping. The built-in and addon models are real player models driven by the same vanilla code as an ordinary player, so every vanilla animation and pose already plays on them. `animations` is for the poses vanilla doesn't have.

## Combining with custom_model_render

[apoli:custom_model_render](/docs/datapack/powers/custom_model_render) layers on top of whichever model is being drawn, so the two powers stack. In `texture` mode the replacement skin is painted onto the swapped model instead of the vanilla one, which is how you give `apoli:digi_legs` a texture other than the player's skin. In `geometry` mode the custom bones track the swapped model's live pose, so a geometry model bound to `body` or `right_arm` follows the new model.

## Figura avatars

If Figura is installed on the client and `model` isn't a registered addon model, the ID is resolved to a compiled Figura avatar in the client resources. `"model": "mymod:werewolf"` loads `assets/mymod/figura_avatars/werewolf.nbt`.

The avatar is applied to that player exactly the way the Figura wardrobe equips one. The full avatar loads (models, textures, animations, scripts and sounds), so anything a wardrobe avatar can do works here too. On unequip, Figura's own reload path brings back whatever the player had before, either their local wardrobe avatar or their uploaded one.

To produce the `.nbt` file, build the avatar as usual in `figura/avatars/`, equip it in the wardrobe, then run Figura's export command:

```
/figura export avatar werewolf
```

This writes `figura/werewolf.nbt`. Copy it to `assets/<namespace>/figura_avatars/<path>.nbt` in your mod or resource pack.

## Registered addon models

On the client, addon mods can register model factories with `ApoliPlayerModels.register(id, factory)`. Wide and slim variants are baked per renderer, like vanilla. A registered ID takes priority over a Figura avatar of the same name and swaps the vanilla `PlayerModel` during rendering, keeping the player's skin texture.

## Notes

- If several `modify_player_model` powers are active, the first active one wins.
- The built-in models need nothing installed. A Figura avatar needs Figura installed and the avatar in every client's resources (ship it in the mod or in a server resource pack). Without Figura, or if the `.nbt` is missing, the power does nothing and a warning is logged once.
- Reloading resources (F3+T) swaps in updated avatars, like Figura's own avatar hot swap.
- Figura's panic mode (its keybind is in Figura's settings) hides avatars as usual, and the power applies again once panic mode is off.

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

This applies the `assets/mymod/figura_avatars/werewolf.nbt` avatar while the player sneaks, and restores the player's own model when they stop.

A built-in model needs nothing but the ID:

```json
{
    "type": "apoli:modify_player_model",
    "model": "apoli:digi_legs"
}
```
