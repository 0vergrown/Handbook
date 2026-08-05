---
title: "Replace Sound Reception (Power Type)"
description: "Swaps out the sounds the entity that has the power hears."
navigation_title: "Replace Sound Reception"
---

Swaps out the sounds the player that has the power **hears** — every sound, from any source, before it reaches their speakers. Nobody else is affected.

**Type ID:** `apoli:replace_sound_reception`

This is the mirror of [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) and takes exactly the same fields; only the side that gets rewritten differs.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sounds` | Object | **required** | Map of sound to replace → what to replace it with. Same format as [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission#the-sounds-map). |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a match stops the original sound (and every lower-priority power). `false` plays the replacement *on top of* the original. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Action run on the holder whenever one of its rules matches. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Ordering when the holder has several replace-sound powers. Higher runs first. |

> This power only does anything on a **player**, and only for that player's own client. Granting it to a mob does nothing.

> `entity_action` runs on the client, so it is only useful for client-visible effects. Use [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) if you need an action the server acts on.

## Examples

Deafness — mute everything except your own voice and the UI:

```json
{
  "type": "apoli:replace_sound_reception",
  "sounds": {
    "minecraft:(block|entity|ambient|music)\\..*": "minecraft:empty"
  }
}
```

Hear zombies as pigs, and randomise stone footsteps:

```json
{
   "type":"apoli:replace_sound_reception",
   "sounds":{
      "minecraft:entity\\.zombie\\.(.*)":"minecraft:entity.pig.$1",
      "block.stone.step":[
         {
            "id":"minecraft:block.wool.step",
            "weight":3
         },
         {
            "id":"minecraft:block.sand.step",
            "weight":1,
            "pitch":1.2
         }
      ]
   }
}
```

Muffled hearing while underwater, keeping the real sound underneath:

```json
{
   "type":"apoli:replace_sound_reception",
   "condition":{
      "type":"apoli:submerged_in",
      "fluid":"minecraft:water"
   },
   "replace":false,
   "sounds":{
      ".*":{
         "id":"minecraft:block.water.ambient",
         "volume":0.4
      }
   }
}
```
