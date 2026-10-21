---
title: "Modify Swim Speed (Power Type)"
description: "Changes how fast the entity that has the power swims."
navigation_title: "Modify Swim Speed"
---

Changes how fast the entity that has the power swims.

Type ID: `apoli:modify_swim_speed`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the swim speed. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the swim speed. |

## Examples

```json
{
    "type": "apoli:modify_swim_speed",
    "modifier": {
        "operation": "addition",
        "value": 0.025
    }
}
```

This makes the entity swim and wade much faster in water.

The modifier applies to how much momentum the entity keeps each tick in water, which is `0.8` when wading and `0.9` while swimming (swimming counts as sprinting). Both cases are modified, so the power also works in the swimming pose.

> [!NOTE]
> The result is clamped to `0.96`, the value vanilla's Dolphin's Grace uses. Keeping momentum closer to `1.0` would push the top speed far too high and trip the server's "moved too quickly" check.
