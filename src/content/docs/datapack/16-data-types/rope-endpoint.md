---
title: "Rope Endpoint"
description: "Describes one end of a rope (how it is chosen at runtime) used by the from and to fields of the Attach Rope."
---

Describes **one end of a rope** (how it is chosen at runtime) used by the `from` and `to` fields of the [apoli:attach_rope](/docs/datapack/entity-actions/attach_rope). An endpoint resolves to either an entity (the rope follows it) or a fixed world point (immovable, so the other end can't get farther than the rope's length - a tether/leash).

## Fields

| Field      | Type                         | Default    | Description                                                                                                                                                                                                                               |
|------------|------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `source`   | [String](/docs/datapack/data-types/string)           | `"self"`   | Where the endpoint comes from. One of: `self` (the acting entity), `target` (the bi-entity target — only resolves when the action runs in a bi-entity context), `raycast` (cast a ray from the actor's eyes), `position` (a fixed point). |
| `distance` | [Float](/docs/datapack/data-types/float)            | `30.0`     | For `raycast`: how far the ray reaches.                                                                                                                                                                                                   |
| `entities` | [Boolean](/docs/datapack/data-types/boolean)          | `false`    | For `raycast`: whether the ray can attach to an entity it hits.                                                                                                                                                                           |
| `blocks`   | [Boolean](/docs/datapack/data-types/boolean)          | `true`     | For `raycast`: whether the ray can attach to a block it hits. When both `entities` and `blocks` are enabled the nearest hit wins.                                                                                                         |
| `position` | [Array](/docs/datapack/data-types/array) of 3 Float | _optional_ | For `position`: the fixed `[x, y, z]` world point.                                                                                                                                                                                        |

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

