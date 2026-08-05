---
title: "Action On Sending Message (Power Type)"
description: "Executes an action when the entity that has the power sends a chat message."
navigation_title: "Action On Sending Message"
---

Executes an action when the player that has the power sends a chat message — optionally only when the message matches a pattern. This is the typed "magic word" trigger.

**Type ID:** `apoli:action_on_sending_message`

> This is plain vanilla chat. It does **not** need Simple Voice Chat or any other mod. For the spoken equivalent, see [`apoli:action_on_speech`](/docs/compat/simple-voice-chat/action_on_speech).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Action run on the holder when a filter matches. |
| `message_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only react to messages of this chat type, e.g. `minecraft:chat`. Omit to react to all of them. |
| `filter` | [Message Filter](#message-filter) | _optional_ | A single filter. Merged into `filters`. |
| `filters` | Array of [Message Filter](#message-filter) | `[]` | Filters tested in order against the message. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Ordering when the holder has several of these powers. Higher runs first. |

With no filters at all, **every** message the holder sends runs `entity_action`.

Every filter that matches fires — testing only stops early when one with `prevent` matches.

## Message Filter

A filter is either a bare string (shorthand for just `filter`) or an object:

```json
"filter": "fireball"
```

```json
"filter": { "filter": "fireball", "match_mode": "full", "prevent": true }
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `filter` | String | **required** | A regular expression tested against the message. |
| `match_mode` | String | `"contains"` | How much of the message the pattern has to cover. See below. |
| `literal` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Treat `filter` as plain text instead of a regular expression. Use this when the word contains characters like `(`, `[` or `?`. |
| `case_insensitive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Ignore letter case. Equivalent to prefixing the pattern with `(?i)`. |
| `before_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Run before the power's `entity_action`. |
| `after_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Run after the power's `entity_action`. |
| `prevent` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Swallow the message — it is never sent to chat — and stop testing later filters in this power. |

### `match_mode`

This is the field people get wrong. **The default is a substring search**, so `"fireball"` also fires on `Fireball 1`, `I cast fireball` and `fireballs`. If you want the message to be *exactly* the magic word, say so:

| Value | Fires when… | `"fireball"` matches |
| --- | --- | --- |
| `"contains"` | the pattern is found anywhere in the message | `fireball`, `Fireball 1`, `throw a fireball!`, `fireballs` |
| `"full"` | the pattern covers the whole message | `fireball` only |
| `"word"` | the pattern is found as a whole word | `fireball`, `throw a fireball!` — but **not** `fireballs` |
| `"starts_with"` | the message begins with the pattern | `fireball`, `fireball at the sky` |
| `"ends_with"` | the message ends with the pattern | `fireball`, `cast a fireball` |

`match_mode` composes with `case_insensitive`, so `{"filter": "fireball", "match_mode": "full", "case_insensitive": true}` fires on `fireball`, `Fireball` and `FIREBALL`, and on nothing else.

> If `filter` isn't valid regex it is matched as literal text and a warning is logged. Set `"literal": true` to make that explicit and silence the warning.

### Translation keys

Anywhere in a pattern, `#{some.translation.key}` expands to an alternation of every translation that key has in any loaded language, so one filter can catch a phrase in every language at once.

## Examples

Say exactly "fireball" to launch one, and don't broadcast the word:

```json
{
  "type": "apoli:action_on_sending_message",
  "filter": {
    "filter": "fireball",
    "match_mode": "full",
    "case_insensitive": true,
    "prevent": true
  },
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball",
    "speed": 1.5
  }
}
```

Two magic words, each with its own follow-up, triggered anywhere in a sentence:

```json
{
   "type":"apoli:action_on_sending_message",
   "filters":[
      {
         "filter":"heal",
         "match_mode":"word",
         "case_insensitive":true,
         "after_action":{
            "type":"apoli:heal",
            "amount":6.0
         }
      },
      {
         "filter":"burn",
         "match_mode":"word",
         "case_insensitive":true,
         "after_action":{
            "type":"apoli:set_on_fire",
            "duration":60
         }
      }
   ]
}
```

React to every message the holder sends, but only in normal chat:

```json
{
  "type": "apoli:action_on_sending_message",
  "message_type": "minecraft:chat",
  "entity_action": {
    "type": "apoli:exhaust",
    "amount": 0.5
  }
}
```
