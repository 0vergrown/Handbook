---
title: "Keybind (Badge Type)"
description: "Badge — an icon whose hover text names the key the power is bound to."
navigation_title: "Keybind"
---

An icon in the origin-selection screen whose hover text has the player's **actual bound key** substituted into it, so an active power advertises the right key even after the player rebinds it.

Type ID: `origins:keybind` — a badge type, and the one an inline badge entry defaults to when it has no `type`.

> **Needs the Origins mod.** Badges are an Origins concept; core Apoli has no equivalent.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Full path to the texture to draw, e.g. `origins:textures/gui/badge/active.png`. |
| `text` | [String](/docs/datapack/data-types/string) | _required_ | A **translation key**, not a literal. Its first argument (`%s`) is filled with the bound key name. |
| `key` | [String](/docs/datapack/data-types/string) | `key.apoli.primary_active` | Which [key](/docs/datapack/data-types/key) to report. Match it to the power's own `key`. |

> `text` here is a plain translation key string — unlike [`origins:tooltip`](/docs/datapack/origins/badge_tooltip), it is **not** a text component. A literal sentence will render as the raw key.

The key name arrives already wrapped in square brackets, so write the translation as `Press %s to leap.` and the player sees `Press [SPACE] to leap.`. If the key is unbound, `%s` becomes the "unbound" placeholder instead.

## Examples

The power and its badge, bound to the same key:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary_active" },
  "entity_action": { "type": "apoli:add_velocity", "y": 1.0 },
  "badges": [
    {
      "type": "origins:keybind",
      "sprite": "origins:textures/gui/badge/active.png",
      "text": "badge.my_pack.leap",
      "key": "key.apoli.primary_active"
    }
  ]
}
```

With `badge.my_pack.leap` in your language file:

```json
{
  "badge.my_pack.leap": "Press %s to leap into the air."
}
```

## You often don't need to write one

An [`apoli:toggle`](/docs/datapack/powers/toggle) or [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) power with **no** `badges` array gets a keybind badge automatically, using its own `key`. Write one by hand only when you want your own sprite or wording.
