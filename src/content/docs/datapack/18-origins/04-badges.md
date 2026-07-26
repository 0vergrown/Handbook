---
title: Badges
description: Little icons and notes attached to a power in the origin screen.
---

**Badges** are Origins' way of annotating a [power](/docs/datapack/introduction/powers) in the origin-selection screen — a keybind hint, a crafting recipe, an icon with a tooltip. A badge is attached to a power id via a JSON file in `data/<namespace>/badges/`.

## The shape of a badge file

```json
{
  "power": "my_pack:double_jump",
  "badges": [
    { "type": "origins:keybind", "sprite": "minecraft:textures/gui/sprites/hud/heart/full.png",
      "text": "Press to jump again", "key": "key.jump" }
  ]
}
```

Each entry in `badges` has a `type` and the fields that type needs.

## Badge types

### origins:sprite
Just an icon.

| Field | Type | Default |
| --- | --- | --- |
| `sprite` | identifier | **required** |

### origins:tooltip
An icon with hover text.

| Field | Type | Default |
| --- | --- | --- |
| `sprite` | identifier | **required** |
| `text` | [text component](/docs/datapack/data-types/text-component) | **required** |

### origins:keybind
Shows the key bound to an [active power](/docs/datapack/powers/action_on_key_press).

| Field | Type | Default |
| --- | --- | --- |
| `sprite` | identifier | **required** |
| `text` | text component | **required** |
| `key` | keybinding id | **required** |

### origins:crafting_recipe
Displays a recipe (for powers that add one).

| Field | Type | Default |
| --- | --- | --- |
| `sprite` | identifier | *(default)* |
| `recipe` | identifier / recipe | **required** |

## Automatic badges

Some powers get a badge for free — a power that adds a [recipe](/docs/datapack/powers/inventory) or binds a key can surface it without a hand-written badge file. Add explicit badges when you want extra explanation for the player choosing an origin.

## See also

- [Origins overview](/docs/datapack/origins/overview)
- [Origins-specific types](/docs/datapack/origins/origin-types)
