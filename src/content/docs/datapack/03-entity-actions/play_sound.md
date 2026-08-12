---
title: "Play Sound (Entity Action Type)"
description: "Plays a sound event at the entity's position."
navigation_title: "Play Sound"
---

Plays a sound event at the entity's position.

Type ID: `apoli:play_sound`

> The value of the `volume` field is used to multiply the base distance of the sound event, which is 16 blocks (`1.0`).


## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sound` | [Identifier](/docs/datapack/data-types/identifier) | | The ID of the sound event to play. |
| `category` | String | *optional* | If specified, this specifies the category and options the sound event falls under. Otherwise, uses the category specified in the entity that invoked this action. Accepts `"master"`, `"music"`, `"record"`, `"weather"`, `"block"`, `"hostile"`, `"neutral"`, `"players"`, `"ambient"` or `"voice"`. |
| `volume` | [Float](/docs/datapack/data-types/float) | `1.0` | The volume of the sound event. |
| `pitch` | [Float](/docs/datapack/data-types/float) | `1.0` | The pitch of the sound event. |
| `follow_entity` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the sound moves with the entity instead of staying at the position it started at. |
| `global` | [Boolean](/docs/datapack/data-types/boolean) | `follow_entity` | Whether the sound is audible at any distance, ignoring the usual range falloff. Defaults to whatever `follow_entity` is. |
| `internal` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to skip playing the sound for the entity itself, so only *other* players hear it. Only has an effect when the entity is a player. |

## Examples

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.chicken.egg"
}
```

This example will play the `minecraft:entity.chicken.egg` sound event that can be heard within a 16 blocks distance. (`16 * 1.0 = 16`)

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.enderman.death",
    "volume": 1.5
}
```

This example will play the `minecraft:entity.enderman.death` sound event that can be heard within a 24 blocks distance. (`16 * 1.5 = 24`)

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.blaze.burn",
    "follow_entity": true,
    "volume": 0.6
}
```

The sound travels with the entity instead of staying where it started, and stays audible however far away the listener is — `global` defaults to whatever `follow_entity` is, so it is `true` here too.

```json
"entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.creeper.primed",
    "internal": true
}
```

Everyone nearby hears the fuse except the player who has the power.

> A sound that is `global` is sent to every player in the dimension. Use it for boss cues and one-shot events, not for anything that runs on a tick.
