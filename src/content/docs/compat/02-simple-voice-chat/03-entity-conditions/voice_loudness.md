---
title: "Voice Loudness (Entity Condition Type)"
description: "Compares how loudly the entity is currently talking."
navigation_title: "Voice Loudness"
---

Compares the entity's current speaking loudness, on a scale of `0` to `100`, against a value.

Type ID: `apoli:voice_loudness`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How to compare. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The value to compare against, from `0` to `100`. |

The default of `>= 1` checks whether the entity is making any sound at all.

> [!NOTE]
> Loudness is estimated from the size of the encoded voice packet, and no audio is decoded. It is cheap but coarse: reliable for telling loud from quiet, not for precise volume. Pick thresholds by testing instead of expecting decibels.

## Example

```json
{
   "type":"apoli:action_on_speak",
   "entity_action":{
      "type":"apoli:area_of_effect",
      "radius":6.0,
      "bientity_action":{
         "type":"apoli:damage",
         "amount":4.0
      }
   },
   "condition":{
      "type":"apoli:voice_loudness",
      "comparison":">=",
      "compare_to":70
   }
}
```

This shockwave only goes off when the holder shouts at a loudness of 70 or more.
