---
title: "Rope Endpoint (Data Type)"
description: "Describes one end of a rope for the from and to fields of apoli:attach_rope."
navigation_title: "Rope Endpoint"
---

Describes one end of a rope, and how that end is picked when the action runs, for the `from` and `to` fields of [apoli:attach_rope](/docs/datapack/entity-actions/attach_rope). An endpoint resolves to either an entity, which the rope follows, or a fixed point in the world, which doesn't move, so the other end can't get further away than the rope's length, like a tether or leash.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | [String](/docs/datapack/data-types/string) | `"self"` | Where the endpoint comes from: `self` (the acting entity), `target` (the bi-entity target, which only resolves when the action runs as a bi-entity action), `raycast` (a ray cast from the actor's eyes) or `position` (a fixed point). |
| `distance` | [Float](/docs/datapack/data-types/float) | `30.0` | For `raycast`, how far the ray reaches. |
| `entities` | [Boolean](/docs/datapack/data-types/boolean) | `false` | For `raycast`, whether the ray can attach to an entity it hits. |
| `blocks` | [Boolean](/docs/datapack/data-types/boolean) | `true` | For `raycast`, whether the ray can attach to a block it hits. With both `entities` and `blocks` on, the nearest hit wins. |
| `position` | [Array](/docs/datapack/data-types/array) of 3 Float | _optional_ | For `position`, the fixed `[x, y, z]` point in the world. |

## Examples

```json
{
   "source":"self"
}
```

The acting entity.

```json
{
   "source":"raycast",
   "entities":true,
   "blocks":false,
   "distance":20
}
```

Whatever entity the actor is looking at within 20 blocks.

```json
{
   "source":"position",
   "position":[
      100.5,
      64,
      200.5
   ]
}
```

A fixed anchor in the world.
