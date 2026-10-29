---
title: Birdsong
description: "The Birdsong addon: powers and conditions for Simple Voice Chat, and spoken words that run actions."
---

Birdsong is an addon for Apoli that adds voice powers. Its types react to who is talking on [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat), how loudly and to whom, and its speech recognition turns words a player says into actions. Install it next to Apoli, on the server and on the clients.

## What each part needs

The voice types read Simple Voice Chat on the server. Without Simple Voice Chat they still load, but the conditions read `false`, the trigger powers never fire and the range powers leave voice alone.

[`birdsong:action_on_speech`](/docs/compat/birdsong/action_on_speech) doesn't need Simple Voice Chat. Speech is recognised on the player's own computer, from the audio Simple Voice Chat already captures when it is installed and from the microphone when it isn't.

## Types

| Type | Kind | Fires or passes when |
| --- | --- | --- |
| [`birdsong:action_on_speak`](/docs/compat/birdsong/action_on_speak) | Power | The holder starts or stops talking, optionally acting on everyone who can hear them. |
| [`birdsong:action_on_reply`](/docs/compat/birdsong/action_on_reply) | Power | Someone talks back to the holder shortly after they spoke. |
| [`birdsong:action_on_speech`](/docs/compat/birdsong/action_on_speech) | Power | The holder says a specific phrase out loud. |
| [`birdsong:modify_speaking_range`](/docs/compat/birdsong/modify_speaking_range) | Power | Changes how far the holder's voice carries, for everyone or per listener. |
| [`apoli:modify_hearing_range`](/docs/datapack/powers/modify_hearing_range) | Power | Changes how far the holder hears voice chat, for everyone or per speaker. It is an Apoli type that also covers game sounds, so its page lives with the other power types, and its voice half needs Birdsong. |
| [`birdsong:voice_speaking`](/docs/compat/birdsong/voice_speaking) | Entity condition | The entity is talking right now. |
| [`birdsong:voice_disabled`](/docs/compat/birdsong/voice_disabled) | Entity condition | The entity has voice chat off or isn't connected. |
| [`birdsong:voice_loudness`](/docs/compat/birdsong/voice_loudness) | Entity condition | The entity's current loudness passes a comparison. |
| [`birdsong:voice_listeners`](/docs/compat/birdsong/voice_listeners) | Entity condition | Enough connected players are within earshot. |
| [`birdsong:voice_whispering`](/docs/compat/birdsong/voice_whispering) | Entity condition | The entity is talking with the whisper key held. |

## The `apoli:` IDs

Every Birdsong type also answers to its `apoli:` ID, so `apoli:action_on_speak` is the same type as `birdsong:action_on_speak`. `birdsong:voice_disabled` has two more names, `apoli:voice_muted` and `birdsong:voice_muted`.

Apoli keeps the `apoli:` IDs loadable when Birdsong isn't installed. `apoli:action_on_speak`, `apoli:action_on_reply`, `apoli:action_on_speech` and `apoli:modify_speaking_range` then load as powers that do nothing, the `apoli:voice_*` conditions read `false`, and the [voice expression variables](#expression-variables) read `0`. A `birdsong:` ID is unknown without Birdsong, so a power that uses one fails to load, the same as a mistyped type ID.

That gives a pack three ways to treat a server without Birdsong:

- Write `apoli:` IDs, and the pack loads with its voice features switched off.
- Write `birdsong:` IDs, and the voice powers fail to load, with an error in the log for each one.
- Write `birdsong:` IDs and give each voice power a [`load_condition`](/docs/datapack/introduction/powers#skipping-a-power-at-load-time) of `{ "type": "apoli:mod_loaded", "mod": "birdsong" }`, and those powers are skipped quietly.

## Expression variables

Birdsong adds five variables to [expressions](/docs/datapack/data-types/expression). Each one reads the entity the expression is evaluated for.

| Variable | Value |
| --- | --- |
| `voice_loudness` | The current loudness, from `0` to `100`. |
| `voice_loudness_normalized` | The same loudness, from `0.0` to `1.0`. |
| `voice_speaking` | `1` while the entity is talking, otherwise `0`. |
| `voice_whispering` | `1` while the entity is talking with the whisper key held, otherwise `0`. |
| `voice_disabled` | `1` while the entity has voice chat turned off or isn't connected to it, otherwise `0`. |

A modifier with `"value": "voice_loudness / 10"` grows the louder the holder talks.

## How loudness is measured

Loudness is estimated from the size of each encoded voice packet, and no audio is decoded. That makes it very cheap but coarse: it is good for telling loud from quiet, not for precise volume. The value is scaled to `0` to `100`.

## Where it is evaluated

Voice state is tracked on the server. A condition evaluated only on the client, for example inside a client render power, can't see it.

## Speech and chat

`birdsong:action_on_speech` and [`apoli:action_on_sending_message`](/docs/datapack/powers/action_on_sending_message) both react to words:

- `action_on_speech` listens to the player's voice. Recognition runs on their own computer, and the server only learns which power matched.
- `action_on_sending_message` matches typed chat messages. It is part of Apoli and needs no other mod, so it is the fallback for players who can't or don't want to use speech recognition.

Simple Voice Chat only carries audio, so it never matches words by itself.
