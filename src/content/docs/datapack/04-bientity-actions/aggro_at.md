---
title: "Aggro At (Bi-Entity Action Type)"
description: "Makes a mob (the target) angry at another living entity (the actor)."
navigation_title: "Aggro At"
---

Makes the target angry at the actor. The target can be any mob and the actor any living entity, another mob included, so the action can set mobs on each other.

How the anger works depends on the pair. A neutral mob (a bee, enderman, iron golem, polar bear, wolf or zombified piglin) angered at a player holds the same grudge a wolf holds against a player who hit it. In every other pairing the mob turns on the actor at once, as if the actor had just hurt it, and keeps that target. Mobs whose AI runs on memories, such as piglins and hoglins, also remember the actor as their attack target.

Type ID: `apoli:aggro_at`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `-1` | How long the anger lasts, in ticks. Any negative value means it never runs out. It is the grudge timer of a neutral mob angry at a player, and how long a memory-based mob remembers the actor. Other mobs keep after the actor until they lose track of it or it dies. An expression is evaluated against the actor. |

## Examples

```json
{
    "type": "apoli:action_on_key_press",
    "key": "key.apoli.primary_active",
    "cooldown": 400,
    "entity_action": {
        "type": "apoli:area_of_effect",
        "radius": 16,
        "bientity_action": {
            "type": "apoli:aggro_at",
            "duration": 600
        }
    }
}
```

A taunt: pressing the primary ability key turns the mobs within 16 blocks against the player. Neutral mobs stay angry for 30 seconds.

```json
{
    "type": "apoli:action_on_hit",
    "target_action": {
        "type": "apoli:area_of_effect",
        "radius": 10,
        "bientity_condition": {
            "type": "apoli:target_condition",
            "condition": {
                "type": "apoli:entity_type",
                "entity_type": "minecraft:zombie"
            }
        },
        "bientity_action": {
            "type": "apoli:aggro_at",
            "duration": 200
        }
    }
}
```

Every zombie within 10 blocks of whatever the holder hits turns on that creature. The area of effect runs from the creature that was hit, so it is the actor and each zombie is a target.

```json
"bientity_action": {
    "type": "apoli:aggro_at"
}
```

With no `duration`, a neutral mob's grudge against a player is permanent, and the mob attacks that player on sight until one of them dies.

> [!NOTE]
> The action picks the target and the mob's own AI does the chasing. A mob with `NoAI` stays where it is, and a mob with no way to attack, such as a cow, can't act on it.

> [!NOTE]
> A neutral mob set on another mob calms down as soon as it loses that target. Against a player, most neutral mobs only count `duration` down while they aren't chasing the player, so a mob in the middle of a fight stays angry. Bees count it down all the time.

> [!NOTE]
> When a player dies, neutral mobs within 32 blocks that are angry at them calm down. This follows vanilla's `forgiveDeadPlayers` game rule (on by default). Turn it off to keep grudges past death.
