---
title: "Action On Key Sequence (Power Type)"
description: "Runs an action when a sequence of keys is entered, like a combo."
navigation_title: "Action On Key Sequence"
aliases: ["sync:action_on_key_sequence"]
---

Runs an action when the player enters a sequence of keys, like a combo.

Type ID: `apoli:action_on_key_sequence`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `success_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs when the whole sequence has been entered. |
| `fail_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs when a key press breaks a partial match. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks to ignore input for after a success. |
| `timeout` | [Integer](/docs/datapack/data-types/integer) | `20` | Ticks without a tracked key press before a partial combo is forgotten. `0` never expires. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | _optional_ | How the cooldown is shown. |
| `keys` | [Array](/docs/datapack/data-types/array) of [Functional Key](/docs/datapack/data-types/key) | _required_ | The keys this power watches. Each can carry its own action, which runs on every press. |
| `key_sequence` | [Array](/docs/datapack/data-types/array) of [Sequence Step](/docs/datapack/data-types/sequence-step) | _required_ | The combo, in order. A plain key name is one press, and an object makes that position a multi-tap or a hold. |

## Example

```json
{
  "type": "apoli:action_on_key_sequence",
  "keys": [
    "key.apoli.primary_active",
    "key.apoli.secondary_active"
  ],
  "key_sequence": [
    "key.apoli.primary_active",
    "key.apoli.primary_active",
    "key.apoli.secondary_active"
  ],
  "cooldown": 20,
  "success_action": {
    "type": "apoli:heal",
    "amount": 4
  }
}
```

Each entry in `keys` is a [Functional Key](/docs/datapack/data-types/key): a bare key name, or an object whose `key` and `continuous` sit at the top level next to `action`, such as `{ "key": "key.apoli.primary_active", "action": { … } }`.

## Taps and holds

A `key_sequence` entry can be an object instead of a name, which turns that position into a double tap or a hold. Here are three presses of the primary key, with the last one held for half a second:

```json
{
  "type": "apoli:action_on_key_sequence",
  "keys": [
    "key.origins.primary_active"
  ],
  "key_sequence": [
    "key.origins.primary_active",
    "key.origins.primary_active",
    {
      "key": "key.origins.primary_active",
      "hold": 10
    }
  ],
  "success_action": {
    "type": "apoli:execute_command",
    "command": "say charged strike"
  }
}
```

Letting go before the hold completes breaks the run and fires `fail_action`, so a hold has to be finished, and doesn't work as a free extra press. The [Sequence Step](/docs/datapack/data-types/sequence-step) page lists every field, including `taps` for multi-taps and `max_gap` for a time limit on one position that is tighter than `timeout`.

## Matching

The sequence is matched with a prefix-function matcher, so a partial match falls back to the longest prefix that is still valid instead of starting over. Entering `A A B` against `A A A B` leaves you in the right position instead of resetting to nothing.

Any tracked key press that isn't the expected next key breaks the run. That includes keys this power doesn't list in its own `keys`, because the matcher sees every key press Apoli tracks for the player. As a result, two powers whose combos share a prefix don't trigger each other: `A B` won't fire while you are halfway through `A C B`.

> [!NOTE]
> Only the longest matching combo fires. If one sequence is a prefix of another, such as `A B` and `A B C`, finishing `A B` doesn't fire it while `A B C` can still be completed. It waits. As soon as the longer combo completes, the shorter one is cancelled. If the longer one breaks, or `timeout` ticks pass with no input, the shorter one fires after all.

Positions are matched against rising edges, the tick a key goes from up to down. Those come straight from the client with no smoothing, so multi-taps keep their real timing. The `grace` on [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) doesn't apply here, by design. A release that lasts a single tick isn't visible at all at 20 samples a second, so two presses need about a tenth of a second between them to count as two.

- A success resets progress to zero, and matches never overlap themselves.
- All of a player's key sequence powers are matched in one pass per tick, so they always settle conflicts between each other the same way.
- `cooldown` starts on success and ignores input, including the actions on each key, until it expires.
