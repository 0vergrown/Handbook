---
title: "Body Part (Damage Condition Type)"
description: "Checks which part of the body the damage hit — the head, an arm, the chest, the back of a foot — worked out from where the hit came from and the pose the target is in."
navigation_title: "Body Part"
---

Checks which part of the body the damage hit — the head, an arm, the chest, the back of a foot — worked out from where the hit came from and the pose the target is in.

Type ID: `apoli:body_part`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`body_part` | [Body Part](/docs/datapack/data-types/body-part) or Array of Body Part | _any part_ | Passes when the hit landed on one of these parts. Limbs, regions such as `hands`, `chest` or `achilles_heel`, and groups such as `arms` or `upper` all work. An unknown name is a load error.
`x_min` / `x_max` | Float | `-1.0` / `1.0` | Side to side across the target's hitbox: `-1` is its right edge, `1` its left.
`y_min` / `y_max` | Float | `0.0` / `1.0` | Bottom to top: `0` is the feet, `1` the top of the head. `0.88` always sits at eye level, so a head band starting there follows eye height on tall and short entities alike.
`z_min` / `z_max` | Float | `-1.0` / `1.0` | Front to back: `-1` is the front, `1` the back.
`require_hit_data` | Boolean | `false` | Only pass when the hit has a real direction behind it — a projectile, a melee swing or an explosion — rather than a guess. See [How the hit is found](#how-the-hit-is-found).

`body_part` and the ranges combine: every one that is written has to pass. Leave `body_part` out to test only the ranges.

## How the hit is found

The first of these that applies decides where the damage landed:

1. **Damage type tags.** Damage that has no direction to it is routed by the damage type tags `#apoli:body_part/head`, `/body`, `/arms`, `/hands`, `/legs` and `/feet`. Apoli puts falling anvils and blocks, falling stalactites, flying into a wall and suffocating in a wall on the head; drowning, starving and cramming on the body; and falling, magma blocks and stalagmites on the feet. Add your own damage types to these tags to route them. A tagged hit counts as a guess for `require_hit_data`.
2. **A projectile or other non-living source** — an arrow, a fireball, a trident, TNT — is traced along its path of travel into the target.
3. **A player's melee hit** follows the line they are looking along, so aiming at the head lands on the head.
4. **Another mob's melee hit** comes in level from a little over half that mob's height, so a silverfish bites at the feet and a zombie strikes the torso.
5. **Damage with a source position but no entity**, such as an explosion, is traced from that position towards the target.
6. **Anything else** lands on a random limb, and counts as a guess.

The trace is made against the target's body **as it is posed right now**: crouching, swimming, riding, gliding, holding a shield up or drawing a bow, and any [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) transformation that is applied to it. An entity laid flat by a power takes a head hit where its head actually is. A trace that passes close by the body without touching it lands on the nearest limb, but only counts as a real hit when it came within a quarter of a block.

This uses the humanoid body for players and for every entity type in the `#apoli:humanoid` entity type tag (zombies, skeletons, piglins, armor stands, clones and the like — add your own). Any other entity has no limbs to trace against, so its hitbox is split into bands instead: the top eighth is the head, the sides of the upper half are the arms, and so on.

> With [dev mode](/docs/datapack/commands/dev-mode) on, every hit that this condition works out is reported in chat — the limb, any regions it falls in, how it was decided and the `x`/`y`/`z` values the ranges test against — which is the quickest way to tune a range.

## Examples

```json
{
  "type": "apoli:modify_damage_dealt",
  "damage_condition": {
    "type": "apoli:and",
    "conditions": [
      {
        "type": "apoli:projectile"
      },
      {
        "type": "apoli:body_part",
        "body_part": "head",
        "require_hit_data": true
      }
    ]
  },
  "modifier": {
    "operation": "multiply_total",
    "amount": 1
  }
}
```

A marksman power: arrows the holder shoots deal double damage on a headshot.

```json
{
  "type": "apoli:multiple",
  "armoured_torso": {
    "type": "apoli:modify_damage_taken",
    "damage_condition": {
      "type": "apoli:body_part",
      "body_part": [
        "body",
        "arms"
      ]
    },
    "modifier": {
      "operation": "multiply_total",
      "amount": -0.5
    }
  },
  "weak_heel": {
    "type": "apoli:modify_damage_taken",
    "damage_condition": {
      "type": "apoli:body_part",
      "body_part": "achilles_heel"
    },
    "modifier": {
      "operation": "multiply_total",
      "amount": 2
    },
    "self_action": {
      "type": "apoli:apply_effect",
      "effect": {
        "effect": "minecraft:slowness",
        "duration": 60,
        "amplifier": 2
      }
    }
  }
}
```

Hits to the torso or arms deal half damage, and a hit to the back of the foot deals triple damage and slows the holder down.

```json
{
  "type": "apoli:action_when_hit",
  "damage_condition": {
    "type": "apoli:body_part",
    "y_min": 0.6,
    "z_min": 0
  },
  "entity_action": {
    "type": "apoli:execute_command",
    "command": "say Right in the back!"
  }
}
```

Ranges on their own: anything that hits the upper back half of the holder's hitbox.
