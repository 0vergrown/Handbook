---
title: "Raycast (Bi-Entity Action Type)"
description: "Casts a ray from the actor straight at the target entity."
navigation_title: "Raycast"
aliases: ["raycast_between"]
---

Casts a ray from the actor's eye position straight at the target entity, limited to the distance between them, and runs actions on whatever it passes through.

Type ID: `apoli:raycast` (alias `apoli:raycast_between`)

This is the same action as the [Raycast entity action](/docs/datapack/entity-actions/raycast), with the same fields, and only the aiming differs. Two extra fields matter here:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aim_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Aims at the target instead of along the actor's look direction. |
| `stop_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Limits the ray's length to the distance from the actor to the target. |

An explicit `direction` overrides the automatic aim.

To test whether the target is inside the actor's ray, beam or cone without casting anything, use the [raycast bi-entity condition](/docs/datapack/bientity-conditions/raycast).

## Example

Draw a beam between two entities and break whatever is between them:

```json
{
   "type":"apoli:raycast",
   "particle":{
      "type":"minecraft:electric_spark"
   },
   "spacing":0.3,
   "pierce_blocks":true,
   "block_action":{
      "type":"apoli:set_block",
      "block":"minecraft:air"
   }
}
```

Check line of sight by running a `hit_action` only when something is in the way:

```json
{
   "type":"apoli:raycast",
   "entity":false,
   "hit_action":{
      "type":"apoli:play_sound",
      "sound":"minecraft:block.note_block.bass"
   }
}
```

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
  "modifier": {
    "operation": "set_base",
    "value": "distance"
  }
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
