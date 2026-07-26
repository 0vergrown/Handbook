---
title: "apoli:action_on_hit"
description: "Executes an action when the entity that has the power has hit another entity, after the hit's damage actually lands."
---

Executes an action when the entity that has the power has hit another entity, after the hit's damage actually lands.

**Type ID:** `apoli:action_on_hit`

> In the context of this power type, the **actor** is the entity that has the power and the **target** is the entity that was hit.

## Fields

| Field                | Type                     | Default                    | Description                                               |
| -------------------- | ------------------------ | -------------------------- | --------------------------------------------------------- |
| `bientity_action`    | Bi-entity Action Type    | _optional_                 | Action run with the actor/target pair when the hit lands. |
| `self_action`        | Entity Action Type       | _optional_                 | Action run on the actor (the entity that has the power).  |
| `target_action`      | Entity Action Type       | _optional_                 | Action run on the target (the entity that was hit).       |
| `bientity_condition` | Bi-entity Condition Type | _optional_                 | Gates firing on the (actor, target) pair.                 |
| `target_condition`   | Entity Condition Type    | _optional_                 | Gates firing on the target.                               |
| `damage_condition`   | Damage Condition Type    | _optional_                 | Gates firing on the damage that was dealt.                |
| `cooldown`           | Integer                  | `1`                        | Ticks the power needs to recharge between fires.          |
| `hud_render`         | Hud Render               | `{"should_render": false}` | How the cooldown is shown on the HUD.                     |

All action and condition fields are optional. Specifying multiple actions (e.g. both `bientity_action` and `self_action`) runs all of them in order when the power fires.

## Apace compatibility

This power type absorbs three legacy Apace types into one schema. JSON authored under the old IDs still loads — the loader rewrites the `entity_action` key to whichever side the legacy ID targeted before parsing.

| Legacy ID | Field rewrite | Notes |
|---|---|---|
| `apoli:action_on_hit` | _(no rewrite)_ | Used `bientity_action` directly — already canonical. |
| `apoli:self_action_on_hit` | `entity_action` → `self_action` | Apace's variant that ran the action on the actor. |
| `apoli:target_action_on_hit` | `entity_action` → `target_action` | Apace's variant that ran the action on the target. |

The legacy `target_condition` field on `self_action_on_hit` / `target_action_on_hit` matches the canonical name and is consumed as-is. Apace's canonical `apoli:action_on_hit` did not accept `target_condition`; this unified type does (extra, never required).

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

Loads as `apoli:action_on_hit` with `self_action` set to the heal.

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

Loads as `apoli:action_on_hit` with `target_action` set to the fire action and `target_condition` carried through unchanged.

## See also

- [apoli:action_when_hit](/docs/datapack/powers/action_when_hit) — the "got hit by something" counterpart.
- [apoli:modify_damage_dealt](/docs/datapack/powers/modify_damage_dealt) — fires on the same damage flow but rewrites the amount instead of running actions.
- [apoli:multiple](/docs/datapack/powers/multiple) — bundle several powers into one JSON.