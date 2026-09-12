---
title: Block Logging
description: How Ledger and Indexor name the power and origin behind a block edit instead of just "@explosion".
---

Grief-inspection mods record *what* changed and *who* was standing there. When the edit came from a
power they had nothing better to say than `@explosion` or `@item_frame`, because as far as the game
is concerned that is all that happened. Apoli tells them which power ran, and Origins tells them
which origin that power came from.

Apoli registers **no types** for this. It is **behaviour-gated**: the integration installs itself
when a supported logger is on the server and changes nothing when one is not.

| Logger | Loaders | What it shows |
| --- | --- | --- |
| [Ledger](https://modrinth.com/mod/ledger) (QuiltServerTools) | Fabric | The power (or `origin/power`) as the entry's **source**, in place of `explosion`, `player`, and so on. |
| Indexor | Fabric, NeoForge | Fills in the acting player and the power on entries the logger could only attribute to `Environment`. |

Both mods use the mod id `ledger`, so Apoli identifies them by their classes rather than by id, and
checks that the methods and fields it needs are actually shaped the way it expects before installing
anything. A logger version it does not recognise is left alone rather than broken.

## What an entry looks like

A player with an origin that fires an explosive projectile blows a hole in someone's base. Ledger
without Apoli:

```
[12:41] @explosion (Steve) removed Oak Planks at 118 64 -230
```

You know Steve was involved. You do not know whether he threw a TNT, mis-clicked a bed, or used a
power. With Apoli:

```
[12:41] @blaze/fireball (Steve) removed Oak Planks at 118 64 -230
```

`blaze` is the origin, `fireball` is the power. The source is a real, searchable Ledger source, so
`/ledger search source:blaze/fireball` finds every edit that power has ever made, and
`/ledger rollback source:blaze/fireball` undoes them.

When the power was not granted by an origin — a `/apoli:power grant`, an item, a skill tree — the
source is just the power's name.

## What counts as "caused by a power"

Anything the world logs while a power is executing: the power's own tick, its key and callback
actions, and anything those actions set off, including
[`apoli:delay`](/docs/datapack/meta-actions/delay) and
[`apoli:loop`](/docs/datapack/meta-actions/loop) chains, which carry the cause across the wait.
Nested powers attribute to the innermost one that is running.

A normal block break by a player who merely *has* powers is untouched — the attribution only exists
while the power itself is on the stack.

## Limits

Ledger's source column is 30 characters wide. `origin/power` that does not fit is trimmed from the
left, keeping the power name, which is the more specific half.

Indexor has no source column, so Apoli writes the player instead: an entry it could only blame on
`Environment` becomes the real player's UUID and a name reading `Steve (blaze/fireball)`. Entries
that already name a player are left exactly as they were, so player lookups keep matching. Neither
integration touches the `extra_data` either mod stores — that field holds the block-entity NBT both
of them replay on a rollback.

Attribution is a label. It does not change what a power is allowed to do; for that, use a claims or
protection mod, or gate the power itself on an [Entity Condition](/docs/datapack/entity-conditions).

## Cost

When no supported logger is installed the whole mechanism compiles down to a constant `false` check
and the JIT removes it, so servers without one pay nothing. With one installed it is two array
writes per power execution, and the label — which is the only part that looks anything up — is built
only at the moment an entry is actually written to the log.
