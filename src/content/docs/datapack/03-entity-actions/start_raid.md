---
title: "Start Raid (Entity Action Type)"
description: "Starts a raid on the village the entity is in, credited to that entity, or strengthens the raid already there."
navigation_title: "Start Raid"
---

Starts a raid on the village the entity is standing in, as if it had walked in carrying an omen of `omen_level`. If a raid is already running there, that raid absorbs the omen and grows stronger instead.

Type ID: `apoli:start_raid`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`omen_level` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | The omen level the raid absorbs, from `1` to `5`. A new raid starts at this level; a raid already running here adds it to its own level, up to `5`. Values outside `1`–`5` are clamped. Higher levels add a bonus wave and give raiders better odds of enchanted gear.
`success_action` | Entity Action Type | _optional_ | Runs on the entity when a raid starts or grows.
`fail_action` | Entity Action Type | _optional_ | Runs on the entity when no raid can start here. See below.

## Who gets the credit

The raid is credited to the entity that ran the action, the same way vanilla credits a raid to the player whose omen started it.

- A **player** gets the *Raids Triggered* statistic, and the `minecraft:voluntary_exile` advancement trigger fires for them. Like vanilla, both happen only while the raid has not spawned its first wave yet.
- **Any other entity** — a mob, an armor stand, a marker — starts the raid from its own position. Vanilla records nothing else about who started a raid, so there is nothing more to give it.

Hero of the Village still works the vanilla way: kill at least one raider and win.

## When it fails

Nothing happens and `fail_action` runs when:

- the entity is not in a village. This is the same test Bad Omen uses: a village is wherever villagers have claimed beds, workstations or a bell;
- the entity is a spectator;
- the difficulty is Peaceful;
- the `disableRaids` game rule is on;
- the dimension has `has_raids` set to `false` in its dimension type (the Nether, by default);
- the raid already here has ended and is celebrating, or has already spawned its first wave at level `5`.

The raid is centred where vanilla would centre it: the average position of the claimed beds, workstations and bells within 64 blocks of the entity.

## Examples

```json
"entity_action": {
    "type": "apoli:start_raid"
}
```

Starts a level 1 raid on the village the entity is in.

```json
{
    "type": "apoli:action_on_key_press",
    "key": { "key": "key.apoli.primary_active" },
    "entity_action": {
        "type": "apoli:start_raid",
        "omen_level": 3,
        "success_action": {
            "type": "apoli:play_sound",
            "sound": "minecraft:event.raid.horn",
            "volume": 4.0
        },
        "fail_action": {
            "type": "apoli:execute_command",
            "command": "title @s actionbar \"There is no village to raid here.\""
        }
    }
}
```

Pressing the primary active key calls a level 3 raid down on the village and sounds the raid horn. Outside a village, the player is told why nothing happened.

```json
"entity_action": {
    "type": "apoli:start_raid",
    "omen_level": "resource(example:infamy)"
}
```

The raid's level comes from a resource, so it can grow with how much trouble the player has caused.

> The action works on any entity, so a data pack can start a raid at a chosen spot by running it on a marker placed there. The credit then goes to the marker, not to a player.
