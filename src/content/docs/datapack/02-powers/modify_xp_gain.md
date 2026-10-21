---
title: "Modify XP Gain (Power Type)"
description: "Changes how much XP the player gains from experience orbs."
navigation_title: "Modify XP Gain"
---

Changes how much XP the player gains when they pick up an experience orb.

Type ID: `apoli:modify_xp_gain`

> [!WARNING]
> Keep the multiplier modest. If it is too high, a player can gain more experience than they lose by dying.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the experience gained. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the experience gained. |

## Examples

```json
{
    "type": "apoli:modify_xp_gain",
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This triples the experience gained from experience orbs.
