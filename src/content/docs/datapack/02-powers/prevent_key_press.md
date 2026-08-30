---
title: "Prevent Key Press (Power Type)"
description: "Stops the holder's keys from reaching the game — the whole keyboard, or just the keys you name."
navigation_title: "Prevent Key Press"
---

Stops the holder's key presses from reaching the game while the power is active. With no `keys` list that is the whole keyboard and mouse: no movement, no attacking, no using items, no inventory, no hotbar, and no Apoli or Origins ability keys. With a list, only those keys go dead and everything else keeps working.

Type ID: `apoli:prevent_key_press`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `keys` | array of [Key](/docs/datapack/data-types/key) | _optional_ | The keys to block. Left out, **every** key is blocked. |
| `scroll` | [Boolean](/docs/datapack/data-types/boolean) | `true` when `keys` is absent, otherwise `false` | Also block the mouse wheel — hotbar scrolling and [`apoli:action_on_scroll_wheel`](/docs/datapack/powers/action_on_scroll_wheel). The wheel is not a keybind, so it needs its own switch. |
| `affect_forced` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Also block keys that [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) is holding down. Left `false`, a paralysed player can still be puppeted. |
| `unpress` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Release everything currently held the moment the block starts, so a player who was already running does not keep sliding. |

Escape and the debug keys are deliberately **not** blocked — they are not keybinds the game reads through this path, so a blocked player can always open the pause menu.

## What it covers

The block sits on the keybind itself, which is what makes it reach everything Apoli does with keys:

- Vanilla controls — movement, jump, sneak, sprint, attack, use, drop, swap hands, hotbar slots, inventory, chat.
- **Data-driven keybinds** from `data/<namespace>/keybinds/*.json`, including Origins' ten active-power keys. Blocking `key.origins.primary_active` disables exactly that ability and nothing else.
- Every key-driven power: [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence).
- [`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) reads a blocked key as **not held**, so conditions built on it go false rather than sticking.
- The server refuses a blocked key even if a client sends the press anyway, so this is not a client-side-only honour system.

Add a `condition` to the power and the block follows it — that is how a timed stun works, without granting and revoking anything.

## Examples

Total lockout while a resource is above zero — the classic stun:

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

Silence just the origin's abilities, leaving the player free to move and fight:

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

Paralysis a puppeteer can still steer — the player cannot press anything, but [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) still works because `affect_forced` is left off:

```json
{
  "type": "apoli:prevent_key_press",
  "affect_forced": false,
  "unpress": true
}
```

> Blocking `keys` is per keybind **name**, so it follows the player's own bindings. Blocking `key.jump` blocks whichever key they rebound jump to, not the space bar.
