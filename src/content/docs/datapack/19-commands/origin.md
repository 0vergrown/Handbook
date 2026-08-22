---
title: "Origin (Command)"
description: "Set, query and reroll a player's origin, and manage stored origin data."
navigation_title: "Origin"
---

Manages which origin each player has in each [layer](/docs/datapack/origins/layers). Added by Origins, not Apoli, so it is only present when Origins is installed.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `set <targets> <layer> <origin>` | Assigns an origin. |
| `revoke <targets> <layer> [origin]` | Takes an origin back. Without `<origin>`, clears the layer and its granted pool. |
| `has <targets> <layer> <origin>` | Reports how many targets have it. |
| `get` | Prints every online player's origins. |
| `get <target> <layer>` | Prints one player's origin in a layer. |
| `gui [<targets>] [<layer>]` | Reopens the choose-origin screen. |
| `random [<targets>] [<layer>]` | Rerolls to a random origin. |
| `storage …` | Stores and re-applies origins and values. |

## set

```mcfunction
origin set @s origins:origin example:phoenix
origin set @a origins:origin origins:empty
```

Applies the origin's powers immediately, syncs it to every client, and fires the origin-chosen callbacks. It refuses layers and origins that do not exist, and origins that are not part of the given layer — unless the origin is marked `special`.

The origin is **pinned** to that layer: a [`revalidate` layer](/docs/datapack/origins/layers#keeping-vs-offering) will not re-derive it from its conditions afterwards. `origins:empty` clears the layer and drops the pin, handing it back to its conditions:

```mcfunction
origin set @s my_pack:device origins:empty
```

The return value is the number of targets that ended up on the requested origin, and any target that did not is named in a failure message — so a pack can tell a real assignment from one a layer's conditions overrode.

On a [swappable layer](/docs/datapack/origins/swapping) there is no origin to set, so `set` adds the origin to that player's granted pool instead, and `origins:empty` clears their whole granted list for that layer. A pool grant is not checked against the layer's `origins` list, so any loaded origin can be handed out this way.

## revoke

```mcfunction
origin revoke @s origins:origin example:wolf_form
origin revoke @s origins:origin
```

The first line takes one origin out of the player's granted pool for that layer, or clears the layer if that origin was their pick. The second takes everything — the pick and the whole pool. A player currently swapped into a revoked origin is dropped back to their own origin.

## has / get

```mcfunction
origin has @a origins:origin example:phoenix
origin get
origin get @s origins:origin
```

`has` prints `matched/total` and returns the matched count, so it drops into `/execute store`. For plain filtering the [`origin` selector option](/docs/datapack/commands/selectors) is usually shorter:

```mcfunction
execute as @a[origin=example:phoenix] run say I am reborn
```

## gui / random

```mcfunction
origin gui
origin gui @a
origin gui @a origins:origin
origin random @a
origin random @a origins:origin
```

`gui` reopens the choose-origin screen; `random` rolls one immediately, honouring the layer's `random_allows_unchoosable` setting. Both default to every unchosen layer when no layer is given, and to the command's own player when no targets are given. `random` skips [swappable layers](/docs/datapack/origins/swapping) — a pool is not a choice; roll one with [`origins:force_swap`](/docs/datapack/origins/force_swap) instead.

## storage

Origin storage is a per-player key/value store, used to stash an origin now and re-apply it later — body-swap powers, "remember what I was" mechanics, and the like. It is the command-side of [`origins:store_origin`](/docs/datapack/origins/store_origin) and [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin).

| Sub-command | What it does |
|-------------|--------------|
| `storage list <target>` | Prints every stored key. |
| `storage get <target> <key>` | Prints one stored value. |
| `storage store origin <target> <key> <source> [<layer>]` | Stores `<source>`'s origin under `<key>` on `<target>`. |
| `storage store value <target> <key> <value>` | Stores an arbitrary string. |
| `storage apply <target> <key> [<layer>]` | Applies a stored origin. |
| `storage clear <target> [<key>]` | Clears one key, or all of them. |
| `storage run <target> <command>` | Runs a command with `<key>` placeholders substituted from storage. |

```mcfunction
origin storage store origin @s previous @s
origin storage apply @s previous
origin storage list @s
```

## Permissions

`set`, `revoke`, `gui`, `random` and `storage` need permission level 2 (nodes `origins.command.origin.set` — shared by `revoke` — `.gui`, `.random`, `.storage`). `has` and `get` are open to everyone.
