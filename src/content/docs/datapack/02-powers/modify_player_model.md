---
title: "Modify Player Model (Power Type)"
description: "Replaces the holder's player model while the power is active — either with a custom model registered by an addon mod, or with a…"
navigation_title: "Modify Player Model"
---

Replaces the holder's player model while the power is active — either with a custom model registered by an addon mod, or with a [Figura](https://modrinth.com/mod/figura) avatar shipped in a resource pack.

Type ID: `apoli:modify_player_model`

> This is a client-side rendering power and only affects players. Equip/unequip is driven by the power's regular `condition` field: while the condition holds the model is applied, and when it fails (or the power is lost) the player's own model/avatar is restored.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`model` | [Identifier](/docs/datapack/data-types/identifier) | — | Which model to apply. Resolved against registered addon models first, then as a Figura avatar (see below).

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
- Every client that should see the model needs the avatar in its resources (ship it in the mod, or via server resource pack) and Figura installed. Without Figura (or if the `.nbt` is missing) the power does nothing and a warning is logged once.
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
