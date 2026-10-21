---
title: "Attribute (Entity Condition Type)"
description: "Compares the total value of one of the entity's attributes with a number."
navigation_title: "Attribute"
---

Compares the total value of one of the entity's attributes with a number.

Type ID: `apoli:attribute`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `attribute` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the attribute to check. [Minecraft Wiki: Attribute (Attributes)](https://minecraft.wiki/w/Attribute#Attributes) lists the vanilla attributes. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the attribute's total value is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the attribute's total value is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:attribute",
    "attribute": "minecraft:generic.armor",
    "comparison": ">=",
    "compare_to": 10.0
}
```

This checks whether the entity's `minecraft:generic.armor` attribute is 10 or more.
