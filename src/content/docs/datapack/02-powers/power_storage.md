---
title: "Power Storage (Power Type)"
description: "Holds other powers without granting them, so they can be run later with apoli:run_stored_power."
navigation_title: "Power Storage"
---

Holds a list of other powers without granting them. A stored power does nothing on its own — it sits in the storage until [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) fires it. Think of it as a spell book: the entity carries the spell, but only casts it when told to.

Type ID: `apoli:power_storage`

Powers go in with [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and are read back with [`apoli:stored_power`](/docs/datapack/entity-conditions/stored_power).

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`slots` | [Integer](/docs/datapack/data-types/integer) | `0` | How many powers fit. `0` means unlimited.
`powers` | [Identifier](/docs/datapack/data-types/identifier) or list | *optional* | If set, only these power ids may be stored.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | If set, only powers carrying one of these tags may be stored.
`replace_oldest` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When the storage is full, drop the oldest entry to make room instead of refusing the new one.
`drop_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Reserved for future use; the storage currently persists across death.

The storage is also a resource: [`apoli:resource`](/docs/datapack/entity-conditions/resource) reads it as the number of powers currently stored, and `slots` is its maximum. That makes a HUD counter or a `$(key)` macro a one-liner.

## Examples

A three-slot spell book that only accepts powers tagged `spell`:

```json
{
  "type": "apoli:power_storage",
  "slots": 3,
  "tags": "spell",
  "replace_oldest": true
}
```

An unlimited storage restricted to two named powers:

```json
{
  "type": "apoli:power_storage",
  "powers": ["example:fireball", "example:frost_nova"]
}
```

> A stored power is not granted. Its conditions are still checked when it runs, but it does not tick, does not render a HUD bar and is invisible to [`apoli:power`](/docs/datapack/entity-conditions/power). Cooldowns on stored `apoli:action_on_key_press` and `apoli:fire_projectile` powers *are* kept running by the storage that holds them.
