---
title: Block Logging
description: "How Ledger and Indexor name the power and origin behind a block edit instead of only \"@explosion\"."
---

Grief inspection mods record what changed and who was standing there. When the edit came from a power, all they can say by themselves is `@explosion` or `@item_frame`, because as far as the game is concerned that is all that happened. Apoli tells them which power ran, and Origins tells them which origin that power came from.

Apoli registers no types for this. It is behaviour-gated: the integration installs itself when a supported logger is on the server and changes nothing when there isn't one.

| Logger | Loaders | What it shows |
| --- | --- | --- |
| [Ledger](https://modrinth.com/mod/ledger) (QuiltServerTools) | Fabric | The power (or `origin/power`) as the entry's source, in place of `explosion`, `player` and so on. |
| Indexor | Fabric, NeoForge | The acting player and the power, on entries the logger could only blame on `Environment`. |

Both mods use the mod ID `ledger`, so Apoli tells them apart by their classes instead of by ID, and checks that the methods and fields it needs have the shape it expects before installing anything. A logger version it doesn't recognise is left alone instead of broken.

## What an entry looks like

A player whose origin fires an explosive projectile blows a hole in someone's base. Ledger without Apoli shows:

```
[12:41] @explosion (Steve) removed Oak Planks at 118 64 -230
```

You know Steve was involved, but not whether he threw TNT, misclicked a bed or used a power. With Apoli:

```
[12:41] @blaze/fireball (Steve) removed Oak Planks at 118 64 -230
```

`blaze` is the origin and `fireball` is the power. The source is a real Ledger source you can search for, so `/ledger search source:blaze/fireball` finds every edit that power has ever made, and `/ledger rollback source:blaze/fireball` undoes them.

When the power wasn't granted by an origin, as with `/apoli:power grant`, an item or a skill tree, the source is the power's name alone.

## What counts as caused by a power

Anything the world logs while a power is running counts: the power's own tick, its key and callback actions, and anything those actions set off, including [`apoli:delay`](/docs/datapack/meta-actions/delay) and [`apoli:loop`](/docs/datapack/meta-actions/loop) chains, which carry the cause across the wait. Nested powers are credited to the innermost one that is running.

A normal block break by a player who only has powers is untouched, because the attribution only exists while the power itself is on the stack.

## Limits

Ledger's source column is 30 characters wide. An `origin/power` that doesn't fit is trimmed from the left, keeping the power name, which is the more specific half.

Indexor has no source column, so Apoli writes the player instead: an entry it could only blame on `Environment` gets the real player's UUID and a name reading `Steve (blaze/fireball)`. Entries that already name a player are left exactly as they were, so lookups by player keep matching. Neither integration touches the `extra_data` either mod stores, since that field holds the block entity NBT both of them replay on a rollback.

Attribution is a label. It doesn't change what a power is allowed to do. For that, use a claims or protection mod, or gate the power itself on an [entity condition](/docs/datapack/entity-conditions).

## Cost

When no supported logger is installed, the whole mechanism compiles down to a constant `false` check and the JIT removes it, so servers without one pay nothing. With one installed, it costs two array writes per power execution, and the label, the only part that looks anything up, is only built at the moment an entry is written to the log.
