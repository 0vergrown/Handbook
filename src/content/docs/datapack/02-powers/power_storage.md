---
title: "Power Storage (Power Type)"
description: "Holds other powers in a set of slots and grants them to the entity for as long as they stay there."
navigation_title: "Power Storage"
---

Holds a list of other powers in a fixed number of slots. While a power sits in the storage, the entity with the storage has it, with its resources, cooldowns, HUD bars and keybinds, and loses it again as soon as it is evicted. It works like a satchel you can steal an ability into.

Type ID: `apoli:power_storage`

Powers go in with [`apoli:store_power`](/docs/datapack/entity-actions/store_power), are read back with [`apoli:stored_power`](/docs/datapack/entity-conditions/stored_power), and can be fired directly with [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power).

> [!TIP]
> Storing is quiet by design: a power that doesn't pass the filters is skipped, not logged. Turn on [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) and every attempt to store or run a power says in chat what it did, or which of the checks below refused it.

> [!WARNING]
> `tags` does two jobs. Every power takes a top-level `tags` field, and `apoli:power_storage` reads the same key as its filter, so `"tags": "contractable"` both limits what can be stored and tags the storage itself `contractable`. That matters if something else selects powers by that tag. A [`apoli:store_power`](/docs/datapack/entity-actions/store_power) with `from_held` sees the storage in the entity's power list. A storage can never be stored inside a storage, so it can't end up holding itself, but anything else reading that tag still counts it. To keep them apart, give the filter a tag you don't also use to mark the abilities themselves.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `slots` | [Integer](/docs/datapack/data-types/integer) | `0` | How many powers fit. `0` means unlimited. |
| `powers` | [Identifier](/docs/datapack/data-types/identifier) or a list of them | _optional_ | If set, only these power IDs can be stored. |
| `tags` | [String](/docs/datapack/data-types/string) or a list of them | _optional_ | If set, only powers with one of these tags can be stored. This also tags the storage power itself, as the warning above explains. |
| `replace_oldest` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When the storage is full, drops the oldest entry to make room instead of refusing the new one. |
| `drop_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Empties the storage when the entity dies. With `false`, the stored powers survive death and respawning. |
| `grant` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a stored power is granted to the entity. See [Granting powers vs. holding them](#granting-powers-vs-holding-them). |
| `own_key` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a stored power still answers the keybind it declares. Set it to `false` and only [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) can fire what is in the storage. |

The storage is also a resource. [`apoli:resource`](/docs/datapack/entity-conditions/resource) reads it as the number of powers stored, with `slots` as its maximum, so a HUD counter or a `$(key)` macro takes one line.

## Granting powers vs. holding them

A stored power is granted for real, with the storage power as its source. Its resources exist, its `action_over_time` sub-powers tick, its HUD bars draw, its keybinds answer unless `own_key` says otherwise, and a stored [`apoli:multiple`](/docs/datapack/powers/multiple) grants all of its sub-powers as usual. Evict it, clear the storage or lose the storage power itself, and everything it brought is revoked with it.

That matters most for bundles. A power that keeps a charge, counts down a cooldown or runs on an interval needs all of its parts present, and an `apoli:multiple` is usually exactly that: one key ability plus the resources, timers and cooldown that drive it. Without the grant the key ability still fires, but everything underneath it is missing, so every branch that reads a resource takes the wrong path.

```json
{
    "type": "apoli:power_storage",
    "slots": 1,
    "tags": "contractable",
    "replace_oldest": true
}
```

This is the shape for stealing another player's ability. Tag the abilities, store one with [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and `from_held`, and the thief has the whole ability until it is replaced.

> [!NOTE]
> Because a stored power is granted for real, it answers its own keybind, and [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) is for firing it from somewhere else, not a requirement. Set `own_key: false` when that action should be the only way to fire it. See [Who gets to press the key](#who-gets-to-press-the-key).

## Who gets to press the key

`own_key` is `true` by default, so a stored power keeps the keybind it declares, and a three-slot satchel of spells works as a loadout with no extra setup.

That doesn't suit stealing. A stolen ability arrives bound to whatever key its author chose, which is usually a key the thief already uses for something of their own. One press then fires both, and the ability you set up to cast it becomes a second way to do the same thing. Set `own_key: false` and the stored power is still fully granted, with its resources, cooldowns, HUD bars and `apoli:multiple` sub-powers, but its own key does nothing, and [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) is the only way to fire it.

```json
{
  "type": "apoli:power_storage",
  "slots": 1,
  "tags": "contractable",
  "replace_oldest": true,
  "own_key": false
}
```

[`apoli:prevent_key_press`](/docs/datapack/powers/prevent_key_press) is different: it blocks a key for everything the entity has, including its own powers on that key. `own_key` only silences what came out of this storage, and it follows a stored [`apoli:multiple`](/docs/datapack/powers/multiple) down into its sub-powers, so a stolen bundle goes quiet as a whole.

> [!NOTE]
> A power the entity also has from somewhere else, such as its origin, keeps its key. `own_key` only silences a power whose every source is a storage that asks for it.

`grant: false` is the other mode, for a storage that is a list instead of a loadout. The power is held but does nothing on its own: it doesn't tick, holds no resources, renders no HUD and answers no keybind. Only `apoli:run_stored_power` makes it do anything, and only the parts of it that a single activation can express. That is enough for a self-contained [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) or [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), and not enough for anything built from several pieces. The storage keeps the cooldowns of inactive powers running, including inside a stored `apoli:multiple`.

## As a resource

The storage reports how many powers it holds, so it works anywhere a resource does: HUD bars, `$(key)` macros and [`apoli:resource`](/docs/datapack/entity-conditions/resource) comparisons. `slots` is its maximum when set.

It can be written to as well, which is how to empty a storage from a command:

```
/apoli:resource set @s example:my_storage 0
```

`0` clears it, and a smaller number keeps that many of the most recently stored powers and drops the rest.

An entry whose power no longer exists, because the JSON was deleted or renamed or its data pack was disabled, doesn't count, is never fired, and is dropped the next time something is stored. A power that has gone away can't block a storage for good.

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

A spell book that carries its spells without granting them, to be cast with [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power):

```json
{
  "type": "apoli:power_storage",
  "slots": 3,
  "tags": "spell",
  "replace_oldest": true,
  "grant": false
}
```

An unlimited storage limited to two named powers:

```json
{
  "type": "apoli:power_storage",
  "powers": ["example:fireball", "example:frost_nova"]
}
```

The storage empties itself when the power that declares it is taken away, so a revoked satchel leaves nothing behind for the next one to inherit.
