---
title: "Advancement (Entity Condition Type)"
description: "Checks whether the player has completed an advancement."
navigation_title: "Advancement"
---

Checks whether the entity has completed an advancement.

Type ID: `apoli:advancement`

> [!NOTE]
> This condition only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `advancement` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the advancement the player must have completed. |

## Examples

```json
"condition": {
    "type": "apoli:advancement",
    "advancement": "minecraft:story/smelt_iron"
}
```

This checks whether the player has the `minecraft:story/smelt_iron` advancement, which they get by smelting or picking up their first iron ingot.
