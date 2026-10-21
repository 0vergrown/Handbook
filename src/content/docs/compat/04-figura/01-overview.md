---
title: Figura
description: "Pointing apoli:modify_player_model at a Figura avatar."
---

With [Figura](https://modrinth.com/mod/figura) installed, [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) can swap the holder's player model for a Figura avatar instead of a model shipped in your addon.

There are no Figura-specific type IDs. `modify_player_model` is a core power and always exists, and the Figura path is what its `model` field resolves to when Figura is present.

## Using it

Set `model` to the ID of a Figura avatar:

```json
{
  "type": "apoli:modify_player_model",
  "model": "example:my_avatar"
}
```

Apoli's own player models come first: if the ID names a model Apoli or an addon has registered, that model is used. Otherwise the ID is resolved to a compiled Figura avatar in the client resources, so `"model": "example:my_avatar"` loads `assets/example/figura_avatars/my_avatar.nbt`. If neither exists, the power does nothing and the player keeps their normal model. The [modify_player_model page](/docs/datapack/powers/modify_player_model) explains how to export an avatar to that `.nbt` file.

## Notes

- Rendering happens entirely on the client. Players without Figura see the normal model.
- Figura's own avatar permission settings still apply, and Apoli doesn't bypass them.
