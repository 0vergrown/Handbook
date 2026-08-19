---
title: "Key (Data Type)"
description: "Defines which key an active power reacts to — a built-in key or one you define in a data pack."
navigation_title: "Key"
---

A **Key** tells an [active power](/docs/datapack/powers/action_on_key_press) which keybinding to react to. It can be written two ways: a plain [String](/docs/datapack/data-types/string) naming the key, or an [Object](/docs/datapack/data-types/object) with extra options.

```json
"key": "key.attack"
```

```json
"key": {
    "key": "key.origins.primary_active",
    "continuous": true
}
```

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `key` | [String](/docs/datapack/data-types/string) | | The keybinding's translation key (see below). |
| `continuous` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `false`, the power activates once when the key is first pressed. If `true`, it tries to activate every tick the key is held (still respecting cooldown and conditions). |

> With `continuous: false` the power fires on the **press**, and holding the key does nothing more —
> including when a `cooldown` expires while the key is still down. To fire again, release the key
> and press it again.

## Built-in keys

You can point at any keybinding the game knows about:

| Key string | Bound to |
| --- | --- |
| `key.apoli.primary_active` | Apoli's primary active-power key (default: **unbound**) |
| `key.apoli.secondary_active` | Apoli's secondary active-power key (default: **unbound**) |
| `key.origins.primary_active` | Origins's primary active-power key (default: `G`) |
| `key.origins.secondary_active` | Origins's secondary active-power key (default: `H`) |
| `key.attack` | attack / left click |
| `key.use` | use / right click |
| `key.jump` | jump |
| `key.sneak` | sneak |
| `key.forward`, `key.left`, … | movement |

`key.apoli.primary_active` is the **default** for every Key field — omit `key` entirely and the power listens to it. Apoli ships it (and its secondary) unbound so it never collides with a mod's or a player's existing binding; both appear in the Controls menu under **Apoli** for the player to bind. A power that relies on the default therefore does nothing until the player binds that key, which is why packs that want a working key out of the box name a bound one such as `key.origins.primary_active`.

Both are ordinary [data-driven keybinds](#data-driven-keybinds) — they live in Apoli's own `data/apoli/keybinds/`, and a data pack can override either by shipping a file at the same path with a different default `key`.

## Data-driven keybinds

You aren't limited to the built-in keys — you can register your **own** keybind from a data pack. It appears in the vanilla **Controls** menu so players can rebind it, and you reference it from a Key field.

Create the keybind in `data/<namespace>/keybinds/<name>.json`:

```json
{
    "key": "key.keyboard.g",
    "category": "key.categories.apoli",
    "name": "Dash"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `key` | [String](/docs/datapack/data-types/string) | | The default physical key, e.g. `key.keyboard.g`, `key.mouse.left`. |
| `category` | [String](/docs/datapack/data-types/string) | `key.categories.apoli` | The Controls-menu group it's listed under. |
| `name` | [String](/docs/datapack/data-types/string) | *optional* | Display name. Falls back to an automatic translation key. |

The keybind's **id** is its file path `data/my_pack/keybinds/dash.json` becomes `my_pack:dash` and its keybinding string is `key.<namespace>.<path>`. So reference the example above with:

```json
"key": "key.my_pack.dash"
```

Now an active power keyed to `key.my_pack.dash` fires when the player presses whatever they've bound "Dash" to.

## Examples

Trigger once each time Origins' secondary active key is pressed:

```json
"key": {
    "key": "key.origins.secondary_active"
}
```

Trigger every tick the attack key is held:

```json
"key": {
    "key": "key.attack",
    "continuous": true
}
```
