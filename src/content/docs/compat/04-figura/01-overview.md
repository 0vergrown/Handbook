---
title: Figura
description: Point apoli:modify_player_model at a Figura avatar.
---

With [Figura](https://modrinth.com/mod/figura) installed, [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model) can swap the holder's player model for a Figura avatar instead of a model shipped in your addon.

There are no Figura-specific type ids. `modify_player_model` is a core power and always exists — the Figura path is just what its `model` field resolves to when Figura is present.

## Using it

Set `model` to the identifier of a Figura avatar:

```json
{
  "type": "apoli:modify_player_model",
  "model": "example:my_avatar"
}
```

Apoli looks the identifier up as a Figura avatar first, then falls back to a model bundled in a resource pack. If neither resolves, the power quietly does nothing and the player keeps their normal model.

## Notes

- Rendering is entirely client-side. Players without Figura see the fallback model, or no change at all.
- Figura's own avatar permission settings still apply — Apoli does not bypass them.

## See also

- [`apoli:modify_player_model`](/docs/datapack/powers/modify_player_model)
- [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) — Apoli's own Blockbench-model path, no Figura needed.
