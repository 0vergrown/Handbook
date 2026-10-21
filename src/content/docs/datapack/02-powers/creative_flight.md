---
title: "Creative Flight (Power Type)"
description: "Lets the player fly as if they were in Creative mode."
navigation_title: "Creative Flight"
---

Lets the player fly as if they were in Creative mode.

Type ID: `apoli:creative_flight`

## Fields

_None._

The power's `condition` controls the flight. While it fails, flight is taken away and the player drops out of the air, and flight comes back as soon as the condition passes again. Suppressing the power with [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power) does the same. Creative and Spectator mode are never touched, so a Creative player keeps flying either way.

Flight from this power doesn't protect from fall damage. A player who stops flying in mid-air, or walks off a ledge, takes fall damage like anyone else. To make the player immune to falls as well, add [apoli:invulnerability](/docs/datapack/powers/invulnerability) with an [apoli:from_falling](/docs/datapack/damage-conditions/from_falling) damage condition.

Vanilla lets anyone who is allowed to fly sprint with an empty hunger bar. Apoli keeps that shortcut for Creative and Spectator mode only, so a Survival player with this power still needs more than 6 food points (3 shanks) to start or keep a sprint.

## Examples

Flight at all times:

```json
{
    "type": "apoli:creative_flight"
}
```

Flight only while there is mana left:

```json
{
    "type": "apoli:creative_flight",
    "condition": {
        "type": "apoli:resource",
        "resource": "example:mana",
        "comparison": ">",
        "compare_to": 0
    }
}
```

Drain the resource over time and the player falls when it runs out.

Flight with the same fall immunity a Creative player has:

```json
{
    "type": "apoli:multiple",
    "flight": {
        "type": "apoli:creative_flight"
    },
    "no_fall_damage": {
        "type": "apoli:invulnerability",
        "damage_condition": {
            "type": "apoli:from_falling"
        }
    }
}
```
