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
      "sprite": "origins:textures/gui/badge/active.png",
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

## Automatic badges

A power with **no** `badges` array gets one for free when its type implies an obvious note:

| Power type | Badge you get |
| --- | --- |
| [`apoli:toggle`](/docs/datapack/powers/toggle) | keybind badge, using the power's own `key` |
| [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) | keybind badge, using the power's own `key` |
| [`apoli:recipe`](/docs/datapack/powers/recipe) | crafting-recipe badge, built from the power's recipe |

Writing your own `badges` array replaces the automatic one — it does not add to it.

## Multiple powers

An [`apoli:multiple`](/docs/datapack/powers/multiple) power with no badges of its own shows the **merged** badges of all its sub-powers, so a bundled origin trait still surfaces the keybinds and recipes hidden inside it. Give the `multiple` its own `badges` array to override that with a single summary badge instead.
