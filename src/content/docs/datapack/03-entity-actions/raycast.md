---
title: "Raycast (Entity Action Type)"
description: "Fires a ray from an entity's eye position — or straight at a target entity — and executes actions based on what it hits."
navigation_title: "Raycast"
---

Fires a ray from an entity's eye position and executes actions based on what it hits. Supports per-type distances, custom directions, piercing, particle trails, and command execution along the ray.

Type ID: `apoli:raycast`

Registered as **both an entity action and a bi-entity action**. As a bi-entity action it aims the ray straight at the target entity instead of the actor's look direction — see [Aiming at a target](#aiming-at-a-target). The type-alias `apoli:raycast_between` is accepted for the bi-entity form.

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
| `pierce`                        | [Boolean](/docs/datapack/data-types/boolean)          | `false`    | Shorthand that sets both `pierce_blocks` and `pierce_entities`.                                                                                                                                                                                               |
| `pierce_blocks`                 | [Boolean](/docs/datapack/data-types/boolean)          | `pierce`   | If `true`, the ray passes **through blocks**: `block_action` runs on every block the ray intersects (up to 128), blocks stop culling entities behind them, and the ray traces its full length.                                                                 |
| `pierce_entities`               | [Boolean](/docs/datapack/data-types/boolean)          | `pierce`   | If `true`, the ray passes **through entities**: `bientity_action` runs on every entity along the ray instead of only the nearest.                                                                                                                              |
| `aim_at_target`                 | [Boolean](/docs/datapack/data-types/boolean)          | `true`     | Bi-entity form only — aim the ray at the target entity instead of the actor's look direction.                                                                                                                                                                 |
| `stop_at_target`                | [Boolean](/docs/datapack/data-types/boolean)          | `true`     | Bi-entity form only — clamp the ray's length to the distance between actor and target.                                                                                                                                                                        |
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
| `command_at_hit`                | [String](/docs/datapack/data-types/string)           | *optional* | Command to run at the hit position — the nearest hit, whether that is a block **or an entity**. Not run on a miss.                                                                                                                                             |
| `command_hit_offset`            | [Float](/docs/datapack/data-types/float)            | `0.0`      | Distance in blocks to push the `command_at_hit` position back out of what was hit — along the block face normal for a block hit, back along the ray for an entity hit                                                                                          |
| `command_along_ray`             | [String](/docs/datapack/data-types/string)           | *optional* | Command to run repeatedly at intervals along the ray                                                                                                                                                                                                          |
| `command_step`                  | [Float](/docs/datapack/data-types/float)            | `1.0`      | Interval in blocks between each execution of `command_along_ray`                                                                                                                                                                                              |
| `command_along_ray_only_on_hit` | [Boolean](/docs/datapack/data-types/boolean)          | `false`    | If `true`, `command_along_ray` only runs when the ray hits something                                                                                                                                                                                          |
| `chain_direction`               | [String](/docs/datapack/data-types/string)           | `forward`  | For a **chained** ray only — how the child ray is aimed: `forward` (continue in the same direction), `reflect` (bounce off the hit block's surface), or `custom` (use the child's own `direction`/`space`).                                                   |
| `chain`                         | [apoli:raycast](/docs/datapack/entity-actions/raycast) | *optional* | Another raycast fired from this ray's **end point** (its hit position, or the max-range point on a miss). Lets rays bounce and branch for visual effects. Nests recursively — a `chain` may itself have a `chain`.                                            |

## Notes

- The ray always originates from the entity's **eye position**.
- When both `block` and `entity` are enabled, the **closest** hit wins for `hit_action` and `command_at_hit`. With `pierce_entities`, `bientity_action` fires on every entity along the ray; with `pierce_blocks`, entities behind a wall stop being culled.
- `distance` is the shared fallback. `entity_distance` and `block_distance` each override it for their respective type. If none of these are set, the entity's live reach values are used (including any modifiers from `reach-entity-attributes`).
- Particles and `command_along_ray` both trace up to the hit position (or the full range on a miss).
- `block_action` respects `block_condition`; `bientity_action` respects `bientity_condition`.
- **`radius`** only affects which entities the beam catches; a wide beam still stops on the first block along its centre line. Use `{ "x": w, "y": h, "z": d }` for a rectangular cross-section (x = left/right, y = up/down, z = forward/back).
- **`cone_angle`** replaces `radius` for entity hits with a directional cone in front of the caster (e.g. `30` gives a 60°-wide cone). Ideal for shout/breath attacks. Pair with `pierce_entities` to hit every entity in the cone; without it, only the nearest is hit. Occlusion is approximate — entities past the centre-line block are still culled.
- **`chain`** re-casts a full raycast from the previous ray's end point. Every level runs its own `before_action`/`hit_action`/`particle`/etc., so you can trace a multi-segment beam. `reflect` uses the hit block's face normal to bounce; if the parent ray hit an entity or nothing, `reflect` falls back to `forward`. Chaining is capped at 32 levels as a safety limit.

## Aiming at a target

Used as a **bi-entity action**, the ray is cast from the actor's eyes straight at the target entity, with its length clamped to the gap between them. That gives you the "is there a wall between us?" trace: run a `block_action` on whatever is in the way, or draw a particle line between two entities.

```json
{
    "type": "apoli:raycast",
    "particle": { "type": "minecraft:end_rod" },
    "spacing": 0.4,
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:air"
    }
}
```

Placed in a `bientity_action` slot, this draws a line of particles from the actor to the target and clears the first block between them.

Set `aim_at_target: false` to keep the actor's look direction, or `stop_at_target: false` to let the ray keep going past the target out to its normal `distance`. Supplying an explicit `direction` also wins over the automatic aim.

## Values the hooks can read

While this action runs, it binds [Expression](/docs/datapack/data-types/expression) variables that the hooks — and anything nested inside them — can read:

| Variable | In `hit_action` / `miss_action` | In `bientity_action` | In `block_action` |
| --- | --- | --- | --- |
| `distance` | to where the ray stopped | to that entity's hit point | to that block's hit point |
| `hit_x`, `hit_y`, `hit_z` | where the ray stopped | that entity's hit point | that block's hit point |
| `count` | `1` if anything was hit, else `0` | how many entities the ray hit | `1` |
| `index` | `0` | the zero-based order of this entity along the ray | the pierce step |

So the hit distance can go straight into a resource, instead of being approximated by a table of hard-coded bands:

```json
"hit_action": {
    "type": "apoli:modify_resource",
    "resource": "example:last_shot_distance",
    "modifier": { "operation": "set_base", "value": "distance" }
}
```

Or scale the damage by how far the shot travelled:

```json
"bientity_action": {
    "type": "apoli:damage",
    "damage_type": "minecraft:player_attack",
    "amount": "max(1, 20 - distance)"
}
```

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
