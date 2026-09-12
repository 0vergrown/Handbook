---
title: "Power Storage (Power Type)"
description: "Holds other powers in a set of slots and grants them to the holder for as long as they sit there."
navigation_title: "Power Storage"
---

Holds a list of other powers in a fixed number of slots. While a power sits in the storage the holder really has it — resources, cooldowns, HUD bars, keybinds and all — and loses it again the moment it is evicted. Think of it as a satchel you can steal an ability into.

Type ID: `apoli:power_storage`

Powers go in with [`apoli:store_power`](/docs/datapack/entity-actions/store_power), are read back with [`apoli:stored_power`](/docs/datapack/entity-conditions/stored_power), and can be fired explicitly with [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power).

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

The storage is also a resource: [`apoli:resource`](/docs/datapack/entity-conditions/resource) reads it as the number of powers currently stored, and `slots` is its maximum. That makes a HUD counter or a `$(key)` macro a one-liner.

## Granting powers vs. holding them

A stored power is **really granted**, with the storage power as its source. Its resources exist, its `action_over_time` sub-powers tick, its HUD bars draw, its keybinds answer, and a stored [`apoli:multiple`](/docs/datapack/powers/multiple) grants all of its sub-powers as normal. Evict it, clear the storage, or lose the storage power itself, and everything it brought is revoked with it.

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

> Because a stored power is genuinely granted, it answers its **own** keybind — [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) is for firing it from somewhere else, not a requirement. A pack that wants the original key suppressed should say so with [`apoli:prevent_key_press`](/docs/datapack/powers/prevent_key_press).

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
