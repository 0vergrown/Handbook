---
title: Entity actions
description: The most common action flavour — things that happen to a single entity.
---

An **entity action** acts on one entity. Wherever a power exposes an `entity_action` (or `self_action`) field, any of these can go in it. This page covers the ones you'll use constantly; the pattern is always the same — a `type`, plus a few fields.

## The essentials

### `apoli:heal`

Restore health.

```json
{ "type": "apoli:heal", "amount": 4 }
```

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `amount` | number | — | Half-hearts to restore. |

### `apoli:apply_effect`

Give a status effect. The `effect` field takes one effect or a list (the legacy key `effects` also works).

```json
{
  "type": "apoli:apply_effect",
  "effect": {
    "effect": "minecraft:regeneration",
    "duration": 200,
    "amplifier": 1,
    "is_ambient": false,
    "show_particles": true
  }
}
```

### `apoli:clear_effect`

Remove one effect, or all of them if `effect` is omitted.

```json
{ "type": "apoli:clear_effect", "effect": "minecraft:poison" }
```

## Fire, food, air

| Action | What it does |
| --- | --- |
| `apoli:set_on_fire` | Set the entity alight for `duration` ticks. |
| `apoli:extinguish` | Put out any fire. |
| `apoli:feed` | Restore hunger + saturation. |
| `apoli:exhaust` | Add exhaustion (drains hunger). |
| `apoli:gain_air` | Refill (or drain) the air bubbles. |

```json
{ "type": "apoli:set_on_fire", "duration": 60 }
```

## Feedback — sound, particles, text

```json
{
  "type": "apoli:and",
  "actions": [
    { "type": "apoli:play_sound", "sound": "minecraft:entity.player.levelup" },
    { "type": "apoli:spawn_particles",
      "particle": "minecraft:heart", "count": 6, "spread": { "x": 0.4, "y": 0.6, "z": 0.4 } }
  ]
}
```

## Powers, resources, commands

Entity actions can reach back into Apoli itself:

- `apoli:grant_power` / `apoli:revoke_power` — add or remove a power (with a source).
- `apoli:change_resource` / `apoli:modify_resource` — adjust a [resource](/docs/datapack/powers/overview) power's value.
- `apoli:trigger_cooldown` — start a cooldown power ticking.
- `apoli:execute_command` — run a command as the entity.

```json
{ "type": "apoli:execute_command", "command": "say I have been hit!" }
```

> Actions that involve *two* entities — like `apoli:damage`, `apoli:add_velocity` or `apoli:mount` — are [bi-entity actions](/docs/datapack/actions/overview#actions-come-in-flavours), not entity actions. They belong in a `bientity_action` field.

## See also

- [Meta-actions](/docs/datapack/actions/meta-actions) — combine and branch actions.
- [Conditions](/docs/datapack/conditions/overview) — gate an action on a test.
