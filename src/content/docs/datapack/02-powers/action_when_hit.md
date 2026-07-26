---
title: "apoli:action_when_hit"
description: "Executes an action when the entity that has the power has been hit by another entity, after the hit's damage actually lands."
---

Executes an action when the entity that has the power has been hit by another entity, after the hit's damage actually lands.

**Type ID:** `apoli:action_when_hit`

> In the context of this power type, the **actor** is the entity that did the attacking and the **target** is the entity that has the power.

## Fields

| Field                | Type                     | Default                    | Description                                                       |
| -------------------- | ------------------------ | -------------------------- | ----------------------------------------------------------------- |
| `bientity_action`    | Bi-entity Action Type    | _optional_                 | Action run with the (actor, target) pair when the hit lands.      |
| `self_action`        | Entity Action Type       | _optional_                 | Action run on the target (the entity that has the power).         |
| `attacker_action`    | Entity Action Type       | _optional_                 | Action run on the actor (the entity that dealt the damage).       |
| `bientity_condition` | Bi-entity Condition Type | _optional_                 | Gates firing on the (actor, target) pair. Skipped if no attacker. |
| `damage_condition`   | Damage Condition Type    | _optional_                 | Gates firing on the damage that was dealt.                        |
| `cooldown`           | Integer                  | `1`                        | Ticks the power needs to recharge between fires.                  |
| `hud_render`         | Hud Render               | `{"should_render": false}` | How the cooldown is shown on the HUD.                             |

If the damage source has no living attacker (environmental, `/kill`, etc.) the `bientity_condition` gate fails, and `bientity_action` / `attacker_action` are skipped. `self_action` still fires.

There is intentionally no `target_condition` field: the target is the holder, and the holder is already gated by the top-level `condition`. To gate on the attacker, put a `condition` inside a `apoli:actor_condition` bientity-condition.

## Apace compatibility

This power type absorbs three legacy Apace types into one schema. JSON authored under the old IDs still loads — the loader rewrites the `entity_action` key to whichever side the legacy ID targeted before parsing.

| Legacy ID | Field rewrite | Notes |
|---|---|---|
| `apoli:action_when_hit` | _(no rewrite)_ | Used `bientity_action` directly — already canonical. |
| `apoli:self_action_when_hit` | `entity_action` → `self_action` | Apace's variant that ran the action on the holder (target side). |
| `apoli:attacker_action_when_hit` | `entity_action` → `attacker_action` | Apace's variant that ran the action on the attacker. |

Neither legacy variant accepted a `bientity_condition`, so old data packs only needed `damage_condition` to gate. The unified type still accepts `damage_condition` exactly the same way and additionally accepts `bientity_condition` for new packs.

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

Loads as `apoli:action_when_hit` with `self_action` set to the effect. Fires for every damage event regardless of whether there's a living attacker.

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

Loads as `apoli:action_when_hit` with `attacker_action` set to the fire action. Skipped silently when the damage has no living attacker.

## See also

- [apoli:action_on_hit](/docs/datapack/powers/action_on_hit) — the "I hit something" counterpart.
- [apoli:modify_damage_taken](/docs/datapack/powers/modify_damage_taken) — same damage flow, but rewrites the amount instead of running actions.
- [apoli:multiple](/docs/datapack/powers/multiple) — bundle several powers into one JSON.

## Sources

- 60 Sources/raw/apoli-1.20/src/main/java/io/github/apace100/apoli/power/ActionWhenHitPower
- 60 Sources/raw/apoli-1.20/src/main/java/io/github/apace100/apoli/power/SelfActionWhenHitPower
- 60 Sources/raw/apoli-1.20/src/main/java/io/github/apace100/apoli/power/AttackerActionWhenHitPower

