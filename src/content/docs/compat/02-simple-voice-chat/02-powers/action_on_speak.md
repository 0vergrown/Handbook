---
title: "Action On Speak (Power Type)"
description: "Runs an action when the holder starts or stops talking in voice chat."
navigation_title: "Action On Speak"
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder starts talking into voice chat, and another when they stop — and, optionally, a [Bi-entity Action](/docs/datapack/bientity-actions) on everyone who can hear them.

Type ID: `apoli:action_on_speak`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | Entity Action | _optional_ | Run once when the holder **starts** speaking. |
| `entity_action_stop` | Entity Action | _optional_ | Run once when the holder **stops** speaking, after roughly 0.4 s of silence. |
| `bientity_action` | Bi-entity Action | _optional_ | Run once per listener when the holder **starts** speaking. The holder is the actor, the listener is the target. |
| `bientity_action_stop` | Bi-entity Action | _optional_ | Run once per listener when the holder **stops** speaking. |
| `bientity_condition` | Bi-entity Condition | _optional_ | Only listeners who pass it get the bi-entity actions. Holder as actor, listener as target. |

## Who counts as a listener

A listener is any other player in the same dimension who could hear the holder over proximity chat at that moment: within the holder's speaking range as [apoli:modify_speaking_range](/docs/compat/simple-voice-chat/modify_speaking_range) and their own [apoli:modify_hearing_range](/docs/datapack/powers/modify_hearing_range) leave it, whispering included, and with voice chat switched on and connected. Group chat does not count.

The entity actions still run once, on the holder, whether anyone is listening or not.

## Examples

Glow while talking:

```json
{
  "type": "apoli:action_on_speak",
  "entity_action": {
    "type": "apoli:grant_power",
    "power": "example:talking_glow",
    "source": "example:speaking"
  },
  "entity_action_stop": {
    "type": "apoli:revoke_power",
    "power": "example:talking_glow",
    "source": "example:speaking"
  }
}
```

Shockwave, but only when shouting and only when somebody is close enough to hear:

```json
{
  "type": "apoli:action_on_speak",
  "condition": {
    "type": "apoli:and",
    "conditions": [
      { "type": "apoli:voice_loudness", "comparison": ">=", "compare_to": 70 },
      { "type": "apoli:voice_listeners", "range": 8.0 }
    ]
  },
  "entity_action": {
    "type": "apoli:area_of_effect",
    "radius": 6.0,
    "bientity_action": { "type": "apoli:damage", "amount": 4.0 }
  }
}
```

Everyone on the holder's team who can hear them glows while they talk:

```json
{
  "type": "apoli:action_on_speak",
  "bientity_condition": {
    "type": "apoli:same_team"
  },
  "bientity_action": {
    "type": "apoli:target_action",
    "action": {
      "type": "apoli:apply_effect",
      "effect": {
        "effect": "minecraft:glowing",
        "duration": 600,
        "amplifier": 0
      }
    }
  },
  "bientity_action_stop": {
    "type": "apoli:target_action",
    "action": {
      "type": "apoli:clear_effect",
      "effect": "minecraft:glowing"
    }
  }
}
```
