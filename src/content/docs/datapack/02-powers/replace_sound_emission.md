---
title: "Replace Sound Emission (Power Type)"
description: "Swaps out the sounds the entity that has the power makes."
navigation_title: "Replace Sound Emission"
---

Swaps out the sounds the entity that has the power **makes** — its hurt and death sounds, footsteps, eating, equipping, attack swings, level-up chime and so on. Everyone who can hear the entity hears the replacement.

**Type ID:** `apoli:replace_sound_emission`

For the other direction — changing what the holder *hears* — use [`apoli:replace_sound_reception`](/docs/datapack/powers/replace_sound_reception). Both share the same fields.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sounds` | Object | **required** | Map of sound to replace → what to replace it with. See below. |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a match stops the original sound (and every lower-priority power). `false` plays the replacement *on top of* the original. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Action run on the holder whenever one of its rules matches. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Ordering when the holder has several replace-sound powers. Higher runs first. |

## The `sounds` map

Each key is a sound event id **or** a regular expression matching one; each value is what to play instead.

```json
"sounds": {
  "entity.player.hurt": "minecraft:entity.ghast.hurt",
  "entity.player.big_fall": { "id": "minecraft:entity.iron_golem.damage", "volume": 0.6 },
  "block.grass.step": [
    { "id": "minecraft:block.wool.step", "weight": 3 },
    { "id": "minecraft:block.snow.step", "weight": 1, "pitch": 1.4 }
  ],
  "minecraft:entity\\.zombie\\.(.*)": "minecraft:entity.pig.$1"
}
```

A value can be a bare sound id, one object, or an array of objects. An array picks one at random, weighted:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | String | **required** | The sound event to play. `minecraft:empty` plays nothing, which mutes the original. |
| `volume` | [Float](/docs/datapack/data-types/float) | the original's | Volume of the replacement. |
| `pitch` | [Float](/docs/datapack/data-types/float) | the original's | Pitch of the replacement. |
| `weight` | [Integer](/docs/datapack/data-types/integer) | `1` | Relative chance of being picked out of an array. Minimum `1`. |

### How a key is matched

A key with no regex metacharacters (`\ ^ $ | ? * + ( ) [ ] { }`) is an **exact sound id** and is matched by a direct lookup — `entity.player.hurt` is `minecraft:entity.player.hurt`, and the `minecraft:` namespace is filled in for you. Exact keys are checked first and cost nothing.

Any other key is a **regular expression**, tested against the full namespaced id (`minecraft:entity.zombie.ambient`) and required to match it **completely**. Regex keys are tried in the order they appear in the file, and the first match wins. Remember JSON needs backslashes doubled: `\\.` is a literal dot.

A regex key can use capture groups in the replacement id — `$1` is the first group. The example above turns every `minecraft:entity.zombie.*` sound into the matching `minecraft:entity.pig.*` one in a single rule.

> Prefer exact keys. A pack full of regex rules runs every one of them against every sound the entity makes; exact ids are a hash lookup.

## Examples

Sound like a ghast — and mute your own footsteps:

```json
{
  "type": "apoli:replace_sound_emission",
  "sounds": {
    "entity.player.hurt": "minecraft:entity.ghast.hurt",
    "entity.player.death": "minecraft:entity.ghast.death",
    "minecraft:block\\..*\\.step": "minecraft:empty"
  }
}
```

Layer a chime over every sound you make, without taking the original away:

```json
{
   "type":"apoli:replace_sound_emission",
   "replace":false,
   "priority":10,
   "sounds":{
      ".*":{
         "id":"minecraft:block.amethyst_block.chime",
         "volume":0.3
      }
   }
}
```
