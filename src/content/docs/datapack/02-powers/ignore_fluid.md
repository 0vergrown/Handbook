---
title: "Ignore Fluid (Power Type)"
description: "The entity moves through a fluid as if it were air. Water by default, and fluid_condition picks any other fluid."
navigation_title: "Ignore Fluid"
aliases: ["ignore_water"]
---

Makes the entity move through a fluid as if it were air, with no pushing, floating, swimming or fluid physics. The fluid is water by default, and `fluid_condition` can pick any other fluid, lava included.

Type ID: `apoli:ignore_fluid` (aliased from `apoli:ignore_water`)

The legacy `apoli:ignore_water` ID from Apace's Apoli resolves to `apoli:ignore_fluid` at load time, and with no `fluid_condition` it ignores water.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid_condition` | [Fluid Condition Type](/docs/datapack/fluid-conditions) | _water_ | Which fluid to ignore, tested against every fluid block the entity touches. Without it, the power ignores water. |

## Behaviour

- Every fluid block the entity's body touches is tested on its own, so brushing the edge of a lake or the side of a lava pool is ignored as well as being in the middle of one. Fluid blocks that fail the condition still act normally, so ignoring `apoli:still` water lets currents carry you.
- In an ignored fluid the entity walks along the bottom and falls under normal gravity. It doesn't swim, even while sprinting, and can't start swimming there.
- Ignoring lava means lava can't hurt the entity or set it on fire. Fire from anything else still burns.
- Only movement and contact are ignored. With its head in an ignored fluid the entity still runs out of air and still sees the fluid's fog. Add [apoli:fluid_vision](/docs/datapack/powers/fluid_vision) or water breathing for an origin that lives in water.

## Examples

Walk along the sea floor:

```json
{
  "type": "apoli:ignore_fluid"
}
```

Wade through lava untouched:

```json
{
  "type": "apoli:ignore_fluid",
  "fluid_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:lava"
  }
}
```

Ignore every fluid:

```json
{
  "type": "apoli:ignore_fluid",
  "fluid_condition": {
    "type": "apoli:empty",
    "inverted": true
  }
}
```
