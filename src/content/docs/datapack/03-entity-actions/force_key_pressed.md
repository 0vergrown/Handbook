---
title: "Force Key Pressed (Entity Action Type)"
description: "Holds a key down on the target as if they had pressed it, on a player, a minion or any other entity."
navigation_title: "Force Key Pressed"
aliases: ["press_key", "force_key"]
---

Holds a [Key](/docs/datapack/data-types/key) down on the target, as if they had pressed it themselves. On a player that is a real press on their client, and on any other entity it drives that entity's key-bound powers directly.

Type ID: `apoli:force_key_pressed` (aliases `apoli:press_key` and `apoli:force_key`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [Key](/docs/datapack/data-types/key) | `key.apoli.primary_active` | The key to press: any vanilla or modded keybind translation key, or an Apoli active key. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `1` | How many ticks to hold it. Values below `1` are clamped to `1`. |
| `release` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Cancels a force that is still running on this key instead of starting one. |

On a player, the forced key reads as both held and just clicked, so it drives movement, attacking, using items, opening menus and any Apoli active power bound to that key. Because the press is real input on the client, [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) conditions and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) see it too.

Pressing a key that is already forced extends the hold to whichever duration is longer and queues another click.

## On entities that aren't players

A minion, a clone, a zombie or any other entity has no client and no controls, so there is nothing to press. Apoli holds the key on the server instead, which covers everything a data pack can observe:

- Key-bound powers on that entity fire. [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle) and [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) all activate on the press.
- [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) reports the key as held for the whole `duration`.
- A key whose [Key](/docs/datapack/data-types/key) has `"continuous": true` fires its power again every tick of the hold, exactly like a player holding the button down. A key that isn't continuous fires once, on the press.

It doesn't move the entity, though. `key.forward` on a zombie isn't a movement input, only a key the zombie is now holding. Give the entity a `continuous` power bound to that key to turn it into motion:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.forward", "continuous": true },
  "cooldown": 0,
  "entity_action": {
    "type": "apoli:add_velocity",
    "z": 0.1,
    "space": "local_horizontal_normalized"
  }
}
```

Force `key.forward` on the minion for 40 ticks and it walks forward for two seconds by itself. [`/apoli:key`](/docs/datapack/commands/key) does the same thing from chat, which is the quicker way to try it out.

## Examples

Make the target jump:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.jump",
  "duration": 4
}
```

March the target forward for two seconds:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.forward",
  "duration": 40
}
```

Stop a force that is still running:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.forward",
  "release": true
}
```

## Notes

- On a player this needs Apoli on the client, and a vanilla client ignores the packet without any error. The hold on the server used for other entities needs nothing.
- Key names are keybind translation keys (`key.jump`, `key.attack`, `key.use`, `key.sneak`, `key.forward` and so on), the same strings the [Key](/docs/datapack/data-types/key) data type accepts everywhere else.
