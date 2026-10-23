---
title: "Raycast (Entity Action Type)"
description: "Fires a ray from an entity's eyes, or straight at a target entity, and runs actions based on what it hits."
navigation_title: "Raycast"
---

Fires a ray from an entity's eye position and runs actions based on what it hits. It supports separate distances for blocks and entities, custom directions, piercing, particle trails and commands along the ray.

Type ID: `apoli:raycast`

It is registered as both an entity action and a bi-entity action. As a bi-entity action, it aims the ray straight at the target entity instead of along the actor's look direction (see [Aiming at a target](#aiming-at-a-target)). The type alias `apoli:raycast_between` is accepted for the bi-entity form.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The maximum range for both blocks and entities. Without it, the ray reaches as far as the entity can (see the notes below). |
| `block` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the ray can hit blocks. |
| `entity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the ray can hit entities. |
| `shape_type` | [Shape Type](/docs/datapack/data-types/shape-type) | `visual` | The block shape used for collision. |
| `fluid_handling` | [Fluid Handling](/docs/datapack/data-types/fluid-handling) | `any` | How fluids are treated when the ray checks blocks. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | The space `direction` is read in. |
| `direction` | [Vector](/docs/datapack/data-types/vector) | _optional_ | A custom ray direction. Without it, the ray uses the entity's current look direction. |
| `pierce` | [Boolean](/docs/datapack/data-types/boolean) | `false` | A shorthand that sets both `pierce_blocks` and `pierce_entities`. |
| `pierce_blocks` | [Boolean](/docs/datapack/data-types/boolean) | `pierce` | With `true`, the ray passes through blocks: `block_action` runs on every block the ray crosses (up to 128), blocks stop hiding the entities behind them, and the ray traces its full length. |
| `pierce_entities` | [Boolean](/docs/datapack/data-types/boolean) | `pierce` | With `true`, the ray passes through entities, and `bientity_action` runs on every entity along the ray instead of only the nearest. |
| `aim_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Bi-entity form only. Aims the ray at the target entity instead of along the actor's look direction. |
| `stop_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Bi-entity form only. Limits the ray's length to the distance between the actor and the target. |
| `particle` | [Particle Effect](/docs/datapack/data-types/particle-effect) | _optional_ | A particle to spawn at intervals along the ray. |
| `spacing` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.5` | The distance in blocks between particles along the ray. |
| `entity_distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The maximum range for entities only. It overrides `distance` for entities, and with neither set the entity's entity reach is used. |
| `block_distance` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The maximum range for blocks only. It overrides `distance` for blocks, and with neither set the entity's block reach is used. |
| `radius` | [Float](/docs/datapack/data-types/float), [Vector](/docs/datapack/data-types/vector) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Thickens the ray into a beam for entity hits. It takes a number or expression for every axis, or a vector `{ "x": .., "y": .., "z": .. }` with a number or expression in each, for width, height and depth. Entities within this half-size of the ray line are hit. Blocks still use the centre line. |
| `cone_angle` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Turns entity hits into a cone attack that hits every entity within this many degrees of the ray direction, out to the entity range. It takes the place of `radius` for entities, and blocks still follow the centre line. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only entities that pass this count as hits, with the source as the actor and the candidate as the target. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | `block_action` only runs when the hit block passes this condition. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs for each entity hit, with the source as the actor and the hit entity as the target. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | Runs on the block the ray hits. |
| `before_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the source entity before the ray is cast. |
| `hit_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the source entity when the ray hits anything. |
| `miss_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the source entity when the ray hits nothing. |
| `command_at_hit` | [String](/docs/datapack/data-types/string) | _optional_ | A command to run at the hit position, which is the nearest hit, block or entity. It doesn't run on a miss. |
| `command_hit_offset` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | How far in blocks to move the `command_at_hit` position back out of what was hit: along the block face for a block, or back along the ray for an entity. |
| `command_along_ray` | [String](/docs/datapack/data-types/string) | _optional_ | A command to run repeatedly at intervals along the ray. |
| `command_step` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1.0` | The distance in blocks between runs of `command_along_ray`. |
| `command_along_ray_only_on_hit` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, `command_along_ray` only runs when the ray hits something. |
| `chain_direction` | [String](/docs/datapack/data-types/string) | `forward` | For a chained ray only, how the child ray is aimed: `forward` continues in the same direction, `reflect` bounces off the hit block's surface, and `custom` uses the child's own `direction` and `space`. |
| `chain` | [apoli:raycast](/docs/datapack/entity-actions/raycast) | _optional_ | Another raycast fired from this ray's end point, which is its hit position or, on a miss, the point at its maximum range. It lets rays bounce and branch for visual effects, and it nests, so a `chain` can have its own `chain`. |

The numeric fields accept an [expression](/docs/datapack/data-types/expression). Each one is evaluated against the entity casting the ray, when that segment of the ray is cast. As a bi-entity action the entity is the actor, and the target is bound too, so a field can read `target_` variables.

## Notes

- The ray always starts at the entity's eye position.
- When both `block` and `entity` are on, the closest hit wins for `hit_action` and `command_at_hit`. With `pierce_entities`, `bientity_action` fires on every entity along the ray. With `pierce_blocks`, walls stop hiding the entities behind them.
- `distance` is the shared fallback, and `entity_distance` and `block_distance` each override it for their own kind of hit. With none of them set, the ray reaches exactly as far as the entity can interact. Blocks use its `minecraft:player.block_interaction_range` (4.5 for a player, 5 in creative) and entities its `minecraft:player.entity_interaction_range` (3 for a player, 5 in creative, or 6 on 1.20.1). Reach bonuses from [apoli:attribute](/docs/datapack/powers/attribute) make the ray longer too. An entity without those attributes, such as any mob, uses the player defaults of 4.5 and 3.
- Particles and `command_along_ray` both trace up to the hit position, or the full range on a miss.
- `block_action` checks `block_condition`, and `bientity_action` checks `bientity_condition`.
- `radius` only changes which entities the beam catches, and a wide beam still stops on the first block along its centre line. Use `{ "x": w, "y": h, "z": d }` for a rectangular cross-section, where x is left and right, y is up and down, and z is forward and back.
- An entity already inside the radius around the caster's eyes is hit at distance `0`, so a beam `3` wide catches whatever is standing on top of you. A radius is a volume around the ray, which is the point of it.
- `cone_angle` replaces `radius` for entity hits with a cone in front of the caster. `30` gives a cone 60° wide, which suits shout and breath attacks. Pair it with `pierce_entities` to hit every entity in the cone, since without it only the nearest is hit. Blocking is approximate, and entities behind the block on the centre line are still left out.
- `chain` casts a full raycast again from the previous ray's end point. Every level runs its own `before_action`, `hit_action`, `particle` and the rest, so you can trace a beam with several segments. `reflect` uses the hit block's face to bounce, and if the parent ray hit an entity or nothing, `reflect` falls back to `forward`. Chains stop at 32 levels as a safety limit.

## Aiming at a target

Used as a bi-entity action, the ray is cast from the actor's eyes straight at the target entity, and its length is limited to the gap between them. That gives you a check for whether there is a wall between the two: run a `block_action` on whatever is in the way, or draw a particle line between two entities.

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

Set `aim_at_target: false` to keep the actor's look direction, or `stop_at_target: false` to let the ray carry on past the target out to its normal `distance`. An explicit `direction` also wins over the automatic aim.

## Values the hooks can read

While this action runs, it binds [expression](/docs/datapack/data-types/expression) variables that the hooks, and anything nested inside them, can read:

| Variable | In `hit_action` and `miss_action` | In `bientity_action` | In `block_action` |
| --- | --- | --- | --- |
| `distance` | to where the ray stopped | to that entity's hit point | to that block's hit point |
| `hit_x`, `hit_y`, `hit_z` | where the ray stopped | that entity's hit point | that block's hit point |
| `count` | `1` if anything was hit, otherwise `0` | how many entities the ray hit | `1` |
| `index` | `0` | the zero-based order of this entity along the ray | the pierce step |

So the hit distance can go straight into a resource, instead of being approximated with a table of hard-coded bands:

```json
"hit_action": {
    "type": "apoli:modify_resource",
    "resource": "example:last_shot_distance",
    "modifier": { "operation": "set_base", "value": "distance" }
}
```

Or the damage can scale with how far the shot travelled:

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
        "damage_type": "minecraft:magic"
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

This damages the first entity in the player's line of sight within 10 blocks.

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

This replaces the first stone block in the line of sight with TNT and ignores entities entirely.

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

This fires a piercing ray that pushes back every entity within 8 blocks, traces particles along the path and spawns an explosion particle where it hits.

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
      "damage_type":"minecraft:magic"
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
         "damage_type":"minecraft:magic"
      }
   }
}
```

A wide spark beam with a 3-block cross-section that bounces once off the first wall it hits, damaging entities along both segments.

```json
{
    "type": "apoli:raycast",
    "distance": "8 + health / 4",
    "cone_angle": "15 + 5 * abs(velocity_x) + 5 * abs(velocity_z)",
    "particle": {
        "type": "minecraft:electric_spark"
    },
    "spacing": 0.3
}
```

This cone reaches further as the entity's health rises and widens with its horizontal speed.
