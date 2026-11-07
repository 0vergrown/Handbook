---
title: "Key (Command)"
description: "Holds, releases and inspects keys on any entity, and fakes a scroll wheel, for testing key-driven powers."
navigation_title: "Key"
---

Does from chat what [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) does from JSON, on any entity instead of only the one running an action. It is the quickest way to check that a key-bound power works before you build the trigger that is meant to fire it.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `press <targets> <key> [<duration>]` | Holds `key` for `duration` ticks (default `1`). |
| `hold <targets> <key>` | Holds `key` down until `release` or `clear` lets go of it. |
| `release <targets> <key>` | Ends a hold that is still running. |
| `clear <targets>` | Releases every key currently forced on the targets. |
| `list <targets>` | Prints the keys each target is holding, marking the forced ones. |
| `scroll <targets> up\|down [<count>]` | Feeds `count` scroll notches (default `1`) to [`apoli:action_on_scroll_wheel`](/docs/datapack/powers/action_on_scroll_wheel). |

`<key>` is a keybind translation key, such as `key.jump`, `key.forward` or `key.apoli.primary_active`. Tab completion offers the vanilla keys, Apoli's own keys, every [data-driven keybind](/docs/datapack/data-types/key#data-driven-keybinds), and every key any loaded power binds.

```mcfunction
apoli:key press @s key.apoli.primary_active
apoli:key press @e[type=apoli:minion] key.forward 40
apoli:key hold @s key.apoli.secondary_active
apoli:key list @e[type=apoli:minion]
apoli:key release @e[type=apoli:minion] key.forward
apoli:key scroll @s up 3
```

Each sub-command returns the number of entities it touched, except `scroll`, which returns the number of powers that fired, so `execute store result score …` tells you whether anything reacted.

## Holding a key down

Some powers only do something while their key stays down: an [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) whose key is `"continuous": true` fires every tick of the hold, its `entity_action_released` runs when the key comes up, and the last step of an [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) can ask for a key to be held for a number of ticks. `press` with a `duration` holds the key for that long, and `hold` keeps it down with no time limit. On a player, a forced key counts as held on their client exactly like a real one, so these powers behave the same as when the player holds the button.

```mcfunction
apoli:key hold @s key.apoli.primary_active
apoli:key release @s key.apoli.primary_active
```

The first line holds the key, so a continuous power on it keeps firing, and the second lets go, which runs the power's `entity_action_released`.

## Driving a minion

`press` on an entity that isn't a player holds the key on the server, which fires that entity's key-bound powers, and a key marked `"continuous": true` keeps firing for every tick of the hold. Pair it with a movement action and a summoned entity walks:

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
```mcfunction
apoli:power grant @e[type=apoli:minion] example:walk
apoli:key press @e[type=apoli:minion] key.forward 40
```

The same pattern drives an attack, an ability, or anything else you would otherwise have to hold the controls for. See [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) for what a hold on the server does and doesn't cover.

## Notes

- `press` and `hold` on a player go to their client, so they need Apoli installed there. Every other entity is handled entirely on the server.
- A key that is already being forced keeps whichever duration is longer, instead of restarting the timer. A `press` on a key that `hold` is holding doesn't shorten the hold.
- `list` shows real presses as well as forced ones, so on a player it is also a live readout of what they are holding.
