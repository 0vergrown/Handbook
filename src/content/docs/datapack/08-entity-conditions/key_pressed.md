---
title: "Key Pressed (Entity Condition Type)"
description: Passes while a keybinding is held down.
navigation_title: "Key Pressed"
aliases: ["key_held", "held_key"]
---

Passes for as long as a key is held, while [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) fires once on the press. Use it for abilities that last while you hold a key, such as a beam, a glide or a charge-up.

Type ID: `apoli:key_pressed` (aliases `apoli:key_held` and `apoli:held_key`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [Key](/docs/datapack/data-types/key) | primary active | The keybinding to watch. |
| `grace` | [Integer](/docs/datapack/data-types/integer) | `0` | Keeps passing for this many ticks after the key comes up. The most is `40`. |

## Examples

Glide while the primary ability key is held:

```json
{
  "type": "apoli:creative_flight",
  "condition": {
    "type": "apoli:key_pressed",
    "key": { "key": "key.origins.primary_active" }
  }
}
```

Drain a resource for as long as the key is down, which is what most held abilities need:

```json
{
  "type": "apoli:action_over_time",
  "interval": 10,
  "entity_action": {
    "type": "apoli:change_resource",
    "resource": "mypack:energy",
    "change": -1
  },
  "condition": {
    "type": "apoli:key_pressed",
    "key": { "key": "key.origins.secondary_active" }
  }
}
```

## Grace

The client samples the keyboard once per tick, so a key's state is 20 snapshots a second and not a continuous reading. Apoli already ignores a release that lasts a single sample, which covers the ordinary case. `grace` widens that: the condition keeps passing for `grace` ticks after the key is seen to come up, so a keyboard that briefly drops the key can't cut short an ability held for a long time. Many keyboards do that when you press several other keys at once, because keys that share a row or column of the key matrix block each other.

It only adds delay in one direction. The press is always instant, and only the release is delayed, by up to `grace` ticks. Two or three is plenty. Use it when a charge-and-release ability fires on its own while you are still holding the key and moving.

```json
{
  "type": "apoli:key_held",
  "key": "key.origins.ternary_active",
  "inverted": true,
  "grace": 3
}
```

`grace` only affects this condition. [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) reads the raw key stream without grace, so combos and multi-taps keep their exact timing.

> [!NOTE]
> The client reports the key state, so this only works for players, and only for keys Apoli is watching, which it works out from the powers the player holds. [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) can hold a key down artificially, including on entities that aren't players.
