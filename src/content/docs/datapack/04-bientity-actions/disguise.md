---
title: "apoli:disguise"
description: "Disguises the actor as the target, capturing the target's type and NBT (so the actor appears identical to it)."
---

Disguises the **actor** as the **target**, capturing the target's type and NBT (so the actor appears identical to it). Ported from the Sync mod. Useful for "become whatever you hit/look at" powers.

Type ID: `apoli:disguise`

## Fields

| Field       | Type                                   | Default | Description                                                            |
| ----------- | -------------------------------------- | ------- | ---------------------------------------------------------------------- |
| `overwrite` | Boolean | `true`  | If `false`, does nothing when the actor is already disguised.          |
| `change_name` | Boolean | `true`  | Whether the disguise also changes the actor's shown name — nameplate, chat and multiplayer tab list. Set `false` to keep the original name. |

## Examples

```json
"bientity_action": {
    "type": "apoli:disguise"
}
```

The actor takes on the appearance of the target.


> Since 2026-07-10 a disguise also changes the actor's name in **chat** and the **multiplayer tab list** (not just the nameplate), unless `change_name` is `false`. An active [apoli:modify_label_render](/docs/datapack/powers/modify_label_render) takes priority over the disguise's name.

