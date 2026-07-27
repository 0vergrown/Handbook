---
title: "apoli:force_key_pressed"
description: "Holds a key down on the target player's client as if they pressed it."
---

Holds a [Key](/docs/datapack/data-types/key) down on the target player's client, as if they had pressed it themselves.

Type ID: `apoli:force_key_pressed`

Aliases: `apoli:press_key`, `apoli:force_key`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [Key](/docs/datapack/data-types/key) | `key.apoli.primary_active` | The key to press. Any vanilla or modded keybind translation key, or an Apoli active key. |
| `duration` | Integer | `1` | How many ticks to hold it. Values below `1` are clamped to `1`. |
| `release` | Boolean | `false` | Cancel a force that is still running on this key instead of starting one. |

The forced key reads as both **held** and **just clicked**, so it drives movement, attacking, using items, opening menus, and any Apoli active power bound to that key. Because the press is genuine client-side input, [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) conditions and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) see it too.

Pressing a key that is already forced extends the hold to whichever duration is longer and queues another click edge.

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

- Only works on players. Non-player entities are ignored.
- Requires Apoli on the client. A vanilla client silently ignores the packet.
- Key names are keybind **translation keys** (`key.jump`, `key.attack`, `key.use`, `key.sneak`, `key.forward`…), the same strings the [Key](/docs/datapack/data-types/key) data type accepts everywhere else.

## See also

- [Key](/docs/datapack/data-types/key)
- [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed)
