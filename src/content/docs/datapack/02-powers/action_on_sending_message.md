---
title: "Action On Sending Message (Power Type)"
description: "Runs an action when the player that has the power sends a chat message, optionally only when it matches a pattern."
navigation_title: "Action On Sending Message"
---

Runs an action when the player that has the power sends a chat message, optionally only when the message matches a pattern. This is the trigger for typed magic words.

It fires for normal chat and for command messages (`/say`, `/me`, `/msg`), so a magic word works however it was typed.

Type ID: `apoli:action_on_sending_message`

> [!NOTE]
> This is plain vanilla chat, so it doesn't need Simple Voice Chat or any other mod. For the spoken version, see [`birdsong:action_on_speech`](/docs/compat/birdsong/action_on_speech) from the Birdsong addon.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the player when a filter matches. |
| `message_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only reacts to messages of this chat type, such as `minecraft:chat`. Leave it out to react to all of them. |
| `filter` | [Message Filter](#message-filter) | _optional_ | A single filter, merged into `filters`. |
| `filters` | [Array](/docs/datapack/data-types/array) of [Message Filter](#message-filter) | `[]` | The filters tested against the message. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | The order when the player has several of these powers. Higher runs first. |

With no filters at all, every message the player sends runs `entity_action`.

### How the filter list is read

The list is a gate, not a loop. For each message, the power:

1. checks every filter marked `inverted`, and if any of them matches, does nothing for this message;
2. then checks the plain filters, and at least one of them has to match (if the list only has inverted filters, anything that isn't vetoed counts as a match);
3. runs `entity_action` exactly once, however many filters matched.

The `before_action`, `after_action`, `replacement` and `prevent` of each filter still apply for every filter that matched, in list order.

> [!NOTE]
> Two filters that match the same message, such as `"stone"` and `"smooth stone"` on `smooth stone` with the default `contains`, still run `entity_action` only once.

## Message Filter

A filter is either a bare string, which is short for setting only `filter`, or an object:

```json
"filter": "fireball"
```

```json
"filter": { "filter": "fireball", "match_mode": "full", "prevent": true }
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `filter` | [String](/docs/datapack/data-types/string) | _required_ | A regular expression tested against the message. |
| `match_mode` | [String](/docs/datapack/data-types/string) | `"contains"` | How much of the message the pattern has to cover. See below. |
| `literal` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Treats `filter` as plain text instead of a regular expression. Use it when the word contains characters like `(`, `[` or `?`. |
| `case_insensitive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Ignores letter case, the same as starting the pattern with `(?i)`. |
| `inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Turns the filter into a veto: if this pattern matches, the whole power does nothing for that message. See [Inverting a filter](#inverting-a-filter). |
| `before_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs before the power's `entity_action`. |
| `after_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs after the power's `entity_action`. |
| `replacement` | [String](/docs/datapack/data-types/string) | _optional_ | Rewrites the matched text before the message is broadcast. Regex replacements work, so `$1` is the first capture group. |
| `prevent` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Swallows the message, so it is never sent to chat, and stops testing later filters in this power. |

### `match_mode`

People get this field wrong most often. The default is a substring search, so `"fireball"` also fires on `Fireball 1`, `I cast fireball` and `fireballs`. To match a message that is exactly the magic word, set `match_mode`:

| Value | Fires when | `"fireball"` matches |
| --- | --- | --- |
| `"contains"` | the pattern is found anywhere in the message | `fireball`, `Fireball 1`, `throw a fireball!`, `fireballs` |
| `"full"` | the pattern covers the whole message | only `fireball` |
| `"word"` | the pattern is found as a whole word | `fireball` and `throw a fireball!`, but not `fireballs` |
| `"starts_with"` | the message begins with the pattern | `fireball`, `fireball at the sky` |
| `"ends_with"` | the message ends with the pattern | `fireball`, `cast a fireball` |

`match_mode` combines with `case_insensitive`, so `{"filter": "fireball", "match_mode": "full", "case_insensitive": true}` fires on `fireball`, `Fireball` and `FIREBALL`, and on nothing else.

> [!NOTE]
> If `filter` isn't a valid regular expression, it is matched as literal text and a warning is logged. Set `"literal": true` to make that explicit and silence the warning.

> [!WARNING]
> `(?i)` at the start of a pattern is the regex flag for ignoring case. It doesn't mean "not this". For that, use `inverted`.

### Inverting a filter

`"inverted": true` makes a filter a veto. It never triggers the power on its own, and it only stops the power when it matches. Use it to cut exceptions out of a broad pattern:

```json
{
  "type": "apoli:action_on_sending_message",
  "filters": [
    { "filter": "stone", "prevent": true },
    { "filter": "smooth stone", "inverted": true },
    { "filter": "mossy cobblestone", "inverted": true }
  ]
}
```

That fires on `stone` and `stonecutter`, but not on `smooth stone` or `mossy cobblestone`.

Most of the time you don't need vetoes at all. `"match_mode": "full"` says the same thing more simply, because `smooth stone` is then a different message from `stone`:

```json
{ "filter": "stone", "match_mode": "full", "literal": true, "case_insensitive": true, "prevent": true }
```

Use `inverted` when the pattern has to stay loose and you only want a few exceptions.

### Rewriting the message

`replacement` changes what everyone else sees without stopping the message. It runs after the power's `entity_action` and before that filter's `after_action`, and several matching filters can rewrite the same message in turn, each seeing the text the previous one produced.

```json
{
  "type": "apoli:action_on_sending_message",
  "filter": { "filter": "heck", "replacement": "****", "case_insensitive": true }
}
```

> [!NOTE]
> The server sends a rewritten message again itself, so it loses its chat signature and shows without the signed message indicator. `prevent` wins over `replacement`: if a filter with `prevent` matches, nothing is broadcast at all.

### Translation keys

Anywhere in a pattern, `#{some.translation.key}` expands to an alternation of every translation that key has in any loaded language, so one filter can catch a phrase in every language at once. `"filter": "#{item.minecraft.diamond}"` matches "diamond", "Diamant", "钻石" and so on.

Only the keys your filters name are read, and they are read once, the first time a filter using them is tested. A pack with no `#{...}` placeholders never reads the language files at all.

### Debugging a filter

`/apoli:message <text>` tests `<text>` as if you had typed it, and reports which powers are active, which filters matched, whether the power does nothing, and what would have happened to the message. It is a dry run that runs no `entity_action`, so you can debug a power that hands out items without filling your inventory.

## Examples

Say exactly "fireball" to launch one, without broadcasting the word:

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

React to every message the player sends, but only in normal chat:

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
