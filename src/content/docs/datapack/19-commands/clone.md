---
title: "Clone (Command)"
description: "Summons, lists and removes player clones from the command line."
navigation_title: "Clone"
---

Summons the same clone entity that [`apoli:summon_clone`](/docs/datapack/entity-actions/summon_clone) creates, straight from a command. It has no short alias, because `/clone` is a vanilla command.

A clone copies the owning player's skin, name and, optionally, equipment. It follows and fights for them, and despawns when its lifetime runs out.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `summon <owners> [<pos>] [<options>]` | Spawns clones of each owner. |
| `remove <owners> [<summon_id>]` | Discards an owner's clones. |
| `list <owners>` | Prints an owner's live clones. |

`<owners>` must be players, since a clone copies a player. Any other entity is skipped with a message.

## summon

```mcfunction
apoli:clone summon @s
apoli:clone summon @s ~ ~ ~5
apoli:clone summon @a ~ ~ ~ {count:3,lifetime:600,can_attack:false}
```

`<pos>` defaults to the owner's position, and the clones appear in the dimension the command runs in. `<options>` is an NBT compound in which every key is optional:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | Integer | `1` | How many clones to spawn per owner, from 1 to 64. |
| `lifetime` | Integer | `1200` | Ticks before the clone despawns. `-1` never despawns. |
| `can_attack` | Boolean | `true` | Whether the clone attacks the owner's targets. |
| `can_sit` | Boolean | `true` | Whether right-clicking the clone toggles sitting. |
| `follow_owner` | Boolean | `true` | Whether the clone follows its owner. |
| `slim` | Boolean | `false` | Uses the slim (3 pixel) arm model. |
| `inherit_equipment` | Boolean | `true` | Copies the owner's armour and held items. |
| `powers` | String or list of strings | _none_ | Powers granted to the clone under the `apoli:summon` source. |
| `summon_id` | String | _none_ | A tag you can pass to `remove` to target this batch. |
| `wide_texture` | String | _none_ | A skin texture override for the wide model. |
| `slim_texture` | String | _none_ | A skin texture override for the slim model. |

```mcfunction
apoli:clone summon @s ~ ~ ~ {count:2,summon_id:"example:shadow",powers:["example:shadow_glow"],lifetime:-1}
```

This summons two clones that never despawn, tagged `example:shadow` and holding `example:shadow_glow`.

## remove

```mcfunction
apoli:clone remove @s
apoli:clone remove @s example:shadow
```

Without a `summon_id`, every clone the owner has is discarded. With one, only clones carrying that ID are.

## list

```mcfunction
apoli:clone list @s
```

Prints each clone's UUID, owner, `summon_id`, lifetime and remaining lifetime, and returns the count.

> [!NOTE]
> `remove` and `list` search a 256-block box around each owner, in the dimension the command runs in, so clones in unloaded chunks or other dimensions aren't found.
