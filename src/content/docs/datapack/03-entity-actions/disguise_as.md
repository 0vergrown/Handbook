---
title: "apoli:disguise_as"
description: "Makes the entity appear as another entity — a mob type, or a player."
---

Makes the entity appear as another entity — a mob type, or a player. Ported from the Sync mod (merging `disguise_as` and `disguise_as_player`). Client-side visual; the entity's actual type/behavior is unchanged.

Type ID: `apoli:disguise_as`

> **Alias:** `apoli:disguise_as_player` is the same action (use whichever reads better). Provide `entity_type` for a mob disguise, or `player_name`/`player_uuid` for a player disguise. Player disguises currently show the target's skin when that player is **online**; offline players and slim/wide model-swap are not yet supported.

## Fields

| Field           | Type                                         | Default    | Description                                                                                  |
| --------------- | -------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `entity_type`   | Identifier | _optional_ | The mob type to appear as (e.g. `minecraft:zombie`). Ignored if a player field is set.       |
| `player_name`   | String         | _optional_ | Name of the player to appear as. Resolved from the server's profile cache.                   |
| `player_uuid`   | String         | _optional_ | UUID of the player to appear as. Takes priority over `player_name`.                          |
| `nbt`           | NBT               | _optional_ | Extra NBT applied to the mob disguise (e.g. to set a variant or custom name).                |
| `overwrite`     | Boolean       | `true`     | If `false`, does nothing when the entity is already disguised.                               |
| `change_name`   | Boolean       | `true`     | Whether the disguise also changes the entity's shown name — nameplate, chat and multiplayer tab list. Set `false` to keep the original name. |
| `before_action` | Entity Action Type                           | _optional_ | Runs on the entity before the disguise is applied.                                           |
| `after_action`  | Entity Action Type                           | _optional_ | Runs on the entity after the disguise is applied.                                            |

## Examples

```json
"entity_action": {
    "type": "apoli:disguise_as",
    "entity_type": "minecraft:armor_stand"
}
```

Disguises the entity as an armor stand.

```json
"entity_action": {
    "type": "apoli:disguise_as_player",
    "player_name": "Notch"
}
```

Disguises the entity as the player "Notch" (shown with their skin if they are online).


> Since 2026-07-10 a disguise also changes the holder's name in **chat** and the **multiplayer tab list** (not just the nameplate), unless `change_name` is `false`. An active [apoli:modify_label_render](/docs/datapack/powers/modify_label_render) takes priority over the disguise's name.

