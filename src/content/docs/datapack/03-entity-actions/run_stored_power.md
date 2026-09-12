---
title: "Run Stored Power (Entity Action Type)"
description: "Fires a power held in an apoli:power_storage as though a key had been pressed."
navigation_title: "Run Stored Power"
---

Fires a power held in an [`apoli:power_storage`](/docs/datapack/powers/power_storage) as though a key had been pressed on it. The stored power does not have to be granted, and it does not have to be bound to the key you name — whatever keybind it declares, this action runs it with the one you pass instead. A storage left on its default `grant: true` already gives the stored power its own keybind, so this action is for firing it from somewhere else.

Type ID: `apoli:run_stored_power`

It fires the key-driven half of a stored power: [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) and [`apoli:inventory`](/docs/datapack/powers/inventory). Their own cooldowns, conditions and activation packets all apply exactly as if the holder had pressed the key themselves.

A stored [`apoli:multiple`](/docs/datapack/powers/multiple) fires every key-driven sub-power it holds, each still gated by its own `condition` and cooldown — so a spell written as one bundle stores and casts as one unit.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`storage` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only read this storage power. Omit to search every `apoli:power_storage` the entity has.
`key` | [Key](/docs/datapack/data-types/key) | *optional* | The key to run as. Omit and the stored power fires regardless of which key it declares.
`power` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only run this stored power.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | Only run stored powers carrying one of these tags.
`index` | [Integer](/docs/datapack/data-types/integer) | `-1` | Run only the stored power at this position, oldest first. `-1` means "no position filter".
`all` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Run every match instead of stopping after the first one that fires.

## Examples

Cast whatever is in the book when the player presses their primary key:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary" },
  "entity_action": {
    "type": "apoli:run_stored_power",
    "storage": "example:spell_book",
    "key": { "key": "key.apoli.primary" }
  }
}
```

Fire only the fire-tagged spell in slot 0, and let the stored power's own key be ignored:

```json
{
  "type": "apoli:run_stored_power",
  "storage": "example:spell_book",
  "index": 0,
  "tags": "fire"
}
```

Run everything in the book at once:

```json
{
  "type": "apoli:run_stored_power",
  "all": true
}
```

> When `key` is set, [`apoli:prevent_key_press`](/docs/datapack/powers/prevent_key_press) can still block the cast, the same as a real press of that key. Leave `key` out and nothing can block it.
