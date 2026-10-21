---
title: "Stat (Entity Condition Type)"
description: "Compares one of the player's statistics, the values on the Statistics screen, with a number."
navigation_title: "Stat"
aliases: ["stats", "status", "statistic"]
---

Compares one of the player's statistics, the values on the Statistics screen, with a number.

Type ID: `apoli:stat` (aliases `apoli:stats`, `apoli:status` and `apoli:statistic`, and the legacy field name `status` is accepted for `stat`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `stat` | [Stat](/docs/datapack/data-types/stat) | _required_ | Which statistic to read (see below). |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the statistic is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number to compare against. |

### Stat

A [Stat](/docs/datapack/data-types/stat) is either a plain ID string, which is short for the `minecraft:custom` stat type:

```json
"stat": "minecraft:jump"
```

Or an object that picks a typed statistic, where `type` is a stat type (`minecraft:custom`, `minecraft:mined`, `minecraft:crafted`, `minecraft:used`, `minecraft:broken`, `minecraft:picked_up`, `minecraft:dropped`, `minecraft:killed` or `minecraft:killed_by`) and `id` is the entry in that type's registry:

```json
"stat":{
   "type":"minecraft:mined",
   "id":"minecraft:stone"
}
```

Custom stat IDs include `minecraft:jump`, `minecraft:deaths`, `minecraft:mob_kills`, `minecraft:play_time`, `minecraft:walk_one_cm`, `minecraft:sprint_one_cm`, `minecraft:damage_dealt` and `minecraft:damage_taken`. Every distance stat is in centimetres and every time stat is in ticks.

## Notes

- It only works on the server. Statistics live on the server, and clients only receive them when the Statistics screen is opened, so this condition always fails when the client evaluates it. Don't use it in `hud_render` conditions or anywhere else the client evaluates.
- Stats never go below 0. `minecraft:custom` covers all the stats that count actions, and the typed forms count per block, item or entity.
- Pair it with [apoli:modify_stat](/docs/datapack/entity-actions/modify_stat) to build custom counters that show up on the vanilla Statistics screen.

## Example

Let the player use an ability on the attack key once they have walked 2 km:

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
