---
title: Simple Voice Chat
description: Powers and conditions that react to who is talking, how loudly, and what they say.
---

Three trigger powers, two range powers and four entity conditions that react to — or reshape — voice activity from [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat).

All of them are **behaviour-gated**: the types are always registered, so a pack that uses them loads on any server. Without Simple Voice Chat installed the conditions read `false`, the trigger powers never fire and the range powers leave voice alone.

## Types

| Type | Kind | Fires / passes when |
| --- | --- | --- |
| [`apoli:action_on_speak`](/docs/compat/simple-voice-chat/action_on_speak) | Power | The holder starts or stops talking — optionally acting on everyone who can hear them. |
| [`apoli:action_on_reply`](/docs/compat/simple-voice-chat/action_on_reply) | Power | Someone talks back to the holder shortly after they spoke. |
| [`apoli:action_on_speech`](/docs/compat/simple-voice-chat/action_on_speech) | Power | The holder *says a specific phrase* out loud. |
| [`apoli:modify_speaking_range`](/docs/compat/simple-voice-chat/modify_speaking_range) | Power | Changes how far the holder's voice carries, for everyone or per listener. |
| [`apoli:modify_hearing_range`](/docs/datapack/powers/modify_hearing_range) | Power | Changes how far the holder hears voice chat, for everyone or per speaker. It also covers ordinary game sounds, so its page lives with the other power types. |
| [`apoli:voice_speaking`](/docs/compat/simple-voice-chat/voice_speaking) | Entity condition | The entity is talking right now. |
| [`apoli:voice_disabled`](/docs/compat/simple-voice-chat/voice_disabled) | Entity condition | The entity has voice chat off or isn't connected. |
| [`apoli:voice_loudness`](/docs/compat/simple-voice-chat/voice_loudness) | Entity condition | The entity's current loudness passes a comparison. |
| [`apoli:voice_listeners`](/docs/compat/simple-voice-chat/voice_listeners) | Entity condition | Enough connected players are in earshot. |

## How loudness is measured

Loudness is approximated from the **size of the encoded voice packet** — no audio is decoded. That makes it very cheap, but coarse: it is good for "loud vs. quiet", not for precise volume. The value is normalised to `0`–`100`.

## Where it is evaluated

Voice state is tracked on the **server**. A condition evaluated purely client-side — for example inside a client render power — will not see it.

## Speech versus chat

`apoli:action_on_speech` and `apoli:action_on_sending_message` both match *words*, but they are unrelated systems:

- **`action_on_speech`** transcribes the player's microphone **on their own machine** and sends only text to the server. It does not use Simple Voice Chat at all and works without it.
- **[`action_on_sending_message`](/docs/datapack/powers/action_on_sending_message)** matches typed chat messages. It is core Apoli, documented with the other power types, and needs no mod at all — it is the fallback for setups where speech recognition isn't available.

Simple Voice Chat itself only carries audio, so it can never provide word matching on its own.
