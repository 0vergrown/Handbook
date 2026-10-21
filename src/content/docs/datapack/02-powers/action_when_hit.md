---
title: "Action When Hit (Power Type)"
description: "Runs an action when another entity hits the entity that has the power, after the hit's damage lands."
navigation_title: "Action When Hit"
aliases: ["self_action_when_hit", "attacker_action_when_hit", "action_when_damage_taken"]
---

Runs an action when another entity hits the entity that has the power, after the hit's damage lands. The actor is the attacker, and the target is the entity with the power.

Type ID: `apoli:action_when_hit`

## Fields

Every field below works under every ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` runs. It never turns other fields off.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs on the actor and target pair when the hit lands. |
| `self_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the target, the entity that has the power. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the target. Here the target is the entity with the power, so this does the same as `self_action`. |
| `attacker_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the actor, the entity that dealt the damage. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Legacy field. Runs on whichever side `entity_action_target` names. |
| `entity_action_target` | `"self"`, `"attacker"` or `"target"` | `"self"` | Which entity `entity_action` runs on. The legacy IDs below set it for you. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Must pass for the actor and target pair before the power fires. It fails if there is no attacker. |
| `attacker_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the attacker. It fails if there is no attacker. |
| `target_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Must pass for the target, the entity with the power. |
| `damage_condition` | [Damage Condition Type](/docs/datapack/damage-conditions) | _optional_ | Must pass for the damage that was dealt. |
| `cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Ticks the power needs to recharge between fires. |
| `hud_render` | [HUD Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | How the cooldown is shown on the HUD. |

If the damage has no living attacker, as with environmental damage or `/kill`, `bientity_condition` and `attacker_condition` fail, and `bientity_action`, `attacker_action` and an `entity_action` bound to the attacker are skipped. `self_action` and `target_action` still fire.

Inside any of these actions, the `damage` [expression](/docs/datapack/data-types/expression) variable holds the damage amount of the hit.

## Apace compatibility

This power type takes in four legacy Apace types, and JSON written for the old IDs loads unchanged.

| Legacy ID | `entity_action` runs on | Notes |
|---|---|---|
| `apoli:action_when_hit` | the target | Apace's main type used `bientity_action`. Here `entity_action` is an Apoli extension. |
| `apoli:self_action_when_hit` | the target | Apace's variant that ran the action on the entity with the power. |
| `apoli:action_when_damage_taken` | the target | An older name for the same thing. |
| `apoli:attacker_action_when_hit` | the attacker | Apace's variant that ran the action on the attacker. |

The legacy IDs are only aliases. They don't rename or consume fields, so a power written as `apoli:attacker_action_when_hit` can still use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`. Apace's variants don't accept `bientity_condition`, and this type does, under every ID. To run `entity_action` on a side the alias doesn't imply, set `entity_action_target`.

## Examples

### Thorns

```json
{
    "type": "apoli:action_when_hit",
    "bientity_action": {
        "type": "apoli:invert",
        "action": {
            "type": "apoli:damage",
            "amount": 2,
            "damage_type": "minecraft:thorns"
        }
    }
}
```

This deals 1 heart back to the attacker. `invert` swaps which entity the inner damage lands on, and without it the damage would hit the entity with the power again.

### Gain Speed when hurt, with self_action_when_hit

```json
{
    "type": "apoli:self_action_when_hit",
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {"effect": "minecraft:speed", "duration": 60, "amplifier": 1}
    }
}
```

This loads as `apoli:action_when_hit` with `entity_action` running on the entity with the power. It fires for every damage event, with or without a living attacker.

### Set the attacker on fire, with attacker_action_when_hit

```json
{
    "type": "apoli:attacker_action_when_hit",
    "entity_action": {
        "type": "apoli:set_on_fire",
        "duration": 5
    },
    "damage_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:is_player_attack"
    }
}
```

This loads as `apoli:action_when_hit` with `entity_action` running on the attacker. It is skipped without a message when the damage has no living attacker.
