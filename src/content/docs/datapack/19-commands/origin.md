---
title: "Origin (Command)"
description: "Sets, queries and rerolls a player's origin, and manages stored origin data."
navigation_title: "Origin"
---

Manages which origin each player has in each [layer](/docs/datapack/origins/layers). The command comes from Origins, so it only exists when Origins is installed.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `set <targets> <layer> <origin>` | Assigns an origin. |
| `revoke <targets> <layer> [origin]` | Takes an origin back. Without `<origin>`, it clears the layer and its granted pool. |
| `has <targets> <layer> <origin>` | Reports how many targets have it. |
| `get` | Prints every online player's origins. |
| `get <target> <layer>` | Prints one player's origin in a layer. |
| `gui [<targets>] [<layer>]` | Clears every layer and opens the choose origin screen again. |
| `gui unchosen [<targets>]` | Opens the screen only for layers that are still unchosen, and changes nothing else. |
| `random [<targets>] [<layer>]` | Rerolls to a random origin. |
| `orb [<targets>] <layer> [<origin>]` | Gives an Orb of Origin bound to that layer. |
| `cap [list] [<layer>]` | Lists every capped origin with its holders. |
| `cap clear [<layer>] [<origin>]` | Releases recorded origin claims. |
| `storage …` | Stores origins and values, and applies them again. |

## set

```mcfunction
origin set @s origins:origin example:phoenix
origin set @a origins:origin origins:empty
```

Applies the origin's powers straight away, syncs it to every client, and runs the origin chosen callbacks. It refuses layers and origins that don't exist, and origins that aren't part of the given layer, except `origins:empty`, which works on any layer.

The origin is pinned to that layer, so a [`revalidate` layer](/docs/datapack/origins/layers#keeping-vs-offering) doesn't derive it from its conditions again afterwards. `origins:empty` clears the layer and drops the pin, handing the layer back to its conditions:

```mcfunction
origin set @s my_pack:device origins:empty
```

The return value is the number of targets that ended up on the requested origin, and any target that didn't is named in a failure message, so a pack can tell a real assignment from one that a layer's conditions overrode.

On a [swappable layer](/docs/datapack/origins/swapping) there is no origin to set, so `set` adds the origin to that player's granted pool instead, and `origins:empty` clears their whole granted list for that layer. A pool grant isn't checked against the layer's `origins` list, so any loaded origin can be handed out this way.

## revoke

```mcfunction
origin revoke @s origins:origin example:wolf_form
origin revoke @s origins:origin
```

The first line takes one origin out of the player's granted pool for that layer, or clears the layer if that origin was their pick. The second takes everything, the pick and the whole pool. A player currently swapped into a revoked origin goes back to their own origin.

## has and get

```mcfunction
origin has @a origins:origin example:phoenix
origin get
origin get @s origins:origin
```

`has` prints `matched/total` and returns the matched count, so it works with `/execute store`. For plain filtering, the [`origin` selector option](/docs/datapack/commands/selectors) is usually shorter:

```mcfunction
execute as @a[origin=example:phoenix] run say I am reborn
```

## gui and random

```mcfunction
origin gui
origin gui @a
origin gui @a origins:origin
origin gui unchosen @a
origin random @a
origin random @a origins:origin
```

`gui` clears every layer first, then opens the screen on the first layer that has anything to choose. That is the same reset the [Orb of Origin](/docs/datapack/origins/overview) does, so it works on a player who already has an origin on every layer. Name a `<layer>` and only that layer's screen opens, leaving the rest alone.

`gui unchosen` keeps every pick. It opens the screen only when a layer is still unchosen, and does nothing if the player has picked on every layer. Use it to finish setting up, and `gui` to start over.

`random` rolls an origin straight away, following the layer's `allow_unchoosable` random setting. With no layer given it covers every unchosen layer, and with no targets given it applies to the player running the command. `random` skips [swappable layers](/docs/datapack/origins/swapping), because a pool isn't a choice, so roll one with [`origins:force_swap`](/docs/datapack/origins/force_swap) instead.

## orb

Gives an [Orb of Origin](/docs/datapack/origins/overview) bound to one layer, instead of the plain orb that clears every layer at once.

```mcfunction
origin orb origins:origin
origin orb @a my_pack:device
origin orb @a my_pack:device example:phoenix
```

With only a layer, using the orb clears that one layer and opens its choose origin screen, and every other layer the player has is left untouched. Add an `<origin>` and the orb sets that layer to that origin directly, with no screen. That makes it a one-use ticket for a specific origin, which isn't otherwise available as an item.

The orb carries the layer and origin in its item data, so it stacks to one, keeps working after being dropped or traded, and shows what it does in its tooltip. Targets default to the player running the command, and an orb that doesn't fit in the inventory is dropped at the player's feet.

Swappable layers are refused, since there is no origin to choose in a pool. The layer and, when given, the origin must both be loaded.

## cap

Inspects and edits the record behind [origin caps](/docs/datapack/origins/overview#capping-an-origin), the list of who holds which capped origin, kept in the world save so offline players keep their slot.

```mcfunction
origin cap
origin cap list origins:origin
origin cap clear origins:origin example:dragonborn
origin cap clear origins:origin
origin cap clear
```

`list` prints one line per capped origin, as `<layer> / <origin>: taken/limit [names]`, in red when it is full. It only lists origins that declare a cap, so an empty result means nothing on that layer is capped. The return value is the number of lines printed.

`clear` releases claims: the whole record with no arguments, one layer with a layer, or one origin with a layer and an origin. Every online player's claims are recorded again straight afterwards, so clearing only frees the slots held by offline players, and an online holder keeps theirs until they change origin. That makes it the tool for taking an origin back from someone who has left the server for good.

## storage

Origin storage is a key and value store for each player, used to put an origin aside and apply it again later, for body swap powers, "remember what I was" mechanics and the like. It is the command side of [`origins:store_origin`](/docs/datapack/origins/store_origin) and [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin).

| Sub-command | What it does |
| --- | --- |
| `storage list <target>` | Prints every stored key. |
| `storage get <target> <key>` | Prints one stored value. |
| `storage store origin <target> <key> <source> [<layer>]` | Stores the origin of `<source>` under `<key>` on `<target>`. |
| `storage store value <target> <key> <value>` | Stores any string. |
| `storage apply <target> <key> [<layer>]` | Applies a stored origin. |
| `storage clear <target> [<key>]` | Clears one key, or all of them. |
| `storage run <target> <command>` | Runs a command with `[key]` placeholders filled in from storage. |

```mcfunction
origin storage store origin @s previous @s
origin storage apply @s previous
origin storage list @s
```

## Permissions

`set`, `revoke`, `gui`, `random`, `orb`, `cap` and `storage` need permission level 2. Their nodes are `origins.command.origin.set` (which `revoke` shares), `origins.command.origin.gui`, `origins.command.origin.random`, `origins.command.origin.orb`, `origins.command.origin.cap` and `origins.command.origin.storage`. Anyone can run `has` and `get`.
