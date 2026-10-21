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
| `release <targets> <key>` | Ends a hold that is still running. |
| `clear <targets>` | Releases every key currently forced on the targets. |
| `list <targets>` | Prints the keys each target is holding, marking the forced ones. |
| `scroll <targets> up\|down [<count>]` | Feeds `count` scroll notches (default `1`) to [`apoli:action_on_scroll_wheel`](/docs/datapack/powers/action_on_scroll_wheel). |

`<key>` is a keybind translation key, such as `key.jump`, `key.forward` or `key.apoli.primary_active`. Tab completion offers the vanilla keys, Apoli's own keys, every [data-driven keybind](/docs/datapack/data-types/key#data-driven-keybinds), and every key any loaded power binds.

```mcfunction
apoli:key press @s key.apoli.primary_active
apoli:key press @e[type=apoli:minion] key.forward 40
apoli:key list @e[type=apoli:minion]
apoli:key release @e[type=apoli:minion] key.forward
apoli:key scroll @s up 3
```

Each sub-command returns the number of entities it touched, except `scroll`, which returns the number of powers that fired, so `execute store result score …` tells you whether anything reacted.

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

- `press` on a player goes to their client, so it needs Apoli installed there. Every other entity is handled entirely on the server.
- A key that is already being forced keeps whichever duration is longer, instead of restarting the timer.
- `list` shows real presses as well as forced ones, so on a player it is also a live readout of what they are holding.
