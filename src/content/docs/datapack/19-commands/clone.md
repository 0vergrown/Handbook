---
title: "/apoli:clone"
description: "Summon, list and remove player clones from the command line."
---

Summons the same clone entity that [`apoli:summon_clone`](/docs/datapack/entity-actions/summon_clone) creates, straight from a command. There is no short alias — `/clone` is a vanilla command.

A clone copies the owning player's skin, name and (optionally) equipment, follows and fights for them, and despawns after its lifetime runs out.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `summon <owners> [<pos>] [<options>]` | Spawns clones of each owner. |
| `remove <owners> [<summon_id>]` | Discards an owner's clones. |
| `list <owners>` | Prints an owner's live clones. |

`<owners>` must select players — a clone copies a player.

## summon

```mcfunction
apoli:clone summon @s
apoli:clone summon @s ~ ~ ~5
apoli:clone summon @a ~ ~ ~ {count:3,lifetime:600,can_attack:false}
```

`<pos>` defaults to the owner's position. `<options>` is an NBT compound — every key is optional:

| Key | Type | Default | Purpose |
|-----|------|---------|---------|
| `count` | int | `1` | How many clones to spawn per owner (1–64). |
| `lifetime` | int | `1200` | Ticks before the clone despawns. `-1` never despawns. |
| `can_attack` | boolean | `true` | Whether the clone attacks the owner's targets. |
| `can_sit` | boolean | `true` | Whether right-clicking the clone toggles sitting. |
| `follow_owner` | boolean | `true` | Whether the clone follows its owner. |
| `slim` | boolean | `false` | Use the slim (3px) arm model. |
| `inherit_equipment` | boolean | `true` | Copy the owner's armour and held items. |
| `powers` | string or list of strings | none | Powers granted to the clone under the `apoli:summon` source. |
| `summon_id` | string | none | A tag you can pass to `remove` to target this batch. |
| `wide_texture` | string | none | Skin texture override for the wide model. |
| `slim_texture` | string | none | Skin texture override for the slim model. |

```mcfunction
apoli:clone summon @s ~ ~ ~ {count:2,summon_id:"example:shadow",powers:["example:shadow_glow"],lifetime:-1}
```

## remove

```mcfunction
apoli:clone remove @s
apoli:clone remove @s example:shadow
```

Without a `summon_id` every clone the owner has is discarded; with one only clones carrying that id are.

## list

```mcfunction
apoli:clone list @s
```

Prints each clone's UUID, owner, `summon_id` and lifetime, and returns the count.

> `summon` and `list` search a 256-block box around each owner, so clones in unloaded chunks or far-away dimensions are not found.

## See also

- [apoli:summon_clone](/docs/datapack/entity-actions/summon_clone)
- [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion)
- [Commands overview](/docs/datapack/commands/overview)
