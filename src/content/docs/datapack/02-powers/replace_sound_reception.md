---
title: "Replace Sound Reception (Power Type)"
description: "Replaces the sounds the player that has the power hears."
navigation_title: "Replace Sound Reception"
---

Replaces the sounds the player that has the power hears: every sound, from any source, before it reaches their speakers. Nobody else is affected.

Type ID: `apoli:replace_sound_reception`

It is the mirror of [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) and takes the same fields. Only the side that gets rewritten differs.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sounds` | [Object](/docs/datapack/data-types/object) | _required_ | Maps each sound to replace to what replaces it, in the same format as [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission#the-sounds-map). |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a match stops the original sound and every power with a lower priority. `false` plays the replacement on top of the original. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the player whenever one of the power's rules matches. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | The order when the player has several sound replacement powers. Higher runs first. |

> [!NOTE]
> This power only does anything on a player, and only for that player's own client. Granting it to a mob does nothing.

With `"replace": false`, the original keeps playing as it would have, looping included, and each layered sound plays once. Layering a chime over a minecart's rolling sound gives one chime, not a chime that loops with the cart.

`entity_action` runs on the client, so it only helps with effects the client can show. Use [`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) for an action the server should act on.

## Examples

Deafness, muting block, entity, ambient and music sounds while leaving item and interface sounds:

```json
{
  "type": "apoli:replace_sound_reception",
  "sounds": {
    "minecraft:(block|entity|ambient|music)\\..*": "minecraft:empty"
  }
}
```

Hear zombies as pigs, and replace stone footsteps with a random mix:

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

Muffled hearing while underwater, with the real sounds still playing underneath:

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
