---
title: "Modify Exhaustion (Power Type)"
description: "Changes how much exhaustion the player receives."
navigation_title: "Modify Exhaustion"
---

Changes the amount of exhaustion the player receives each time they receive any.

Type ID: `apoli:modify_exhaustion`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the exhaustion received. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the exhaustion received. |

## Examples

```json
{
    "type": "apoli:modify_exhaustion",
    "modifier": {
        "name": "Increased exhaustion",
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This triples the player's exhaustion rate.
