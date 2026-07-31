---
title: "Action On Kill (Power Type)"
description: "Runs an action when this entity kills another."
navigation_title: "Action On Kill"
aliases: ["self_action_on_kill"]
---

Runs an action when this entity kills another.

Type ID: `apoli:action_on_kill`

> In the context of this power type, the **actor** is the entity that has the power (the killer) and the **target** is the entity that died.

## Fields

Every field below works under **every** ID this power type answers to. The legacy ID you write only decides where a legacy `entity_action` lands — it never turns other fields off.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_action` | Bi-entity Action Type | _optional_ | Action run with the (killer, victim) pair. |
| `self_action` | Entity Action Type | _optional_ | Action run on the killer (the entity that has the power). |
| `attacker_action` | Entity Action Type | _optional_ | Action run on the killer. Here the killer **is** the holder, so this is a synonym for `self_action`. |
| `target_action` | Entity Action Type | _optional_ | Action run on the entity that died. |
| `entity_action` | Entity Action Type | _optional_ | Legacy field. Runs on whichever side `entity_action_target` names. |
| `entity_action_target` | `"self"` / `"attacker"` / `"target"` | `"self"` | Which entity `entity_action` runs on. Set automatically by the legacy ID below. |
| `bientity_condition` | Bi-entity Condition Type | _optional_ | Gates firing on the (killer, victim) pair. |
| `target_condition` | Entity Condition Type | _optional_ | Gates firing on the entity that died. |
| `attacker_condition` | Entity Condition Type | _optional_ | Gates firing on the killer. |
| `damage_condition` | Damage Condition Type | _optional_ | Gates firing on the killing damage. |
| `cooldown` | Integer | `1` | Ticks the power needs to recharge between fires. |
| `hud_render` | Hud Render | `{"should_render": false}` | How the cooldown is shown on the HUD. |

## Apace compatibility

| Legacy ID | `entity_action` runs on |
|---|---|
| `apoli:action_on_kill` | the killer (holder) |
| `apoli:self_action_on_kill` | the killer (holder) |

`apoli:self_action_on_kill` is an **alias only**. It no longer renames or consumes fields, so a power written under it can use `bientity_action`, `self_action` and `target_action` alongside its `entity_action`.

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

Heals the killer one heart whenever they kill a skeleton.

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

The legacy ID still binds `entity_action` to the killer, and `target_action` works alongside it.
