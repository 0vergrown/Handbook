---
title: "Play Sound (Entity Action Type)"
description: "Plays a sound event at the entity's position."
navigation_title: "Play Sound"
---

Plays a sound event at the entity's position.

Type ID: `apoli:play_sound`

> [!NOTE]
> `volume` multiplies the sound's base range of 16 blocks, so at `1.0` the sound is heard up to 16 blocks away.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sound` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the sound event to play. It can be a sound that only a resource pack's `sounds.json` defines, and players without that pack hear nothing. |
| `index` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which of the sound event's sound files to play, counting from `0` in the order `sounds.json` lists them. Leave it out to pick one at random, as Minecraft does. An index past the end of the list also picks at random. |
| `category` | [String](/docs/datapack/data-types/string) | _optional_ | The sound category, which decides which volume slider applies. Leave it out to use the entity's own category. Accepts `"master"`, `"music"`, `"record"`, `"weather"`, `"block"`, `"hostile"`, `"neutral"`, `"players"`, `"ambient"` or `"voice"`. |
| `volume` | [Float](/docs/datapack/data-types/float) | `1.0` | The volume of the sound. |
| `pitch` | [Float](/docs/datapack/data-types/float) | `1.0` | The pitch of the sound. |
| `follow_entity` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the sound moves with the entity instead of staying where it started. |
| `global` | [Boolean](/docs/datapack/data-types/boolean) | `follow_entity` | Whether the sound can be heard at any distance, ignoring the usual falloff. Defaults to the value of `follow_entity`. |
| `internal` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to skip playing the sound for the entity itself, so only other players hear it. Only has an effect when the entity is a player. |

## Examples

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.chicken.egg"
}
```

This plays `minecraft:entity.chicken.egg`, which can be heard up to 16 blocks away (`16 * 1.0 = 16`).

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.enderman.death",
    "volume": 1.5
}
```

This plays `minecraft:entity.enderman.death`, which can be heard up to 24 blocks away (`16 * 1.5 = 24`).

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.blaze.burn",
    "follow_entity": true,
    "volume": 0.6
}
```

The sound travels with the entity instead of staying where it started, and stays audible however far away the listener is, because `global` defaults to the value of `follow_entity` and is `true` here too.

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.creeper.primed",
    "internal": true
}
```

Everyone nearby hears the fuse except the player who has the power.

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.pig.ambient",
    "index": 2
}
```

This plays the third of the pig's three ambient sounds every time, instead of a random one.

> [!NOTE]
> Each player's game picks the file from its own copy of the sound event, so a resource pack that changes the event's list of sounds also changes which file an `index` plays for players using that pack.

> [!WARNING]
> A `global` sound is sent to every player in the dimension. Use it for boss cues and one-off events, and keep it out of anything that runs every tick.
