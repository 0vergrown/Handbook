---
title: "Power Storage (Power Type)"
description: "Holds other powers in a set of slots and grants them to the holder for as long as they sit there."
navigation_title: "Power Storage"
---

Holds a list of other powers in a fixed number of slots. While a power sits in the storage the holder really has it — resources, cooldowns, HUD bars, keybinds and all — and loses it again the moment it is evicted. Think of it as a satchel you can steal an ability into.

Type ID: `apoli:power_storage`

Powers go in with [`apoli:store_power`](/docs/datapack/entity-actions/store_power), are read back with [`apoli:stored_power`](/docs/datapack/entity-conditions/stored_power), and can be fired explicitly with [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power).

> Storing is quiet by design — a power that does not pass the filters is skipped, not logged. Turn on [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) and every attempt to store or run says in chat what it did, or which of the checks below refused it.

> `tags` does double duty. Every power takes a top-level `tags` field, and `apoli:power_storage` reads the same key as its accept-filter — so `"tags": "contractable"` both restricts what may be stored **and** tags the storage itself `contractable`. That matters if something else selects powers by that tag: a [`apoli:store_power`](/docs/datapack/entity-actions/store_power) with `from_held` will see the storage in the holder's power list. A storage can never be stored inside a storage, so it cannot end up holding itself, but anything else reading that tag still counts it. Give the filter a tag you do not also use to mark the abilities themselves if you want them kept apart.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`slots` | [Integer](/docs/datapack/data-types/integer) | `0` | How many powers fit. `0` means unlimited.
`powers` | [Identifier](/docs/datapack/data-types/identifier) or list | *optional* | If set, only these power ids may be stored.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | If set, only powers carrying one of these tags may be stored. **This also tags the storage power itself** — see the note above.
`replace_oldest` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When the storage is full, drop the oldest entry to make room instead of refusing the new one.
`drop_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Empty the storage when the holder dies. Left `false`, the stored powers survive death and respawn.
`grant` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a stored power is granted to the holder. See [Granting powers vs. holding them](#granting-powers-vs-holding-them).
`own_key` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a stored power still answers the keybind it declares. Set it `false` and only [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) can fire what is in here.

The storage is also a resource: [`apoli:resource`](/docs/datapack/entity-conditions/resource) reads it as the number of powers currently stored, and `slots` is its maximum. That makes a HUD counter or a `$(key)` macro a one-liner.

## Granting powers vs. holding them

A stored power is **really granted**, with the storage power as its source. Its resources exist, its `action_over_time` sub-powers tick, its HUD bars draw, its keybinds answer unless `own_key` says otherwise, and a stored [`apoli:multiple`](/docs/datapack/powers/multiple) grants all of its sub-powers as normal. Evict it, clear the storage, or lose the storage power itself, and everything it brought is revoked with it.

That matters most for bundles. A power that keeps a charge, counts down a cooldown, or runs on an interval needs all of its machinery present, and an `apoli:multiple` is usually exactly that — one key ability plus the resources, timers and cooldown that drive it. Without the grant the key ability still fires, but everything underneath it is missing, so every branch that reads a resource takes the wrong path.

```json
{
    "type": "apoli:power_storage",
    "slots": 1,
    "tags": "contractable",
    "replace_oldest": true
}
```

This is the shape for a "steal another player's ability" mechanic: tag the abilities, store one with [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and `from_held`, and the thief has the whole thing until it is replaced.

> Because a stored power is genuinely granted, it answers its **own** keybind — [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) is for firing it from somewhere else, not a requirement. Set `own_key: false` when it should be the only way in; see [Who gets to press the key](#who-gets-to-press-the-key).

## Who gets to press the key

`own_key` is `true` by default: a stored power keeps the keybind it declares, so a three-slot satchel of spells works as a loadout with no extra wiring.

That is the wrong shape for stealing. A stolen ability arrives bound to whatever key its author chose, which is usually a key the thief already uses for something of their own — so one press fires both, and the ability you wired up to cast it is now the *second* way to do the same thing. Set `own_key: false` and the stored power is still fully granted — resources, cooldowns, HUD bars, `apoli:multiple` sub-powers, all of it — but its own key does nothing, and [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) is the only way to fire it.

```json
{
  "type": "apoli:power_storage",
  "slots": 1,
  "tags": "contractable",
  "replace_oldest": true,
  "own_key": false
}
```

This is not the same as [`apoli:prevent_key_press`](/docs/datapack/powers/prevent_key_press), which blocks a key for *everything* the holder has, including their own powers on that key. `own_key` silences only what came out of this storage, and it follows a stored [`apoli:multiple`](/docs/datapack/powers/multiple) down into its sub-powers, so a stolen bundle goes quiet as a unit.

> A power the holder has from somewhere else as well — their origin, say — keeps its key. `own_key` only silences a power whose every source is a storage that asks for it.

`grant: false` is the other mode, for a storage that is a list rather than a loadout. The power is held but **inert**: it does not tick, holds no resources, renders no HUD, and answers no keybind. Only `apoli:run_stored_power` makes it do anything, and only the parts of it a single activation can express — enough for a self-contained [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) or [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), and not enough for anything built out of several pieces. Cooldowns on inert powers are still kept running by the storage that holds them, including inside a stored `apoli:multiple`.

## As a resource

The storage reports how many powers it holds, so it works anywhere a resource does — HUD bars, `$(key)` macros, and [`apoli:resource`](/docs/datapack/entity-conditions/resource) comparisons. `slots` is its maximum when set.

It is writable too, which is the way to empty a storage from a command:

```
/apoli:resource set @s example:my_storage 0
```

`0` clears it; a smaller number keeps that many of the most recently stored powers and drops the rest.

An entry whose power no longer exists — the JSON was deleted, renamed, or its data pack disabled — does not count, is never fired, and is dropped the next time something is stored. A storage cannot be permanently clogged by a power that has gone away.

## Examples

A three-slot satchel that only accepts powers tagged `spell`, all three usable at once:

```json
{
  "type": "apoli:power_storage",
  "slots": 3,
  "tags": "spell",
  "replace_oldest": true
}
```

A spell book that carries its spells without granting them, to be cast through [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power):

```json
{
  "type": "apoli:power_storage",
  "slots": 3,
  "tags": "spell",
  "replace_oldest": true,
  "grant": false
}
```

An unlimited storage restricted to two named powers:

```json
{
  "type": "apoli:power_storage",
  "powers": ["example:fireball", "example:frost_nova"]
}
```

The storage empties itself when the power that declares it is taken away, so a revoked satchel leaves nothing behind for the next one to inherit.
