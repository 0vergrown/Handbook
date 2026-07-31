---
title: "Action When Hit (Power Type)"
description: "Executes an action when the entity that has the power has been hit by another entity, after the hit's damage actually lands."
navigation_title: "Action When Hit"
aliases: ["self_action_when_hit", "attacker_action_when_hit", "action_when_damage_taken"]
---

Executes an action when the entity that has the power has been hit by another entity, after the hit's damage actually lands.

**Type ID:** `apoli:action_when_hit`

> In the context of this power type, the **actor** is the entity that did the attacking and the **target** is the entity that has the power.

## Fields

Every field below works under **every** ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` lands — it never turns other fields off.

| Field                 | Type                     | Default                    | Description                                                                     |
| --------------------- | ------------------------ | -------------------------- | ------------------------------------------------------------------------------- |
| `bientity_action`     | Bi-entity Action Type    | _optional_                 | Action run with the (actor, target) pair when the hit lands.                    |
| `self_action`         | Entity Action Type       | _optional_                 | Action run on the target (the entity that has the power).                       |
| `target_action`       | Entity Action Type       | _optional_                 | Action run on the target. Here the target **is** the holder, so this is a synonym for `self_action`. |
| `attacker_action`     | Entity Action Type       | _optional_                 | Action run on the actor (the entity that dealt the damage).                     |
| `entity_action`       | Entity Action Type       | _optional_                 | Legacy field. Runs on whichever side `entity_action_target` names.              |
| `entity_action_target`| `"self"` / `"attacker"` / `"target"` | `"self"`       | Which entity `entity_action` runs on. Set automatically by the legacy IDs below. |
| `bientity_condition`  | Bi-entity Condition Type | _optional_                 | Gates firing on the (actor, target) pair. Fails if there is no attacker.        |
| `attacker_condition`  | Entity Condition Type    | _optional_                 | Gates firing on the attacker. Fails if there is no attacker.                    |
| `target_condition`    | Entity Condition Type    | _optional_                 | Gates firing on the target (the holder).                                        |
| `damage_condition`    | Damage Condition Type    | _optional_                 | Gates firing on the damage that was dealt.                                      |
| `cooldown`            | Integer                  | `1`                        | Ticks the power needs to recharge between fires.                                |
| `hud_render`          | Hud Render               | `{"should_render": false}` | How the cooldown is shown on the HUD.                                           |

If the damage source has no living attacker (environmental, `/kill`, etc.) the `bientity_condition` and `attacker_condition` gates fail, and `bientity_action` / `attacker_action` (and `entity_action` when it is bound to the attacker) are skipped. `self_action` and `target_action` still fire.

Inside any of these actions the `damage` [Expression](/docs/datapack/data-types/expression) variable holds the damage amount of the hit.

## Apace compatibility

This power type absorbs four legacy Apace types into one schema, and JSON authored under the old IDs still loads unchanged.

| Legacy ID | `entity_action` runs on | Notes |
|---|---|---|
| `apoli:action_when_hit` | the target (holder) | Apace's canonical type used `bientity_action`; `entity_action` is an Apoli extension here. |
| `apoli:self_action_when_hit` | the target (holder) | Apace's variant that ran the action on the holder. |
| `apoli:action_when_damage_taken` | the target (holder) | Older name for the same thing. |
| `apoli:attacker_action_when_hit` | the attacker | Apace's variant that ran the action on the attacker. |

The legacy IDs are **aliases only**. They no longer rename or consume fields, so a power written as `apoli:attacker_action_when_hit` can still use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`. Neither legacy variant accepted `bientity_condition` in Apace; this unified type does, under every ID. If you want `entity_action` on a side the alias does not imply, set `entity_action_target` explicitly.

## Examples

## Canonical form — thorns

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

Deals 1 heart back to the attacker. The `invert` swaps which entity the inner damage targets — without it, the damage would land on the holder again.

## Legacy `self_action_when_hit` — gain Speed when hurt

```json
{
    "type": "apoli:self_action_when_hit",
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {"effect": "minecraft:speed", "duration": 60, "amplifier": 1}
    }
}
```

Loads as `apoli:action_when_hit` with `entity_action` bound to the holder. Fires for every damage event regardless of whether there's a living attacker.

## Legacy `attacker_action_when_hit` — ignite the attacker

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

Loads as `apoli:action_when_hit` with `entity_action` bound to the attacker. Skipped silently when the damage has no living attacker.
