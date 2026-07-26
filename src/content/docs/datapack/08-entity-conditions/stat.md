---
title: "apoli:stat"
description: "Compares one of the player's in-game statistics (the values on the Statistics screen) against a number."
---

Compares one of the player's in-game statistics (the values on the Statistics screen) against a number.

Type ID: `apoli:stat`

Aliases: `apoli:stats`, `apoli:status`, `apoli:statistic` (the legacy `status` field name is also accepted for `stat`)

## Fields

| Field        | Type                | Default | Description                                                                              |
| ------------ | ------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `stat`       | [Stat](/docs/datapack/data-types/stat)    | *required* | Which statistic to read (see below).                                                  |
| `comparison` | Comparison          | `>=`    | How to compare the stat value.                                                            |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | *required* | The number to compare against.                                                        |

### [Stat](/docs/datapack/data-types/stat)

Either a plain id string, shorthand for the `minecraft:custom` stat type:

```json
"stat": "minecraft:jump"
```

or an object choosing a typed statistic, where `type` is a stat type (`minecraft:custom`, `minecraft:mined`, `minecraft:crafted`, `minecraft:used`, `minecraft:broken`, `minecraft:picked_up`, `minecraft:dropped`, `minecraft:killed`, `minecraft:killed_by`) and `id` is the entry in that type's registry:

```json
"stat":{
   "type":"minecraft:mined",
   "id":"minecraft:stone"
}
```

Custom stat ids include e.g. `minecraft:jump`, `minecraft:deaths`, `minecraft:mob_kills`, `minecraft:play_time`, `minecraft:walk_one_cm`, `minecraft:sprint_one_cm`, `minecraft:damage_dealt`, `minecraft:damage_taken` all distance stats are in centimetres, all time stats in ticks.

## Notes

- **Server side only.** Statistics live on the server (clients only receive them when the stats screen is opened), so this condition always fails when evaluated client-side (don't use it for HUD `hud_render` conditions or other client-evaluated spots).
- Stats never go below 0. `minecraft:custom` covers all the "action counter" stats; the typed forms count per block/item/entity.
- Pair with the [apoli:modify_stat](/docs/datapack/entity-actions/modify_stat) to build custom counters that show up on the vanilla Statistics screen.

## Example

Run an action once the player has travelled 2 km on foot:

```json
{
   "type":"apoli:active_self",
   "entity_action":{
      "type":"apoli:execute_command",
      "command":"tellraw @s [\"You've walked far enough.\"]"
   },
   "key":{
      "key":"key.attack"
   },
   "condition":{
      "type":"apoli:stat",
      "stat":"minecraft:walk_one_cm",
      "comparison":">=",
      "compare_to":200000
   }
}
```

