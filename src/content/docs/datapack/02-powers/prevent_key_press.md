---
title: "Prevent Key Press (Power Type)"
description: "Stops the player's key presses from reaching the game, for every key or only the ones you list."
navigation_title: "Prevent Key Press"
---

Stops the key presses of the player with the power from reaching the game while the power is active. Without a `keys` list that means the whole keyboard and mouse: no movement, attacking, using items, inventory, hotbar, or Apoli and Origins ability keys. With a list, only those keys stop working and everything else works as usual.

Type ID: `apoli:prevent_key_press`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | [Array](/docs/datapack/data-types/array) of [Key](/docs/datapack/data-types/key) | _optional_ | The keys to block. Without it, every key is blocked. |
| `scroll` | [Boolean](/docs/datapack/data-types/boolean) | `true` when `keys` is absent, otherwise `false` | Also blocks the mouse wheel, meaning hotbar scrolling and [`apoli:action_on_scroll_wheel`](/docs/datapack/powers/action_on_scroll_wheel). The wheel isn't a keybind, so it needs its own switch. |
| `affect_forced` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Also blocks keys that [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) is holding down. With `false`, a paralysed player can still be steered. |
| `unpress` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Releases every held key the moment the block starts, so a player who was already running doesn't keep sliding. |

Escape and the debug keys are never blocked, because the game doesn't read them through keybinds, so a blocked player can always open the pause menu.

## What it covers

The block applies to the keybind itself, so it reaches everything Apoli does with keys:

- Vanilla controls: movement, jump, sneak, sprint, attack, use, drop, swap hands, hotbar slots, inventory and chat.
- Data-driven keybinds from `data/<namespace>/keybinds/*.json`, including the ten Origins active power keys. Blocking `key.origins.primary_active` disables exactly that ability and nothing else.
- Every power driven by keys: [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:inventory`](/docs/datapack/powers/inventory) and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence).
- [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) reads a blocked key as not held, so conditions built on it turn false instead of sticking.
- The server refuses a blocked key even if a client sends the press anyway, so a modified client can't get around it.

Add a `condition` to the power and the block follows it. That is how a timed stun works, without granting or revoking anything.

## Examples

A total lockout while a resource is above zero, for a stun:

```json
{
  "type": "apoli:prevent_key_press",
  "condition": {
    "type": "apoli:resource",
    "resource": "example:stun_timer",
    "comparison": ">",
    "compare_to": 0
  }
}
```

Silence only the origin's abilities, leaving the player free to move and fight:

```json
{
  "type": "apoli:prevent_key_press",
  "keys": [
    "key.origins.primary_active",
    "key.origins.secondary_active",
    "key.origins.ternary_active"
  ]
}
```

Bind a player's legs without taking their hands:

```json
{
  "type": "apoli:prevent_key_press",
  "keys": ["key.forward", "key.back", "key.left", "key.right", "key.jump", "key.sprint"]
}
```

Paralysis that someone else can still steer. The player can't press anything, but [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) still works because `affect_forced` is off:

```json
{
  "type": "apoli:prevent_key_press",
  "affect_forced": false,
  "unpress": true
}
```

> [!NOTE]
> `keys` blocks keybinds by name, so it follows the player's own bindings. Blocking `key.jump` blocks whichever key they bound jump to, not the space bar.
