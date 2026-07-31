---
title: "Raycast (Bi-Entity Action Type)"
description: "Casts a ray from the actor straight at the target entity."
navigation_title: "Raycast"
aliases: ["raycast_between"]
---

Casts a ray from the actor's eye position straight at the **target** entity, clamped to the distance between them, and runs actions on whatever it passes through.

Type ID: `apoli:raycast` (alias: `apoli:raycast_between`)

This is the same action as the entity-action [`Raycast (Entity Action Type)`](/docs/datapack/entity-actions/raycast) with the same fields with only the aiming differs. Two extra fields matter here:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `aim_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Aim at the target instead of the actor's look direction. |
| `stop_at_target` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Clamp the ray's length to the actor→target distance. |

Setting an explicit `direction` overrides the automatic aim.

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

Check line-of-sight by running a `hit_action` only when something is in the way:

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
