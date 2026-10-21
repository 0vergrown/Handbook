---
title: "Name (Damage Condition Type)"
description: "Checks the damage source's message ID, such as inWall or fall."
navigation_title: "Name"
---

Checks whether the damage source uses a given name.

Type ID: `apoli:name`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | [String](/docs/datapack/data-types/string) | _required_ | The damage source's message ID. See the table below. |

## Damage source names

The name is the damage type's message ID, which is the `message_id` field of the damage type JSON and not the damage type's own ID. Several damage types share one on purpose, so `apoli:name` is a coarser check than [`apoli:type`](/docs/datapack/damage-conditions/type) or [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag), and those are better when you can use them.

| Name | Damage types that use it |
| --- | --- |
| `inFire` | `minecraft:in_fire`, `minecraft:campfire` |
| `lightningBolt` | `minecraft:lightning_bolt` |
| `onFire` | `minecraft:on_fire`, `minecraft:unattributed_fireball` |
| `lava` | `minecraft:lava` |
| `hotFloor` | `minecraft:hot_floor` |
| `inWall` | `minecraft:in_wall` |
| `cramming` | `minecraft:cramming` |
| `drown` | `minecraft:drown` |
| `starve` | `minecraft:starve` |
| `cactus` | `minecraft:cactus` |
| `fall` | `minecraft:fall` |
| `flyIntoWall` | `minecraft:fly_into_wall` |
| `outOfWorld` | `minecraft:out_of_world` |
| `generic` | `minecraft:generic` |
| `magic` | `minecraft:magic` |
| `wither` | `minecraft:wither` |
| `dragonBreath` | `minecraft:dragon_breath` |
| `dryout` | `minecraft:dry_out` |
| `sweetBerryBush` | `minecraft:sweet_berry_bush` |
| `freeze` | `minecraft:freeze` |
| `stalagmite` | `minecraft:stalagmite` |
| `fallingBlock` | `minecraft:falling_block` |
| `anvil` | `minecraft:falling_anvil` |
| `fallingStalactite` | `minecraft:falling_stalactite` |
| `sting` | `minecraft:sting` |
| `mob` | `minecraft:mob_attack`, `minecraft:mob_attack_no_aggro`, `minecraft:mob_projectile`, `minecraft:spit`, `minecraft:wind_charge` |
| `player` | `minecraft:player_attack` |
| `arrow` | `minecraft:arrow` |
| `trident` | `minecraft:trident` |
| `fireworks` | `minecraft:fireworks` |
| `fireball` | `minecraft:fireball` |
| `witherSkull` | `minecraft:wither_skull` |
| `thrown` | `minecraft:thrown` |
| `indirectMagic` | `minecraft:indirect_magic` |
| `thorns` | `minecraft:thorns` |
| `explosion` | `minecraft:explosion` |
| `explosion.player` | `minecraft:player_explosion` |
| `sonic_boom` | `minecraft:sonic_boom` |
| `badRespawnPoint` | `minecraft:bad_respawn_point` |
| `outsideBorder` | `minecraft:outside_border` |
| `genericKill` | `minecraft:generic_kill` |

A data pack that adds its own damage type sets its own `message_id`, and that name works here too.

## Examples

```json
"damage_condition": {
    "type": "apoli:name",
    "name": "inWall"
}
```

This checks whether the damage source name is `inWall`, so the condition is true when the entity is suffocating in a block.
