---
title: "Aggro At (Bi-Entity Action Type)"
description: "Makes a neutral mob (the target) angry at a player (the actor)."
navigation_title: "Aggro At"
---

Makes the **target** angry at the **actor**, the same grudge a wolf holds against a player who hit it. The target has to be a neutral mob (a bee, enderman, iron golem, polar bear, wolf or zombified piglin) and the actor has to be a player. For any other pair it does nothing.

Type ID: `apoli:aggro_at`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `-1` | How long the mob stays angry, in ticks. Any negative value means the anger never runs out. An Expression is evaluated against the actor.

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

This example is a taunt: pressing the primary ability key turns every neutral mob within 16 blocks against the player for 30 seconds.

```json
"bientity_action": {
    "type": "apoli:aggro_at"
}
```

With no `duration`, the grudge is permanent. The mob attacks this player on sight until one of them dies.

> The action sets the grudge, and the mob's own AI does the rest. It still has to notice the player before it attacks, so a mob with `NoAI`, or one that cannot see the player, will not come after them.

> How the timer runs is up to the mob. Most neutral mobs only count `duration` down while they are not chasing the player, so a mob in the middle of a fight stays angry. Bees count it down all the time.

> When a player dies, neutral mobs within 32 blocks that are angry at them calm down. This follows vanilla's `forgiveDeadPlayers` game rule (on by default); turn it off to keep grudges past death.
