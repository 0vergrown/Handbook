---
title: "Modify Swim Speed (Power Type)"
description: "Modifies how fast the entity that has the power swims."
navigation_title: "Modify Swim Speed"
---

Modifies how fast the entity that has the power swims.

Type ID: `apoli:modify_swim_speed`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will apply to the swim speed.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will apply to the swim speed.

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

This power will make the entity that has the power swim/walk significantly faster in water.

> The modifier applies to how much momentum you keep each tick in water, which is `0.8` when wading and `0.9` while actually swimming (swimming counts as sprinting). Both cases are modified, so the power works in the swimming pose too.

> The result is clamped to `0.96` — the value vanilla's own Dolphin's Grace uses. Momentum retention closer to `1.0` sends terminal velocity through the roof and trips the server's "moved too quickly" check.
