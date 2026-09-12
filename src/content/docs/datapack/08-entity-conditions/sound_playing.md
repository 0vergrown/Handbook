---
title: "Sound Playing (Entity Condition Type)"
description: "Checks whether a sound was played near the entity recently enough to still be audible."
navigation_title: "Sound Playing"
aliases: ["playing_sound", "hearing_sound"]
---

Checks whether a given sound started playing near the entity within the last `duration` ticks. Use it to react to music discs, mob calls, ambience or your own [`apoli:play_sound`](/docs/datapack/entity-actions/play_sound) effects.

Type ID: `apoli:sound_playing`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `sound` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The sound event to watch for, e.g. `minecraft:entity.ender_dragon.growl`. |
| `category` | [String](/docs/datapack/data-types/string) | _optional_ | Only match this sound category: `master`, `music`, `record`, `weather`, `block`, `hostile`, `neutral`, `players`, `ambient`, `voice`. Omit to match any. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `20` | How many ticks after the sound starts it still counts as playing. Set this to roughly the length of the sound. |
| `range` | [Float](/docs/datapack/data-types/float) | the sound's own range | Maximum distance from the entity to the point the sound was played. Left out, the sound's own audible radius is used, so the condition is true exactly for entities that could hear it. |

## How it works

Apoli records the sound events it sees being played and the condition looks that list up. It is a **recent-emission** test, not a query of the audio engine: it answers "did this sound start near me in the last `duration` ticks", which is why `duration` exists. A looping sound re-registers only when it is restarted, so give long or looping sounds a `duration` that covers them.

Only sounds that some loaded power actually asks about are recorded, so a pack that never uses this condition pays nothing for it.

> `duration` is your estimate of how long the sound lasts — the game does not expose sound lengths to data packs. Too short and the condition flickers off early; too long and it stays true after the sound has finished.

## Examples

Glow while a warden's heartbeat is audible:

```json
{
    "type": "apoli:glowing",
    "condition": {
        "type": "apoli:sound_playing",
        "sound": "minecraft:entity.warden.heartbeat",
        "duration": 40
    }
}
```

Dance to a jukebox — a screen overlay that shows only while a record is playing within 16 blocks:

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/disco.png",
    "strength": 0.5,
    "condition": {
        "type": "apoli:sound_playing",
        "sound": "minecraft:music_disc.pigstep",
        "category": "record",
        "range": 16,
        "duration": 2952
    }
}
```

Take damage from a creeper's fuse, wherever it is on the server:

```json
{
    "type": "apoli:action_over_time",
    "interval": 5,
    "entity_action": { "type": "apoli:damage", "amount": 1, "damage_type": "minecraft:generic" },
    "condition": {
        "type": "apoli:sound_playing",
        "sound": "minecraft:entity.creeper.primed",
        "duration": 30
    }
}
```
