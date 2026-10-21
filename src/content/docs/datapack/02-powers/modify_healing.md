---
title: "Modify Healing (Power Type)"
description: "Changes how much health the entity gets from every source of healing."
navigation_title: "Modify Healing"
---

Changes how much health the entity gets from every source of healing.

Type ID: `apoli:modify_healing`

It applies to every source that goes through the game's healing path: natural regeneration, Regeneration and Instant Health, golden apples, feeding a tamed animal and the [apoli:heal](/docs/datapack/entity-actions/heal) action. The result is clamped at `0`, so a modifier that would make healing negative stops healing instead of dealing damage.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the healing. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the healing. |

## Examples

```json
{
    "type": "apoli:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": 1
    }
}
```

This doubles all healing the entity receives.

```json
{
    "type": "apoli:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": -0.5
    }
}
```

This halves all healing the entity receives.

```json
{
    "type": "apoli:modify_healing",
    "modifier": {
        "operation": "multiply_total",
        "value": -1
    }
}
```

This stops the entity from being healed at all.
