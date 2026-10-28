---
title: "Keybind (Badge Type)"
description: "An icon whose hover text names the key the power is bound to."
navigation_title: "Keybind"
---

An icon in the origin selection screen whose hover text includes the key the player has actually bound, so an active power shows the right key even after the player rebinds it.

Type ID: `origins:keybind`

An inline badge entry with no `type` gets this type.

> [!NOTE]
> Badges come from the Origins mod, and core Apoli has nothing like them.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The full path of the texture to draw, such as `origins:textures/gui/badge/isaacfanta/active.png`. |
| `fallback` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of identifiers | _optional_ | Textures to draw when `sprite` isn't in any loaded resource pack. The first one that exists is used. |
| `text` | [String](/docs/datapack/data-types/string) | _required_ | A translation key, not literal text. Its first argument (`%s`) is filled with the bound key's name. |
| `key` | [String](/docs/datapack/data-types/string) | `key.apoli.primary_active` | The [key](/docs/datapack/data-types/key) to report. Match it to the power's own `key`. |

> [!WARNING]
> `text` here is a plain translation key string, unlike [`origins:tooltip`](/docs/datapack/origins/badge_tooltip), where it is a text component. A literal sentence renders as the raw key.

The key name arrives already wrapped in square brackets, so write the translation as `Press %s to leap.` and the player sees `Press [SPACE] to leap.`. If the key is unbound, `%s` becomes the unbound placeholder instead.

## Examples

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary_active" },
  "entity_action": { "type": "apoli:add_velocity", "y": 1.0 },
  "badges": [
    {
      "type": "origins:keybind",
      "sprite": "origins:textures/gui/badge/isaacfanta/active.png",
      "text": "badge.my_pack.leap",
      "key": "key.apoli.primary_active"
    }
  ]
}
```

The power and its badge use the same key. With `badge.my_pack.leap` in your language file:

```json
{
  "badge.my_pack.leap": "Press %s to leap into the air."
}
```

## You often don't need to write one

An [`apoli:toggle`](/docs/datapack/powers/toggle) power, or any other power with a `key` field such as [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), gets a keybind badge automatically when it has no `badges` array, using its own `key` (see [automatic badges](/docs/datapack/origins/badges#automatic-badges)). Write one by hand only when you want your own sprite or wording.
