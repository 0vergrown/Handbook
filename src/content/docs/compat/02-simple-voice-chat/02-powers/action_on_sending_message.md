---
title: "Action On Sending Message (Power Type)"
description: "Runs an action when the holder sends a chat message, optionally only when it matches a pattern."
navigation_title: "Action On Sending Message"
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder sends a chat message — optionally only when the message matches a pattern. This is the typed "magic word" trigger.

Type ID: `apoli:action_on_sending_message`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | Entity Action | _optional_ | Run on the holder when a matching message is sent. |
| `message_type` | Identifier | _optional_ | Only react to messages of this chat type. Omit to react to all of them. |
| `filter` | [Message Filter](#message-filter) | _optional_ | A single filter. Merged into `filters`. |
| `filters` | Array of Message Filter | `[]` | Filters tested in order against the message. |
| `priority` | Integer | `0` | Ordering when several powers want to handle the same message. Higher runs first. |

With no filters at all, **every** message the holder sends triggers `entity_action`.

## Message Filter

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `filter` | String | _required_ | A regular expression searched for in the message. If it isn't valid regex it is matched literally. |
| `before_action` | Entity Action | _optional_ | Run before the power's `entity_action`. |
| `after_action` | Entity Action | _optional_ | Run after the power's `entity_action`. |
| `prevent` | Boolean | `false` | Swallow the message — it is not sent to chat — and stop testing later filters. |

## Examples

Say "fireball" in chat to launch one, and don't broadcast the word:

```json
{
  "type": "apoli:action_on_sending_message",
  "filter": { "filter": "(?i)fireball", "prevent": true },
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball",
    "speed": 1.5
  }
}
```

Two magic words, each with its own follow-up:

```json
{
  "type": "apoli:action_on_sending_message",
  "filters": [
    {
      "filter": "(?i)heal",
      "prevent": true,
      "after_action": { "type": "apoli:heal", "amount": 6.0 }
    },
    {
      "filter": "(?i)burn",
      "prevent": true,
      "after_action": { "type": "apoli:set_on_fire", "duration": 60 }
    }
  ]
}
```
