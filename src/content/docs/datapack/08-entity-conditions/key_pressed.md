---
title: "Key Pressed (Entity Condition Type)"
description: Passes while a keybinding is held down.
navigation_title: "Key Pressed"
aliases: ["key_held", "held_key"]
---

Passes for as long as the key is held, unlike [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) which fires once on the press. Use it for abilities that last while you hold a key — a sustained beam, a glide, a charge-up.

Type ID: `apoli:key_pressed` (aliases `apoli:key_held`, `apoli:held_key`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`key` | [Key](/docs/datapack/data-types/key) | primary active | The keybinding to watch.
`grace` | [Integer](/docs/datapack/data-types/integer) | `0` | Keep passing for this many ticks after the key comes up. Max `40`.

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

Drain a resource for as long as the key is down, which is the shape most sustained abilities want:

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

The client samples the keyboard once per tick, so a key state is a series of 20 snapshots a second
rather than a continuous reading. Apoli already ignores a release that lasts a single sample, which
covers the ordinary case. `grace` widens that: the condition keeps passing for `grace` ticks after the
key is seen to come up, so an ability that is held for a long time cannot be cut short by a keyboard
that briefly drops the key — which is what happens on many boards when you press several other keys at
once, since keys sharing a matrix row or column block each other.

It costs latency in one direction only: the *press* is always instant, and only the *release* is
delayed by up to `grace` ticks. Two or three is plenty; reach for it when a charge-and-release ability
fires on its own while you are still holding the key and moving.

```json
{
  "type": "apoli:key_held",
  "key": "key.origins.ternary_active",
  "inverted": true,
  "grace": 3
}
```

`grace` only affects this condition. [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence)
reads the raw, ungraced key stream, so combos and multi-taps keep their exact timing.

> The key state is reported by the client, so this only works for players — and only for keys Apoli is watching, which it works out from the powers the player holds. [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) can hold a key down artificially, including on non-player entities.
