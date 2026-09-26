---
title: "Raycast (Bi-Entity Condition Type)"
description: "Checks whether the target is inside the actor's raycast — a line, a beam or a cone cast from the actor's eyes."
navigation_title: "Raycast"
---

Checks whether the target is inside the actor's raycast: a ray cast from the actor's eyes in the direction they are looking, thickened into a beam with `radius` or widened into a cone with `cone_angle`. It asks the same question the [raycast action](/docs/datapack/entity-actions/raycast) answers when it picks which entities to hit, but for one target.

Type ID: `apoli:raycast`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `distance` | [Float](/docs/datapack/data-types/float) | _optional_ | How far the ray reaches. When absent, it reaches as far as the actor can hit an entity — their `minecraft:player.entity_interaction_range`, or 3 for anything without that attribute. `entity_distance` is accepted as another name for it. |
| `cone_angle` | [Float](/docs/datapack/data-types/float) | _optional_ | Turns the ray into a cone: the target passes when its centre is within this many degrees of the aim direction and within `distance`. Takes the place of `radius`. |
| `radius` | [Vector](/docs/datapack/data-types/vector) | _optional_ | Thickens the ray into a beam — a single number, or `{ "x": .., "y": .., "z": .. }`. The target passes when its hitbox, grown by this much, crosses the ray. |
| `block` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether blocks between the actor and the target make the condition fail. |
| `shape_type` | [Shape Type](/docs/datapack/data-types/shape-type) | `visual` | Which block shapes count when `block` is `true`. |
| `fluid_handling` | [Fluid Handling](/docs/datapack/data-types/fluid-handling) | `any` | Whether fluids count as blocking when `block` is `true`. |
| `direction` | [Vector](/docs/datapack/data-types/vector) | _optional_ | Aims the ray this way instead of where the actor is looking. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | How `direction` is read. |

Other entities never get in the way — only the target is tested, so a crowd in front of it does not hide it. A target standing so close that the actor's eyes are inside its hitbox (or inside its grown box, with `radius`) always passes.

## Examples

```json
"bientity_condition": {
    "type": "apoli:raycast",
    "distance": 8,
    "cone_angle": 30
}
```

Passes for a target up to 8 blocks away and within 30 degrees of where the actor is looking, with no wall in between — a breath attack's area.

```json
"bientity_condition": {
    "type": "apoli:raycast",
    "distance": 20,
    "radius": 0.5,
    "block": false
}
```

Passes for a target the actor is looking at from up to 20 blocks, through walls, with half a block of leeway around the aim.
