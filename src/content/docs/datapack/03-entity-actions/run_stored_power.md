---
title: "Run Stored Power (Entity Action Type)"
description: "Fires a power held in an apoli:power_storage as though a key had been pressed."
navigation_title: "Run Stored Power"
---

Fires a power held in an [`apoli:power_storage`](/docs/datapack/powers/power_storage) as though a key had been pressed on it. The stored power doesn't have to be granted, and it doesn't have to be bound to the key you name: whatever keybind it declares, this action runs it with the one you pass. A storage left on its defaults already gives the stored power its own keybind, so this action is for firing it from somewhere else. A storage with `own_key: false` makes this action the only way to fire it, which is what a mechanic for stealing abilities usually wants.

Type ID: `apoli:run_stored_power`

It fires the key-driven part of a stored power: [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) and [`apoli:inventory`](/docs/datapack/powers/inventory). Their own cooldowns, conditions and activation packets all apply exactly as if the holder had pressed the key.

A stored [`apoli:multiple`](/docs/datapack/powers/multiple) fires every key-driven sub-power it holds, each still gated by its own `condition` and cooldown, so a spell written as one bundle is stored and cast as one unit.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only reads this storage power. Leave it out to search every `apoli:power_storage` the entity has. |
| `key` | [Key](/docs/datapack/data-types/key) | _optional_ | The key to run as. Leave it out and the stored power fires whichever key it declares. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only runs this stored power. |
| `tags` | [String](/docs/datapack/data-types/string) or list | _optional_ | Only runs stored powers carrying one of these tags. |
| `index` | [Integer](/docs/datapack/data-types/integer) | `-1` | Only runs the stored power at this position, counting from the oldest. `-1` turns the position filter off. |
| `all` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Runs every match instead of stopping after the first one that fires. |

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

Fire only the spell tagged `fire` in slot 0, whatever key the stored power declares:

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

> [!NOTE]
> When `key` is set, [`apoli:prevent_key_press`](/docs/datapack/powers/prevent_key_press) can still block the cast, the same as a real press of that key. Leave `key` out and nothing can block it.

A stored power that isn't key-driven gives this action nothing to run, and a stored power's own `condition` and cooldown still apply. With [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on, a cast that does nothing says whether the storage was empty, whether the filters matched nothing, or whether something matched and refused to fire.
