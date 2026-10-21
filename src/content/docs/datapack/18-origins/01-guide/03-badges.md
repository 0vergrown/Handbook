---
title: Badges
description: "Small icons and notes attached to a power in the origin selection screen."
---

Badges are how Origins annotates a [power](/docs/datapack/introduction/powers) in the origin selection screen, with a keybind hint, a crafting recipe or an icon with a tooltip. They only inform, and a badge never changes what a power does.

There are four badge types, each with its own page:

| Type | What it shows |
| --- | --- |
| [`origins:sprite`](/docs/datapack/origins/badge_sprite) | An icon and nothing else. |
| [`origins:tooltip`](/docs/datapack/origins/badge_tooltip) | An icon with hover text. |
| [`origins:keybind`](/docs/datapack/origins/badge_keybind) | An icon whose text names the key the power is bound to. |
| [`origins:crafting_recipe`](/docs/datapack/origins/badge_crafting_recipe) | An icon that shows a crafting grid when hovered. |

## Two ways to attach one

### Inline, on the power

Add a top-level `badges` array to the power file itself (`data/<namespace>/powers/<id>.json`). This is the usual way.

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

> [!NOTE]
> A power marked `"hidden": true` is skipped entirely, and its inline badges are never loaded.

### Standalone, then referenced

A badge can live in its own file at `data/<namespace>/badges/<path>.json`. The file is the badge object, and its ID is `<namespace>:<path>`:

```json title="data/my_pack/badges/aquatic.json"
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": "Works underwater."
}
```

Powers then reference it by ID, as a string in their `badges` array:

```json
{
  "type": "apoli:swimming",
  "badges": [ "my_pack:aquatic" ]
}
```

Use this when the same note belongs on several powers. A standalone badge that no power references doesn't show up anywhere, so defining the file isn't enough.

## Sprites Origins ships

`sprite` is a full texture path: the namespace, `textures/`, the folders under it, and `.png`. It isn't a sprite atlas name, and no folder is assumed, so `origins:textures/gui/badge/active.png` doesn't exist, because every shipped icon sits in a set folder.

Origins ships two sets you can use from any pack, with no resource pack needed.

### The `isaacfanta` set

The icons for power roles are at `origins:textures/gui/badge/isaacfanta/<name>.png`, where the name is `active`, `passive`, `toggle`, `holdable`, `charge`, `cycle`, `swap`, `recipe`, `m1`, `m2`, `bar`, `info`, `star`, `extra`, `support`, `ultimate`, `plus_ultra`, `arrow_up` or `increase_decrease`.

`active`, `toggle` and `recipe` are the three that the [automatic badges](#automatic-badges) below use, so reusing them keeps a hand-written badge consistent with the automatic ones.

### The `silent` set

The building blocks are at `origins:textures/gui/badge/silent/<folder>/<name>.png`:

| Folder | Names |
| --- | --- |
| `colors` | `black`, `blue`, `brown`, `cyan`, `dark_gray`, `green`, `light_gray`, `magenta`, `pink`, `red`, `white`, `yellow` |
| `icons` | `armor`, `pickaxe`, `shield`, `sword` |
| `icons/sky` | `sun`, `sun_icon`, `moon_icon`, `moon_full`, `moon_new`, `moon_first_quarter`, `moon_third_quarter`, `moon_waxing_crescent`, `moon_waxing_gibbous`, `moon_waning_crescent`, `moon_waning_gibbous` |
| `math` | `number_0` to `number_9`, `expression_add`, `expression_subtract`, `expression_multiply`, `expression_multiply_alt`, `expression_divide`, `expression_equals` |
| `shapes` | `shape_circle`, `shape_square`, `shape_triangle`, `shape_heart`, `star`, `arrow_up`, `arrow_down`, `arrow_left`, `arrow_right`, `triangle_up`, `triangle_down`, `triangle_left`, `triangle_right` |

So a "costs 3" badge is `origins:textures/gui/badge/silent/math/number_3.png`, and a moon phase note is `origins:textures/gui/badge/silent/icons/sky/moon_full.png`.

### Your own

Put a 16×16 PNG in a resource pack at `assets/<namespace>/textures/gui/badge/<name>.png` and write `<namespace>:textures/gui/badge/<name>.png`. Any size loads, but the slot is drawn at 16×16 and anything else is scaled.

> [!TIP]
> A sprite path that resolves to nothing draws the missing texture checkerboard. The badge still works and only the icon is wrong, so check the namespace and the folder first.

## Automatic badges

A power with no `badges` array gets one automatically when its type implies an obvious note:

| Power type | Badge you get |
| --- | --- |
| [`apoli:toggle`](/docs/datapack/powers/toggle) | A keybind badge, using the power's own `key`. |
| Any power type with a `key` field, such as [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:inventory`](/docs/datapack/powers/inventory) and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence) | An "Active" keybind badge, using the power's own `key` (for a sequence, its first key). |
| [`apoli:recipe`](/docs/datapack/powers/recipe) | A crafting recipe badge, built from the power's recipe. |

Writing your own `badges` array replaces the automatic one instead of adding to it.

## Multiple powers

An [`apoli:multiple`](/docs/datapack/powers/multiple) power with no badges of its own shows the merged badges of all its sub-powers, so a bundled origin trait still shows the keybinds and recipes inside it. Give the `multiple` its own `badges` array to replace that with a single summary badge.
