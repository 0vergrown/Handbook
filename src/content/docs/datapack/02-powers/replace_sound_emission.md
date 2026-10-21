---
title: "Replace Sound Emission (Power Type)"
description: "Replaces the sounds the entity that has the power makes."
navigation_title: "Replace Sound Emission"
---

Replaces the sounds the entity that has the power makes, such as its hurt and death sounds, footsteps, eating, equipping, attack swings and the level-up chime. Everyone who can hear the entity hears the replacement, including the entity itself.

Type ID: `apoli:replace_sound_emission`

To change what the entity hears instead, use [`apoli:replace_sound_reception`](/docs/datapack/powers/replace_sound_reception). Both take the same fields.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sounds` | [Object](/docs/datapack/data-types/object) | _required_ | Maps each sound to replace to what replaces it. See below. |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether a match stops the original sound and every power with a lower priority. `false` plays the replacement on top of the original. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity whenever one of the power's rules matches. It runs once, on the server, however many players hear the sound. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | The order when the entity has several sound replacement powers. Higher runs first. |

## The sounds map

Each key is a sound event ID or a regular expression that matches one, and each value is what plays instead.

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

A value can be a bare sound ID, one object or an array of objects. An array picks one at random, weighted:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | [String](/docs/datapack/data-types/string) | _required_ | The sound event to play. `minecraft:empty` plays nothing, which mutes the original. |
| `volume` | [Float](/docs/datapack/data-types/float) | the original's | The replacement's volume. |
| `pitch` | [Float](/docs/datapack/data-types/float) | the original's | The replacement's pitch. |
| `weight` | [Integer](/docs/datapack/data-types/integer) | `1` | The relative chance of being picked from an array. The minimum is `1`. |

### How a key is matched

A key with no regex metacharacters (`\ ^ $ | ? * + ( ) [ ] { }`) is an exact sound ID, matched by a direct lookup. `entity.player.hurt` means `minecraft:entity.player.hurt`, because the `minecraft:` namespace is filled in for you. Exact keys are checked first and cost nothing.

Any other key is a regular expression, tested against the full namespaced ID (`minecraft:entity.zombie.ambient`), and it has to match the whole ID. Regex keys are tried in the order they appear in the file, and the first match wins. JSON needs backslashes doubled, so `\\.` is a literal dot.

A regex key can use capture groups in the replacement ID, where `$1` is the first group. The example above turns every `minecraft:entity.zombie.*` sound into the matching `minecraft:entity.pig.*` one with a single rule.

> [!TIP]
> Use exact keys where you can. A pack full of regex rules runs every one of them against every sound the entity makes, while exact IDs are a single hash lookup.

## Examples

Sound like a ghast, with your own footsteps muted:

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
