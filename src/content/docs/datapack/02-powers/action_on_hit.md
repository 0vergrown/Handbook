---
title: "Action On Hit (Power Type)"
description: "Runs an action when the entity that has the power hits another entity, after the hit's damage lands."
navigation_title: "Action On Hit"
aliases: ["self_action_on_hit", "target_action_on_hit"]
---

Runs an action when the entity that has the power hits another entity, after the hit's damage lands. The actor is the entity with the power, and the target is the entity that was hit.

Type ID: `apoli:action_on_hit`

## Fields

Every field below works under every ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` runs. It never turns other fields off.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs on the actor and target pair when the hit lands. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the actor, the entity that has the power. |
| `attacker_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the attacker. Here the attacker is the entity with the power, so this does the same as `self_action`. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the target, the entity that was hit. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Legacy field. Runs on whichever side `entity_action_target` names. |
| `entity_action_target` | `"self"`, `"attacker"` or `"target"` | `"self"` | Which entity `entity_action` runs on. The legacy IDs below set it for you. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Must pass for the actor and target pair before the power fires. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the target. |
| `attacker_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the attacker, the entity with the power. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | Must pass for the damage that was dealt. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks the power needs to recharge between fires. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |

All action and condition fields are optional. Setting several actions runs all of them, in the order listed above.

Inside any of these actions, the `damage` [expression](/docs/datapack/data-types/expression) variable holds the damage amount of the hit.

## Apace compatibility

This power type takes in three legacy Apace types, and JSON written for the old IDs loads unchanged.

| Legacy ID | `entity_action` runs on | Notes |
|---|---|---|
| `apoli:action_on_hit` | the actor | Apace's main type used `bientity_action`. Here `entity_action` is an Apoli extension. |
| `apoli:self_action_on_hit` | the actor | Apace's variant that ran the action on the actor. |
| `apoli:target_action_on_hit` | the target | Apace's variant that ran the action on the target. |

The legacy IDs are only aliases. They don't rename or consume fields, so a power written as `apoli:target_action_on_hit` can still use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`, and `apoli:action_on_hit` accepts `entity_action` too. To run `entity_action` on a side the alias doesn't imply, set `entity_action_target`.

## Examples

### Knockback on hit

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:add_velocity",
        "z": 2
    }
}
```

### Heal the attacker with self_action_on_hit

```json
{
    "type": "apoli:self_action_on_hit",
    "entity_action": {
        "type": "apoli:heal",
        "amount": 2
    }
}
```

This loads as `apoli:action_on_hit`, with `entity_action` running on the actor.

### Set the target on fire with target_action_on_hit

```json
{
    "type": "apoli:target_action_on_hit",
    "entity_action": {
        "type": "apoli:set_on_fire",
        "duration": 4
    },
    "target_condition": {
        "type": "apoli:living"
    }
}
```

This loads as `apoli:action_on_hit`, with `entity_action` running on the target and `target_condition` kept as written.
