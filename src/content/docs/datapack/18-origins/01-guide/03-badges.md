---
title: Badges
description: Little icons and notes attached to a power in the origin-selection screen.
---

**Badges** are Origins' way of annotating a [power](/docs/datapack/introduction/powers) in the origin-selection screen — a keybind hint, a crafting recipe, an icon with a tooltip. They are purely informational: a badge never changes what a power does.

There are four badge types, each with its own page:

| Type | What it shows |
| --- | --- |
| [`origins:sprite`](/docs/datapack/origins/badge_sprite) | An icon and nothing else. |
| [`origins:tooltip`](/docs/datapack/origins/badge_tooltip) | An icon with hover text. |
| [`origins:keybind`](/docs/datapack/origins/badge_keybind) | An icon whose text names the key the power is bound to. |
| [`origins:crafting_recipe`](/docs/datapack/origins/badge_crafting_recipe) | An icon that hovers out a crafting grid. |

## Two ways to attach one

### Inline, on the power

Add a top-level `badges` array to the power file itself (`data/<namespace>/powers/<id>.json`). This is the common case.

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.apoli.primary_active" },
  "entity_action": { "type": "apoli:add_velocity", "y": 1.0 },
  "badges": [
    {
      "type": "origins:tooltip",
      "sprite": "origins:textures/gui/badge/isaacfanta/active.png",
      "text": "Leap into the air."
    }
  ]
}
```

An entry with no `type` is read as [`origins:keybind`](/docs/datapack/origins/badge_keybind).

> A power marked `"hidden": true` is skipped entirely — its inline badges are never loaded.

### Standalone, then referenced

A badge can live in its own file at `data/<namespace>/badges/<path>.json`. The file **is** the badge object, and its id is `<namespace>:<path>`:

```json
// data/my_pack/badges/aquatic.json
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": "Works underwater."
}
```

Powers then reference it by id, as a plain string in their `badges` array:

```json
{
  "type": "apoli:swimming",
  "badges": [ "my_pack:aquatic" ]
}
```

Use this when the same note belongs on several powers. A standalone badge that no power references shows up nowhere — defining the file is not enough.

## Sprites Origins ships

`sprite` is a **full texture path** — namespace, `textures/`, the folders under it, and `.png`. It is not a sprite-atlas name, and there is no implicit folder: `origins:textures/gui/badge/active.png` does not exist, because every shipped icon sits in a set folder.

Origins ships two sets you can point at from any pack, no resource pack needed.

### `isaacfanta` — the power-role set

`origins:textures/gui/badge/isaacfanta/<name>.png`

| | | | |
| --- | --- | --- | --- |
| `active` | `passive` | `toggle` | `holdable` |
| `charge` | `cycle` | `swap` | `recipe` |
| `m1` | `m2` | `bar` | `info` |
| `star` | `extra` | `support` | `ultimate` |
| `plus_ultra` | `arrow_up` | `increase_decrease` | |

`active`, `toggle` and `recipe` are the three the [automatic badges](#automatic-badges) below use, so reusing them keeps a hand-written badge visually consistent with the free ones.

### `silent` — the building-block set

`origins:textures/gui/badge/silent/<folder>/<name>.png`

| Folder | Names |
| --- | --- |
| `colors` | `black`, `blue`, `brown`, `cyan`, `dark_gray`, `green`, `light_gray`, `magenta`, `pink`, `red`, `white`, `yellow` |
| `icons` | `armor`, `pickaxe`, `shield`, `sword` |
| `icons/sky` | `sun`, `sun_icon`, `moon_icon`, `moon_full`, `moon_new`, `moon_first_quarter`, `moon_third_quarter`, `moon_waxing_crescent`, `moon_waxing_gibbous`, `moon_waning_crescent`, `moon_waning_gibbous` |
| `math` | `number_0` … `number_9`, `expression_add`, `expression_subtract`, `expression_multiply`, `expression_multiply_alt`, `expression_divide`, `expression_equals` |
| `shapes` | `shape_circle`, `shape_square`, `shape_triangle`, `shape_heart`, `star`, `arrow_up`, `arrow_down`, `arrow_left`, `arrow_right`, `triangle_up`, `triangle_down`, `triangle_left`, `triangle_right` |

So a "costs 3" badge is `origins:textures/gui/badge/silent/math/number_3.png`, and a moon-phase note is `origins:textures/gui/badge/silent/icons/sky/moon_full.png`.

### Your own

Drop a 16×16 PNG in a resource pack at `assets/<namespace>/textures/gui/badge/<name>.png` and write `<namespace>:textures/gui/badge/<name>.png`. Any size loads, but the slot is drawn at 16×16 — anything else is scaled.

> A sprite path that resolves to nothing draws the missing-texture checkerboard. The badge still works; only the icon is wrong. Check the namespace and the folder first.

## Automatic badges

A power with **no** `badges` array gets one for free when its type implies an obvious note:

| Power type | Badge you get |
| --- | --- |
| [`apoli:toggle`](/docs/datapack/powers/toggle) | keybind badge, using the power's own `key` |
| Any power type with a `key` field — [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) | "Active" keybind badge, using the power's own `key` (for a sequence, the first key in it) |
| [`apoli:recipe`](/docs/datapack/powers/recipe) | crafting-recipe badge, built from the power's recipe |

Writing your own `badges` array replaces the automatic one — it does not add to it.

## Multiple powers

An [`apoli:multiple`](/docs/datapack/powers/multiple) power with no badges of its own shows the **merged** badges of all its sub-powers, so a bundled origin trait still surfaces the keybinds and recipes hidden inside it. Give the `multiple` its own `badges` array to override that with a single summary badge instead.
