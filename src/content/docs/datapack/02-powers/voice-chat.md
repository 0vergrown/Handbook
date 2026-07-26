---
title: "Voice Chat"
description: "A set of powers, actions triggers and conditions that react to what players say into [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)."
---

A set of powers, actions triggers and conditions that react to what players say into [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat). Everything here is **server-side** and **gated** — if Simple Voice Chat is not installed, the conditions simply read as `false` and the trigger powers never fire, so packs stay compatible either way.

> Loudness is approximated from the size of the encoded voice packet (no audio is decoded), so it is cheap but coarse — good for "loud vs. quiet", not for precise volume.

## Trigger powers

### `apoli:action_on_speak`

Runs an Entity Action Type when the holder starts / stops talking.

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | Run once when the holder **starts** speaking.
`entity_action_stop` | Entity Action Type | _optional_ | Run once when the holder **stops** speaking (after ~0.4 s of silence).

### `apoli:action_on_reply`

Held by the **actor**. When another player (the **target**) starts speaking near the holder shortly after the holder spoke, runs a Bi-entity Action Type with `actor` = holder, `target` = the responder. Good for "answer me and something happens" mechanics.

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | Bi-entity Action Type | _optional_ | Run with actor = holder, target = responder.
`window` | Integer | `60` | How many ticks after the holder spoke a reply still counts.
`range` | Double | `16.0` | Maximum distance (blocks) between holder and responder.

## Conditions (Entity Condition Type)

Type ID | Fields | True when…
--------|--------|-----------
`apoli:voice_speaking` | _none_ | the entity is currently talking into voice chat.
`apoli:voice_disabled` (alias `apoli:voice_muted`) | _none_ | the entity has voice chat disabled or is not connected to it.
`apoli:voice_loudness` | `comparison` (Comparison, default `>=`), `compare_to` (int 0–100, default 1) | the entity's current speaking loudness satisfies the comparison.
`apoli:voice_listeners` | `range` (double, default 16), `min_count` (int, default 1) | at least `min_count` other connected players are within `range`.

## Examples

Glow while talking:

```json
{
   "type":"apoli:action_on_speak",
   "entity_action":{
      "type":"apoli:add_badge",
      "...":"..."
   },
   "entity_action_stop":{
      "type":"apoli:remove_badge",
      "...":"..."
   }
}
```

Loud shout only fires above a threshold, and only if someone is close enough to hear:

```json
{
   "type":"apoli:action_on_speak",
   "condition":{
      "type":"apoli:and",
      "conditions":[
         {
            "type":"apoli:voice_loudness",
            "comparison":">=",
            "compare_to":70
         },
         {
            "type":"apoli:voice_listeners",
            "range":8.0
         }
      ]
   },
   "entity_action":{
      "type":"apoli:area_of_effect",
      "...":"..."
   }
}
```

Reply mechanic — when someone answers the holder within 3 seconds and 10 blocks, push them:

```json
{
   "type":"apoli:action_on_reply",
   "window":60,
   "range":10.0,
   "bientity_action":{
      "type":"apoli:add_velocity",
      "...":"..."
   }
}
```

## Notes

- Requires Simple Voice Chat on the server; conditions/triggers are inert without it.
- Voice state is tracked on the server; conditions evaluated purely client-side (e.g. for a client render power) will not see it.

