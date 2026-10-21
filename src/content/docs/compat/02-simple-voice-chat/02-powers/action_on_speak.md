---
title: "Action On Speak (Power Type)"
description: "Runs an action when the holder starts or stops talking in voice chat."
navigation_title: "Action On Speak"
---

Runs an [entity action](/docs/datapack/entity-actions) when the holder starts talking into voice chat and another when they stop, and can also run a [bi-entity action](/docs/datapack/bientity-actions) on everyone who can hear them.

Type ID: `apoli:action_on_speak`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once when the holder starts speaking. |
| `entity_action_stop` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once when the holder stops speaking, after about 0.4 seconds of silence. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs once for each listener when the holder starts speaking. The holder is the actor and the listener is the target. |
| `bientity_action_stop` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs once for each listener when the holder stops speaking. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only listeners who pass it get the bi-entity actions, with the holder as the actor and the listener as the target. |

## Who counts as a listener

A listener is any other player in the same dimension who could hear the holder over proximity chat at that moment: within the holder's speaking range as [apoli:modify_speaking_range](/docs/compat/simple-voice-chat/modify_speaking_range) and their own [apoli:modify_hearing_range](/docs/datapack/powers/modify_hearing_range) leave it, whispering included, and with voice chat switched on and connected. Group chat doesn't count.

The entity actions still run once, on the holder, whether anyone is listening or not.

## Examples

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

This power makes the holder glow while they talk, by granting a glow power when they start and revoking it when they stop.

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

This shockwave only goes off when the holder shouts, and only when somebody is close enough to hear.

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

Everyone on the holder's team who can hear them glows while they talk.
