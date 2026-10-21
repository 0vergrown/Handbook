---
title: "Action On Kill (Power Type)"
description: "Runs an action when the entity with the power kills another entity."
navigation_title: "Action On Kill"
aliases: ["self_action_on_kill"]
---

Runs an action when the entity with the power kills another entity. The actor is the entity with the power (the killer), and the target is the entity that died.

Type ID: `apoli:action_on_kill`

## Fields

Every field below works under every ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` runs. It never turns other fields off.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs on the killer and victim as a pair. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the killer, the entity that has the power. |
| `attacker_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the killer. Here the killer is the entity with the power, so this does the same as `self_action`. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity that died. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Legacy field. Runs on whichever side `entity_action_target` names. |
| `entity_action_target` | `"self"`, `"attacker"` or `"target"` | `"self"` | Which entity `entity_action` runs on. The legacy ID below sets it for you. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Must pass for the killer and victim pair before the power fires. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the entity that died. |
| `attacker_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the killer. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | Must pass for the killing damage. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks the power needs to recharge between fires. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |

## Apace compatibility

| Legacy ID | `entity_action` runs on |
|---|---|
| `apoli:action_on_kill` | the killer |
| `apoli:self_action_on_kill` | the killer |

`apoli:self_action_on_kill` is only an alias. It doesn't rename or consume fields, so a power written under it can use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`.

## Examples

```json
{
  "type": "apoli:action_on_kill",
  "self_action": {
    "type": "apoli:heal",
    "amount": 2
  },
  "target_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:skeletons"
  }
}
```

This heals the killer one heart whenever they kill a skeleton.

```json
{
  "type": "apoli:self_action_on_kill",
  "entity_action": {
    "type": "apoli:add_xp",
    "points": 5
  },
  "target_action": {
    "type": "apoli:spawn_particles",
    "particle": "minecraft:soul"
  }
}
```

The legacy ID still runs `entity_action` on the killer, and `target_action` works alongside it.
