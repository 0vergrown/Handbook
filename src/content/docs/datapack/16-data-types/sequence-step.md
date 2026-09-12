---
title: "Sequence Step (Data Type)"
description: "One position in an apoli:action_on_key_sequence combo — a press, a multi-tap, or a hold."
navigation_title: "Sequence Step"
---

One position in the `key_sequence` of [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence). Written either as a plain [String](/docs/datapack/data-types/string) naming a key, or as an [Object](/docs/datapack/data-types/object) when that position needs to be a multi-tap or a hold.

```json
"key.origins.primary_active"
```

```json
{
  "key": "key.origins.primary_active",
  "taps": 2,
  "max_gap": 6
}
```

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `key` | [Key](/docs/datapack/data-types/key) | **required** | The keybinding this position expects. |
| `taps` | [Integer](/docs/datapack/data-types/integer) | `1` | How many presses of that key satisfy this position. `2` is a double tap, `3` a triple. Max `16`. |
| `hold` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks the key must stay down after the last of those presses. `0` means the press alone is enough. Max `1200`. |
| `max_gap` | [Integer](/docs/datapack/data-types/integer) | `0` | Ticks allowed before this position's press — and between its own taps. `0` means only the power's `timeout` applies. Max `1200`. |

A bare string is exactly `{ "key": "<that key>", "taps": 1, "hold": 0, "max_gap": 0 }`, so every combo written before steps existed keeps working unchanged.

## Taps

`taps` is a tighter way of writing the same key several times in a row. These two are the same combo:

```json
"key_sequence": [
  "key.apoli.primary_active",
  "key.apoli.primary_active",
  "key.apoli.secondary_active"
]
```

```json
"key_sequence": [
  {
    "key": "key.apoli.primary_active",
    "taps": 2
  },
  "key.apoli.secondary_active"
]
```

The difference is that a step can carry a `max_gap`, which the expanded form cannot express — `{ "taps": 2, "max_gap": 6 }` is a real double tap (two presses inside 6 ticks), while two plain entries only have to land inside the power's much longer `timeout`.

## Holds

`hold` makes the position finish on the key still being down rather than on the press. The combo advances only after the key has been held for that many ticks; letting go early breaks the run and fires `fail_action`.

Three presses of the same key where the last one is held for half a second:

```json
"key_sequence": [
  "key.origins.primary_active",
  "key.origins.primary_active",
  {
    "key": "key.origins.primary_active",
    "hold": 10
  }
]
```

Written with `taps`, which is the same thing:

```json
"key_sequence": [
  {
    "key": "key.origins.primary_active",
    "taps": 3,
    "hold": 10
  }
]
```

A hold on the **last** position means `success_action` runs when the hold completes, not when the key goes down. A hold in the **middle** just gates the rest of the combo: once it completes the matcher carries on, and the key does not have to stay down.

> While a hold is counting down the combo ignores further presses, so a key that is already down cannot advance the next position. If the position after a hold uses the same key, the player has to let go and press it again.
