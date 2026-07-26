---
title: "apoli:ignore_fluid"
description: "Prevents the movement of the entity that has the power from being affected by the matching fluid (water by default, but the fluidcondition accepts any)."
---

Prevents the movement of the entity that has the power from being affected by the matching fluid (water by default, but the `fluid_condition` accepts any).

Type ID: `apoli:ignore_fluid` (aliased from `apoli:ignore_water`)

> The legacy `apoli:ignore_water` id from Apace's Apoli still works — it resolves to `apoli:ignore_fluid` at load time. The rename is a clarity merge: the schema is fluid-generic, so the canonical name reflects that. Both ids share one implementation.

## Fields

| Field             | Type                 | Default | Description                                                        |
|-------------------|----------------------|---------|--------------------------------------------------------------------|
| `fluid_condition` | Fluid Condition Type |         | The fluid condition type to check the fluid state at the position. |

## Examples

```json
{
  "type":"apoli:ignore_fluid",
  "fluid_condition":{
    "type":"apoli:in_tag",
    "tag":"minecraft:water"
  }
}
```
This example makes the entity that has the power ignore water.

Legacy form (still works via alias):

```json
{
  "type":"apoli:ignore_water",
  "fluid_condition":{
    "type":"apoli:in_tag",
    "tag":"minecraft:water"
  }
}
```
