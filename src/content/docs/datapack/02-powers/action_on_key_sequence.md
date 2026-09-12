---
title: "Action On Key Sequence (Power Type)"
description: "Runs an action when a sequence of keys is entered, like a combo."
navigation_title: "Action On Key Sequence"
aliases: ["sync:action_on_key_sequence"]
---

Runs an action when a sequence of keys is entered, like a combo.

Type ID: `apoli:action_on_key_sequence`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `success_action` | entity action | _optional_ | Run when the whole sequence has been entered. |
| `fail_action` | entity action | _optional_ | Run when a key press breaks a partial match. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Ticks to ignore input for after a success. |
| `timeout` | integer | `20` | Ticks of no tracked key press before a partial combo is forgotten. `0` never expires. |
| `hud_render` | HUD render | _optional_ | Cooldown display. |
| `keys` | list of [Functional Key](/docs/datapack/data-types/key) | **required** | The keys this power watches. Each may carry its own action, run on every press. |
| `key_sequence` | list of [Sequence Step](/docs/datapack/data-types/sequence-step) | **required** | The combo, in order. A plain key name is one press; an object makes that position a multi-tap or a hold. |

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

Each entry in `keys` is a [Functional Key](/docs/datapack/data-types/key): a bare key name, or an object
whose `key` and `continuous` sit at the top level next to `action` — `{ "key": "key.apoli.primary_active",
"action": { … } }`.

## Taps and holds

A `key_sequence` entry can be an object instead of a name, which is how a position becomes a double tap
or a hold. Three presses of the primary key where the last one is held for half a second:

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

Letting go before the hold completes breaks the run and fires `fail_action`, so a hold is a real
commitment rather than a free extra press. Every field is on the
[Sequence Step](/docs/datapack/data-types/sequence-step) page, including `taps` for multi-taps and
`max_gap` for a per-position time limit tighter than `timeout`.

## Matching

The sequence is matched with a proper prefix-function matcher, so a partial match falls back to the longest
prefix that is still valid instead of starting over. Entering `A A B` against `A A A B` leaves you correctly
positioned rather than resetting to nothing.

**Any tracked key press that is not the expected next key breaks the run.** That includes keys this power does
not list in its own `keys` — the matcher sees every Apoli-tracked key the player presses. Two powers whose
combos share a prefix therefore do not trigger each other: `A B` will not fire while you are half-way
through `A C B`.

> Only the **longest** matching combo fires. If one sequence is a prefix of another — `A B` and `A B C` —
> finishing `A B` does not fire it while `A B C` is still reachable; it waits. As soon as the longer combo
> completes, the shorter one is cancelled; if the longer one breaks, or `timeout` ticks pass with no input,
> the shorter one fires after all.

Positions are matched against **rising edges** — the tick a key goes from up to down. That stream is the
raw one the client reports, with no smoothing, so multi-taps keep their real timing. (The `grace` on
[`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) does not apply here, by design.) A
release that lasts a single tick is not visible at all at 20 samples a second, so two presses need about
a tenth of a second between them to read as two.

- A success resets progress to zero; matches never overlap themselves.
- All of a player's key-sequence powers are matched in one pass per tick, so arbitration between them is consistent.
- `cooldown` starts on success and suppresses input (and per-key actions) until it expires.
