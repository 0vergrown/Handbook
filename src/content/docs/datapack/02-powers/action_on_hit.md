---
title: "Action On Hit (Power Type)"
description: "Executes an action when the entity that has the power has hit another entity, after the hit's damage actually lands."
navigation_title: "Action On Hit"
aliases: ["self_action_on_hit", "target_action_on_hit"]
---

Executes an action when the entity that has the power has hit another entity, after the hit's damage actually lands.

**Type ID:** `apoli:action_on_hit`

> In the context of this power type, the **actor** is the entity that has the power and the **target** is the entity that was hit.

## Fields

Every field below works under **every** ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` lands — it never turns other fields off.

| Field                 | Type                     | Default                    | Description                                                                       |
| --------------------- | ------------------------ | -------------------------- | --------------------------------------------------------------------------------- |
| `bientity_action`     | Bi-entity Action Type    | _optional_                 | Action run with the actor/target pair when the hit lands.                          |
| `self_action`         | Entity Action Type       | _optional_                 | Action run on the actor (the entity that has the power).                           |
| `attacker_action`     | Entity Action Type       | _optional_                 | Action run on the attacker. Here the attacker **is** the holder, so this is a synonym for `self_action`. |
| `target_action`       | Entity Action Type       | _optional_                 | Action run on the target (the entity that was hit).                                |
| `entity_action`       | Entity Action Type       | _optional_                 | Legacy field. Runs on whichever side `entity_action_target` names.                 |
| `entity_action_target`| `"self"` / `"attacker"` / `"target"` | `"self"`       | Which entity `entity_action` runs on. Set automatically by the legacy IDs below.   |
| `bientity_condition`  | Bi-entity Condition Type | _optional_                 | Gates firing on the (actor, target) pair.                                          |
| `target_condition`    | Entity Condition Type    | _optional_                 | Gates firing on the target.                                                        |
| `attacker_condition`  | Entity Condition Type    | _optional_                 | Gates firing on the attacker (the holder).                                         |
| `damage_condition`    | Damage Condition Type    | _optional_                 | Gates firing on the damage that was dealt.                                         |
| `cooldown`            | Integer                  | `1`                        | Ticks the power needs to recharge between fires.                                   |
| `hud_render`          | Hud Render               | `{"should_render": false}` | How the cooldown is shown on the HUD.                                              |

All action and condition fields are optional. Specifying several actions runs all of them, in the order listed above.

Inside any of these actions the `damage` [Expression](/docs/datapack/data-types/expression) variable holds the damage amount of the hit.

## Apace compatibility

This power type absorbs three legacy Apace types into one schema, and JSON authored under the old IDs still loads unchanged.

| Legacy ID | `entity_action` runs on | Notes |
|---|---|---|
| `apoli:action_on_hit` | the actor (holder) | Apace's canonical type used `bientity_action`; `entity_action` is an Apoli extension here. |
| `apoli:self_action_on_hit` | the actor (holder) | Apace's variant that ran the action on the actor. |
| `apoli:target_action_on_hit` | the target | Apace's variant that ran the action on the target. |

The legacy IDs are **aliases only**. They no longer rename or consume fields, so a power written as `apoli:target_action_on_hit` can still use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`, and the canonical `apoli:action_on_hit` accepts `entity_action` too. If you want `entity_action` on a side the alias does not imply, set `entity_action_target` explicitly.

## Examples

## Canonical form — knockback on hit

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:add_velocity",
        "z": 2
    }
}
```

## Legacy `self_action_on_hit` — heal the attacker

```json
{
    "type": "apoli:self_action_on_hit",
    "entity_action": {
        "type": "apoli:heal",
        "amount": 2
    }
}
```

Loads as `apoli:action_on_hit` with `entity_action` bound to the actor.

## Legacy `target_action_on_hit` — set the target on fire

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

Loads as `apoli:action_on_hit` with `entity_action` bound to the target, and `target_condition` carried through unchanged.
