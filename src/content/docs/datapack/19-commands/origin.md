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

Use `origins:empty` to clear a layer's origin while leaving the layer chosen.

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

`gui` reopens the choose-origin screen; `random` rolls one immediately, honouring the layer's `random_allows_unchoosable` setting. Both default to every unchosen layer when no layer is given, and to the command's own player when no targets are given.

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

`set`, `gui`, `random` and `storage` need permission level 2 (nodes `origins.command.origin.set`, `.gui`, `.random`, `.storage`). `has` and `get` are open to everyone.
