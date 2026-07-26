---
title: "origins:play_sound"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Plays a sound event at the entity's position.

Type ID: `origins:play_sound`


!!! note

    The value of the `volume` field is used to multiply the base distance of the sound event, which is 16 blocks (`1.0`).


## Fields

| Field      | Type                                      | Default    | Description                                                                                                                                                                                                                                                                                           |
| ---------- | ----------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sound`    | Identifier |            | The ID of the sound event to play.                                                                                                                                                                                                                                                                    |
| `category` | String         | *optional* | If specified, this specifies the category and options the sound event falls under. Otherwise, uses the category specified in the entity that invoked this action. Accepts `"master"`, `"music"`, `"record"`, `"weather"`, `"block"`, `"hostile"`, `"neutral"`, `"players"`, `"ambient"` or `"voice"`. |
| `volume`   | Float           | `1.0`      | The volume of the sound event.                                                                                                                                                                                                                                                                        |
| `pitch`    | Float           | `1.0`      | The pitch of the sound event.                                                                                                                                                                                                                                                                         |



## Examples

```json
"entity_action": {
    "type": "origins:play_sound",
    "sound": "minecraft:entity.chicken.egg"
}
```

This example will play the `minecraft:entity.chicken.egg` sound event that can be heard within a 16 blocks distance. (`16 * 1.0 = 16`)



```json
"entity_action": {
    "type": "origins:play_sound",
    "sound": "minecraft:entity.enderman.death",
    "volume": 1.5
}
```

This example will play the `minecraft:entity.enderman.death` sound event that can be heard within a 24 blocks distance. (`16 * 1.5 = 24`)

