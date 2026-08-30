---
title: "Force Key Pressed (Entity Action Type)"
description: "Holds a key down on the target as if they pressed it — on a player, on a minion, on any entity."
navigation_title: "Force Key Pressed"
aliases: ["press_key", "force_key"]
---

Holds a [Key](/docs/datapack/data-types/key) down on the target, as if they had pressed it themselves. On a player that is a genuine press on their client; on any other entity it drives that entity's key-bound powers directly.

Type ID: `apoli:force_key_pressed`

Aliases: `apoli:press_key`, `apoli:force_key`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [Key](/docs/datapack/data-types/key) | `key.apoli.primary_active` | The key to press. Any vanilla or modded keybind translation key, or an Apoli active key. |
| `duration` | Integer | `1` | How many ticks to hold it. Values below `1` are clamped to `1`. |
| `release` | Boolean | `false` | Cancel a force that is still running on this key instead of starting one. |

On a **player**, the forced key reads as both **held** and **just clicked**, so it drives movement, attacking, using items, opening menus, and any Apoli active power bound to that key. Because the press is genuine client-side input, [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) conditions and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) see it too.

Pressing a key that is already forced extends the hold to whichever duration is longer and queues another click edge.

## On entities that are not players

A minion, a clone, a zombie or any other entity has no client and no controls, so there is nothing to press. Apoli holds the key **server-side** instead, and that is enough for everything a data pack can observe:

- Key-bound powers on that entity fire — [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle) and [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) all activate on the press.
- [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) reports the key as held for the whole `duration`.
- A key whose [Key](/docs/datapack/data-types/key) is `"continuous": true` re-fires its power **every tick** of the hold, exactly like a player holding the button down. A non-continuous key fires once, on the press.

What it does **not** do is move the entity: `key.forward` on a zombie is not a movement input, it is a key the zombie is now holding. Give the entity a `continuous` power bound to that key to turn it into motion:

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

Force `key.forward` on the minion for 40 ticks and it walks forward for two seconds under its own steam. [`/apoli:key`](/docs/datapack/commands/key) does the same thing from chat, which is the quicker way to try it out.

## Examples

Make the target jump:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.jump",
  "duration": 4
}
```

Force a two-second forced march:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.forward",
  "duration": 40
}
```

Stop an ongoing force early:

```json
{
  "type": "apoli:force_key_pressed",
  "key": "key.forward",
  "release": true
}
```

## Notes

- On a player this needs Apoli on the client — a vanilla client silently ignores the packet. The server-side hold used for non-players needs nothing.
- Key names are keybind **translation keys** (`key.jump`, `key.attack`, `key.use`, `key.sneak`, `key.forward`…), the same strings the [Key](/docs/datapack/data-types/key) data type accepts everywhere else.
