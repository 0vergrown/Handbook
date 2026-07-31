---
title: "Action On Speak (Power Type)"
description: "Runs an action when the holder starts or stops talking in voice chat."
navigation_title: "Action On Speak"
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder starts talking into voice chat, and another when they stop.

Type ID: `apoli:action_on_speak`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | Entity Action | _optional_ | Run once when the holder **starts** speaking. |
| `entity_action_stop` | Entity Action | _optional_ | Run once when the holder **stops** speaking, after roughly 0.4 s of silence. |

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
