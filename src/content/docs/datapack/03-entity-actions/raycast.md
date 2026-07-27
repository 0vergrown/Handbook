---
title: "apoli:raycast"
description: "Fires a ray from an entity's eye position and executes actions based on what it hits."
---

Fires a ray from an entity's eye position and executes actions based on what it hits. Supports per-type distances, custom directions, piercing, particle trails, and command execution along the ray.

Type ID: `apoli:raycast`

## Fields

| Field                           | Type                         | Default    | Description                                                                                                                                                                                                                                                   |
| ------------------------------- | ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `distance`                      | [Float](/docs/datapack/data-types/float)            | *optional* | Maximum range for both block and entity raycasting. Defaults to the entity's effective reach.                                                                                                                                                                 |
| `block`                         | [Boolean](/docs/datapack/data-types/boolean)          | `true`     | Whether the ray can hit blocks                                                                                                                                                                                                                                |
| `entity`                        | [Boolean](/docs/datapack/data-types/boolean)          | `true`     | Whether the ray can hit entities                                                                                                                                                                                                                              |
| `shape_type`                    | [Shape Type](/docs/datapack/data-types/shape-type)       | `visual`   | The shape type used for block collision detection                                                                                                                                                                                                             |
| `fluid_handling`                | [Fluid Handling](/docs/datapack/data-types/fluid-handling)   | `any`      | How fluids are treated during block raycasting                                                                                                                                                                                                                |
| `space`                         | [Space](/docs/datapack/data-types/space)            | `world`    | The coordinate space in which `direction` is interpreted                                                                                                                                                                                                      |
| `direction`                     | [Vector](/docs/datapack/data-types/vector)           | *optional* | Custom ray direction. If omitted, uses the entity's current look direction                                                                                                                                                                                    |
| `pierce`                        | [Boolean](/docs/datapack/data-types/boolean)          | `false`    | If `true`, the ray passes through entities **and blocks**: `bientity_action` runs on every entity along the ray, `block_action` runs on every block the ray intersects (up to 128), and the ray always traces its full length                                                                                                                                       |
| `particle`                      | [Particle Effect](/docs/datapack/data-types/particle-effect)  | *optional* | Particle to spawn at intervals along the ray                                                                                                                                                                                                                  |
| `spacing`                       | [Float](/docs/datapack/data-types/float)            | `0.5`      | Distance in blocks between each particle spawn along the ray                                                                                                                                                                                                  |
| `entity_distance`               | [Float](/docs/datapack/data-types/float)            | *optional* | Maximum range for entity detection only. Overrides `distance` for entities                                                                                                                                                                                    |
| `block_distance`                | [Float](/docs/datapack/data-types/float)            | *optional* | Maximum range for block detection only. Overrides `distance` for blocks                                                                                                                                                                                       |
| `radius`                        | [Vector](/docs/datapack/data-types/vector)           | *optional* | Thickens the ray into a beam for **entity** detection — a single number (uniform) or a vector `{ "x": .., "y": .., "z": .. }` (width / height / depth). Entities within this half-extent of the ray line are hit. Block detection still uses the centre line. |
| `cone_angle`                    | [Float](/docs/datapack/data-types/float)            | *optional* | Turns **entity** detection into a directional **cone attack** — hits every entity within this many degrees of the ray direction, out to the entity range. Takes the place of `radius` for entities; block detection still follows the centre line.            |
| `bientity_condition`            | Bi-entity Condition          | *optional* | If specified, only entities passing this condition (actor = source, target = candidate) are considered valid hits                                                                                                                                             |
| `block_condition`               | Block Condition              | *optional* | If specified, `block_action` only runs when the hit block satisfies this condition                                                                                                                                                                            |
| `bientity_action`               | Bi-entity Action             | *optional* | Action executed on each entity hit (actor = source, target = hit entity)                                                                                                                                                                                      |
| `block_action`                  | Block Action                 | *optional* | Action executed on the block hit by the ray                                                                                                                                                                                                                   |
| `before_action`                 | Entity Action                | *optional* | Action executed on the source entity before the ray is cast                                                                                                                                                                                                   |
| `hit_action`                    | Entity Action                | *optional* | Action executed on the source entity when the ray hits anything                                                                                                                                                                                               |
| `miss_action`                   | Entity Action                | *optional* | Action executed on the source entity when the ray hits nothing                                                                                                                                                                                                |
| `command_at_hit`                | [String](/docs/datapack/data-types/string)           | *optional* | Command to run at the hit position                                                                                                                                                                                                                            |
| `command_hit_offset`            | [Float](/docs/datapack/data-types/float)            | *optional* | Distance to offset the `command_at_hit` position away from the hit surface. Defaults to a small automatic offset based on the hit face                                                                                                                        |
| `command_along_ray`             | [String](/docs/datapack/data-types/string)           | *optional* | Command to run repeatedly at intervals along the ray                                                                                                                                                                                                          |
| `command_step`                  | [Float](/docs/datapack/data-types/float)            | `1.0`      | Interval in blocks between each execution of `command_along_ray`                                                                                                                                                                                              |
| `command_along_ray_only_on_hit` | [Boolean](/docs/datapack/data-types/boolean)          | `false`    | If `true`, `command_along_ray` only runs when the ray hits something                                                                                                                                                                                          |
| `chain_direction`               | [String](/docs/datapack/data-types/string)           | `forward`  | For a **chained** ray only — how the child ray is aimed: `forward` (continue in the same direction), `reflect` (bounce off the hit block's surface), or `custom` (use the child's own `direction`/`space`).                                                   |
| `chain`                         | [apoli:raycast](/docs/datapack/entity-actions/raycast) | *optional* | Another raycast fired from this ray's **end point** (its hit position, or the max-range point on a miss). Lets rays bounce and branch for visual effects. Nests recursively — a `chain` may itself have a `chain`.                                            |

## Notes

- The ray always originates from the entity's **eye position**.
- When both `block` and `entity` are enabled, the **closest** hit wins for `hit_action` and `command_at_hit`. With `pierce`, `bientity_action` fires on every entity closer than the first block hit.
- `distance` is the shared fallback. `entity_distance` and `block_distance` each override it for their respective type. If none of these are set, the entity's live reach values are used (including any modifiers from `reach-entity-attributes`).
- Particles and `command_along_ray` both trace up to the hit position (or the full range on a miss).
- `block_action` respects `block_condition`; `bientity_action` respects `bientity_condition`.
- **`radius`** only affects which entities the beam catches; a wide beam still stops on the first block along its centre line. Use `{ "x": w, "y": h, "z": d }` for a rectangular cross-section (x = left/right, y = up/down, z = forward/back).
- **`cone_angle`** replaces `radius` for entity hits with a directional cone in front of the caster (e.g. `30` gives a 60°-wide cone). Ideal for shout/breath attacks. Pair with `pierce` to hit every entity in the cone; without it, only the nearest is hit. Occlusion is approximate — entities past the centre-line block are still culled.
- **`chain`** re-casts a full raycast from the previous ray's end point. Every level runs its own `before_action`/`hit_action`/`particle`/etc., so you can trace a multi-segment beam. `reflect` uses the hit block's face normal to bounce; if the parent ray hit an entity or nothing, `reflect` falls back to `forward`. Chaining is capped at 32 levels as a safety limit.

## Examples

```json
{
    "type": "apoli:raycast",
    "distance": 10.0,
    "bientity_action": {
        "type": "apoli:damage",
        "amount": 4,
        "source": {
            "name": "magic"
        }
    },
    "hit_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.player.attack.sweep"
    },
    "miss_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.arrow.shoot"
    }
}
```
Damages the first entity in the player's line of sight within 10 blocks.

```json
{
   "type":"apoli:raycast",
   "distance":20.0,
   "entity":false,
   "block_action":{
      "type":"apoli:set_block",
      "block":"minecraft:tnt"
   },
   "block_condition":{
      "type":"apoli:block_state",
      "block":"minecraft:stone"
   }
}
```
Replaces the first stone block in the line of sight with TNT. Ignores entities entirely.

```json
{
   "type":"apoli:raycast",
   "pierce":true,
   "entity_distance":8.0,
   "block_distance":16.0,
   "particle":{
      "type":"minecraft:witch"
   },
   "spacing":0.4,
   "bientity_action":{
      "type":"apoli:add_velocity",
      "z":-2.0,
      "space":"local"
   },
   "command_at_hit":"particle minecraft:explosion ~ ~ ~",
   "command_along_ray_only_on_hit":true
}
```
Fires a piercing ray that pushes back all entities within 8 blocks, traces particles along the path, and spawns an explosion particle at the impact point.

```json
{
   "type":"apoli:raycast",
   "distance":24.0,
   "radius":{
      "x":1.5,
      "y":1.5,
      "z":0.0
   },
   "particle":{
      "type":"minecraft:electric_spark"
   },
   "bientity_action":{
      "type":"apoli:damage",
      "amount":3,
      "source":{
         "name":"magic"
      }
   },
   "chain":{
      "type":"apoli:raycast",
      "distance":24.0,
      "chain_direction":"reflect",
      "particle":{
         "type":"minecraft:electric_spark"
      },
      "bientity_action":{
         "type":"apoli:damage",
         "amount":3,
         "source":{
            "name":"magic"
         }
      }
   }
}
```
A wide (3-block cross-section) spark beam that bounces once off the first wall it hits, damaging entities along both segments.
