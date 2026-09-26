---
title: "Night Vision (Power Type)"
description: Brightens the world for the holder without applying the status effect.
navigation_title: "Night Vision"
aliases: ["toggle_night_vision"]
---

Brightens the world for whoever holds it, the way the Night Vision effect does, but without applying an effect — so there is no icon, no timer, no particles, and nothing a milk bucket can remove.

Type ID: `apoli:night_vision` (alias `apoli:toggle_night_vision`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`strength` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | How bright, from `0.0` (no change) to `1.0` (full Night Vision). Values in between give partial darkvision. As an Expression it is worked out every time the lighting updates, with the holder as the entity.

If several night vision powers are active, the highest `strength` wins; it does not stack.

## Examples

Full, always-on darkvision:

```json
{
  "type": "apoli:night_vision"
}
```

Weak darkvision that only works while you are still, which reads much better than an effect because it can switch instantly:

```json
{
  "type": "apoli:night_vision",
  "strength": 0.4,
  "condition": {
    "type": "apoli:sneaking"
  }
}
```

Tie the strength to a resource with an Expression — this one reaches full darkvision at 10 blood:

```json
{
  "type": "apoli:night_vision",
  "strength": "clamp(vampire:blood / 10, 0, 1)"
}
```

Or make it climb as the world gets darker, so dim places are lifted and bright ones are left alone. [`brightness`](/docs/datapack/data-types/expression#bound-variables) is `1` in daylight and falls toward `0` in the dark:

```json
{
  "type": "apoli:night_vision",
  "strength": "clamp((0.5 - brightness) * 1.6, 0, 0.8)"
}
```

The alias `apoli:toggle_night_vision` exists for packs ported from the original Apoli and behaves identically.

> This affects the client's lighting only. It does not make mobs easier to detect, and it does not change actual light levels for anything else.
