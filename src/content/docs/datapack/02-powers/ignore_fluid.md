---
title: "Ignore Fluid (Power Type)"
description: "Stops the entity being affected by the matching fluid — water by default, but the fluid_condition accepts any."
navigation_title: "Ignore Fluid"
aliases: ["ignore_water"]
---

Makes the holder move through a fluid as if it were air: no pushing, no floating, no swimming and no fluid physics. Water by default, but the `fluid_condition` accepts any fluid — lava included.

Type ID: `apoli:ignore_fluid` (aliased from `apoli:ignore_water`)

> The legacy `apoli:ignore_water` id from Apace's Apoli still works — it resolves to `apoli:ignore_fluid` at load time, and with no `fluid_condition` it ignores water exactly as it used to.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid_condition` | [Fluid Condition Type](/docs/datapack/fluid-conditions) | _water_ | Which fluid to ignore. Tested against every fluid block the holder touches. Left out, the power ignores water. |

## Behaviour

- Every fluid block the holder's body touches is tested on its own, so brushing the edge of a lake or the side of a lava pool is ignored as well as being in the middle of it. Fluid blocks that fail the condition still act normally, so ignoring `apoli:still` water lets currents carry you.
- In an ignored fluid the holder walks along the bottom and falls under normal gravity. It does not swim, even while sprinting, and cannot start swimming there.
- Ignoring **lava** means lava cannot hurt the holder or set it on fire. Fire from anything else still burns.
- Only movement and contact are ignored. With its head under an ignored fluid the holder still runs out of air and still sees the fluid's fog — pair the power with [apoli:fluid_vision](/docs/datapack/powers/fluid_vision) or water breathing for a full "lives in water" effect.

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
