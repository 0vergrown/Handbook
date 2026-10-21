---
title: "Night Vision (Power Type)"
description: "Brightens the world for the entity with the power without applying the status effect."
navigation_title: "Night Vision"
aliases: ["toggle_night_vision"]
---

Brightens the world for the entity with the power the way the Night Vision effect does, without applying an effect. There is no icon, timer or particles, and a milk bucket can't remove it.

Type ID: `apoli:night_vision` (alias `apoli:toggle_night_vision`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strength` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | How bright, from `0.0` (no change) to `1.0` (full Night Vision). Values in between give partial darkvision. An expression is worked out every time the lighting updates, with the entity that has the power as the entity. |

If several night vision powers are active, the highest `strength` wins. They don't stack.

## Examples

Full darkvision at all times:

```json
{
  "type": "apoli:night_vision"
}
```

Weak darkvision while sneaking. Unlike an effect, the power switches on and off instantly:

```json
{
  "type": "apoli:night_vision",
  "strength": 0.4,
  "condition": {
    "type": "apoli:sneaking"
  }
}
```

Tie the strength to a resource with an expression. This one reaches full darkvision at 10 blood:

```json
{
  "type": "apoli:night_vision",
  "strength": "clamp(vampire:blood / 10, 0, 1)"
}
```

Or make it stronger as the world gets darker, so dim places are lifted and bright ones are left alone. [`brightness`](/docs/datapack/data-types/expression#bound-variables) is `1` in daylight and falls toward `0` in the dark:

```json
{
  "type": "apoli:night_vision",
  "strength": "clamp((0.5 - brightness) * 1.6, 0, 0.8)"
}
```

The alias `apoli:toggle_night_vision` exists for packs ported from the original Apoli and behaves the same way.

> [!NOTE]
> This only changes the client's lighting. It doesn't make mobs easier to detect, and it doesn't change the real light level for anything else.
