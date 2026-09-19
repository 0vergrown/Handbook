---
title: "Freeze (Entity Action Type)"
description: "Freezes the entity, as if it were standing in powder snow."
navigation_title: "Freeze"
---

Sets the entity's freeze counter — the same counter powder snow fills, driving the frost vignette, the blue tint on the model and, once it is full, freeze damage.

Type ID: `apoli:freeze`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | What to set the freeze counter to. Left out, the entity is frozen solid immediately and stays there — set just far enough past the threshold to survive vanilla's drain, so freeze damage actually lands. A negative value freezes it effectively forever. |

## How the counter behaves

`duration` is the **counter value**, not a stopwatch. Vanilla runs it down on its own, so the effect outlasts nothing you have to clean up:

| | |
| --- | --- |
| Fully frozen at | `140` on almost everything (`getTicksRequiredToFreeze`) |
| Drains by | **2 per tick** on a living entity that is out of powder snow, down to `0` |
| Drains by | nothing at all on a non-living entity — it keeps whatever you set until something clears it |
| Damage | `1` every 40 ticks while the counter is full, on living entities the server ticks |

So `"duration": 140` is 70 ticks of visible frost on a player, and none of it counts as fully frozen — the drain runs *before* the damage check each tick, so a counter set exactly to the threshold is already below it when vanilla looks. Leave `duration` out, or set it at least 2 above the threshold, if you want the damage. For a sustained freeze, run the action repeatedly — [apoli:action_over_time](/docs/datapack/powers/action_over_time) with `"interval": 1` re-fills the counter faster than vanilla drains it.

Entities in `#minecraft:freeze_immune_entity_types` (strays, polar bears, snow golems, the wither) never take freeze damage, though the counter still rises and the frost still shows. Setting an entity on fire clears the counter outright.

## Examples

Freeze solid on the spot:

```json
{
  "type": "apoli:freeze"
}
```

Half a second of frost on a player, and nothing after:

```json
{
  "type": "apoli:freeze",
  "duration": 20
}
```

Keep the target frozen for as long as the power holds — the replacement for the old `apoli:freeze` power type:

```json
{
  "type": "apoli:action_over_time",
  "interval": 1,
  "entity_action": {
    "type": "apoli:freeze"
  },
  "condition": {
    "type": "apoli:biome",
    "condition": {
      "type": "apoli:precipitation",
      "precipitation": "snow"
    }
  }
}
```

Frost that deepens as a resource drains:

```json
{
  "type": "apoli:freeze",
  "duration": "280 - example:warmth * 2"
}
```

> Writing `{"type": "apoli:freeze"}` as a **power** still works — it is read as the `apoli:action_over_time` above. New packs should write the action, which can be fired from anything and takes a duration.
