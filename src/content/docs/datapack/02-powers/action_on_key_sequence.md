---
title: "apoli:action_on_key_sequence"
description: "Runs an action when a sequence of keys is entered, like a combo."
---

Runs an action when a sequence of keys is entered, like a combo.

Type ID: `apoli:action_on_key_sequence`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `success_action` | entity action | _optional_ | Run when the whole sequence has been entered. |
| `fail_action` | entity action | _optional_ | Run when a key press breaks a partial match. |
| `cooldown` | integer | `0` | Ticks to ignore input for after a success. |
| `timeout` | integer | `20` | Ticks of no tracked key press before a partial combo is forgotten. `0` never expires. |
| `hud_render` | HUD render | _optional_ | Cooldown display. |
| `keys` | list of [Functional Key](/docs/datapack/data-types/key) | **required** | The keys this power watches. Each may carry its own action, run on every press. |
| `key_sequence` | list of string | **required** | The combo, as key names in order. |

## Example

```json
{
   "type":"apoli:action_on_key_sequence",
   "keys":[
      {
         "key":{
            "key":"key.apoli.primary_active"
         }
      },
      {
         "key":{
            "key":"key.apoli.secondary_active"
         }
      }
   ],
   "key_sequence":[
      "key.apoli.primary_active",
      "key.apoli.primary_active",
      "key.apoli.secondary_active"
   ],
   "cooldown":20,
   "success_action":{
      "type":"apoli:heal",
      "amount":4
   }
}
```

## Matching

The sequence is matched with a proper prefix-function matcher, so a partial match falls back to the longest
prefix that is still valid instead of starting over. Entering `A A B` against `A A A B` leaves you correctly
positioned rather than resetting to nothing.

**Any tracked key press that is not the expected next key breaks the run.** That includes keys this power does
not list in its own `keys` — the matcher sees every Apoli-tracked key the player presses. Two powers whose
combos share a prefix therefore no longer trigger each other: `A B` will not fire while you are half-way
through `A C B`.

!!! note

    Only the **longest** matching combo fires. If one sequence is a prefix of another — `A B` and `A B C` —
    finishing `A B` does not fire it while `A B C` is still reachable; it waits. As soon as the longer combo
    completes, the shorter one is cancelled; if the longer one breaks, or `timeout` ticks pass with no input,
    the shorter one fires after all.

- A success resets progress to zero; matches never overlap themselves.
- All of a player's key-sequence powers are matched in one pass per tick, so arbitration between them is consistent.
- `cooldown` starts on success and suppresses input (and per-key actions) until it expires.
