---
title: "Key (Data Type)"
description: "Picks the key an active power reacts to, either a built-in key or one you define in a data pack."
navigation_title: "Key"
---

A Key tells an [active power](/docs/datapack/powers/action_on_key_press) which keybinding to react to. It can be written two ways: a plain [String](/docs/datapack/data-types/string) naming the key, or an [Object](/docs/datapack/data-types/object) with extra options.

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
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | `key.apoli.primary_active` | The keybinding's translation key (see below). |
| `continuous` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `false`, the power activates once when the key is first pressed. With `true`, it tries to activate every tick the key is held, still following its cooldown and conditions. |

> [!NOTE]
> With `continuous: false`, the power fires on the press, and holding the key does nothing more, even when a `cooldown` runs out while the key is still down. To fire again, let go of the key and press it again.

> [!NOTE]
> A key pressed while a screen is open, such as a chest, the chat or a [radial menu](/docs/datapack/entity-actions/radial_menu), doesn't activate a power, and neither does the press that closes the screen. A key still held when the screen closes counts once it is let go and pressed again. A `continuous: true` power picks up as soon as the screen closes if its key is held.

## Built-in keys

You can point at any keybinding the game knows about:

| Key string | Bound to |
| --- | --- |
| `key.apoli.primary_active` | Apoli's primary active power key (unbound by default) |
| `key.apoli.secondary_active` | Apoli's secondary active power key (unbound by default) |
| `key.origins.primary_active` | Origins' first active power key (`G` by default) |
| `key.origins.secondary_active` | Origins' second active power key (`H` by default) |
| `key.origins.ternary_active` to `key.origins.denary_active` | Origins' third to tenth active power keys (unbound by default) |
| `key.attack` | attack, left click |
| `key.use` | use, right click |
| `key.jump` | jump |
| `key.sneak` | sneak |
| `key.forward`, `key.left` and the rest | movement |

`key.apoli.primary_active` is the default for every Key field, so leave `key` out and the power listens to it. Apoli ships it and its secondary unbound so they never clash with a mod's or a player's existing binding, and both show up in the Controls menu under Apoli for the player to bind. A power that relies on the default does nothing until the player binds that key, which is why packs that want a working key out of the box name one that is bound, such as `key.origins.primary_active`.

Both are ordinary [data-driven keybinds](#data-driven-keybinds). They live in Apoli's own `data/apoli/keybinds/`, and a data pack can override either one by shipping a file at the same path with a different default `key`.

## Data-driven keybinds

You can also register your own keybind from a data pack. It shows up in the vanilla Controls menu so players can rebind it, and you reference it from a Key field.

Create the keybind in `data/<namespace>/keybinds/<name>.json`:

```json
{
    "key": "key.keyboard.g",
    "category": "key.categories.apoli",
    "name": "Dash"
}
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The default physical key, such as `key.keyboard.g` or `key.mouse.left`. |
| `category` | [String](/docs/datapack/data-types/string) | `key.categories.apoli` | The Controls menu group it is listed under. |
| `name` | [String](/docs/datapack/data-types/string) | _optional_ | The display name. Without it, an automatic translation key is used. |

> [!TIP]
> The Controls screen sorts each category alphabetically by the name it shows, so a set of keys with a natural order needs names that sort into that order. That is why Origins' ten ability keys are called "1st Active Power (Primary)" through "10th Active Power (Denary)".

> [!NOTE]
> A data-driven keybind only exists while the player is in a world or on a server that has it, so it isn't listed in the Controls menu on the title screen. The key the player binds to it stays in their `options.txt` all the same, and it is back in place the next time they join.

The keybind's ID comes from its file path, so `data/my_pack/keybinds/dash.json` becomes `my_pack:dash`, and its keybinding string is `key.<namespace>.<path>`. Reference the example above with:

```json
"key": "key.my_pack.dash"
```

An active power keyed to `key.my_pack.dash` then fires when the player presses whatever they have bound Dash to.

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
