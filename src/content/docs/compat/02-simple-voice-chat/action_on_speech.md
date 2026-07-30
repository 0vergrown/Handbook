---
title: "apoli:action_on_speech"
description: "Runs an action when the holder says a word or phrase out loud (real speech-to-action)."
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder **says** a word or phrase out loud. Say "fireball" and cast a fireball.

Type ID: `apoli:action_on_speech`

> **How it works.** Transcription happens entirely on the speaking player's own machine, offline, using a bundled [Vosk](https://alphacephei.com/vosk/) recogniser. The recognised text **never leaves the client** — Apoli matches your `message` / `messages` / `regex` locally and sends the server only "power `X` triggered". The server then re-checks that you actually hold that power before running its action.

> Needs the client-side *speech to action* option enabled and a Vosk model installed (see below). This power does **not** need Simple Voice Chat.

## Client setup

1. Enable it: set `"speechToAction": true` in `config/apoli-client.json`.
2. Install a model: download one from [alphacephei.com/vosk/models](https://alphacephei.com/vosk/models) (the ~40 MB `small` models are plenty) and unpack it into `<game folder>/apoli/vosk-model/`.
3. Bind a key: **Options → Controls → Apoli → Speech to Action**. Apoli only listens while that key is held.

Nothing is captured until you hold the key, and no audio is ever recorded to disk or sent anywhere.

Apoli tells you in chat on join if any of those three steps is missing, and confirms which key it is listening on once it is armed — if you see nothing at all, `speechToAction` is still `false`.

### Always-on listening (opt-in)

Set `"speechPushToTalk": false` in `config/apoli-client.json` to listen continuously instead. Even then the microphone stays on the client and only trigger ids are sent — but you will be transcribing everything you say, so push-to-talk is the default.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | Entity Action | _optional_ | Run on the holder when the speech matches. |
| `message` | String | _optional_ | A phrase to listen for. Matches if the recognised speech **contains** it (case-insensitive), so it works mid-sentence. |
| `messages` | Array of String | `[]` | Several phrases — e.g. the same trigger in multiple languages. Matches if the speech contains **any** of them. |
| `regex` | String | _optional_ | A regular expression tested against the recognised speech. |
| `language` | String | _optional_ | Only match when the speaker's transcription language equals this BCP-47 tag (`en-US`, `fr-FR`, …). Omit to match any language. |

If none of `message` / `messages` / `regex` are set, **any** speech triggers the action.

## Multi-language

Matching is done against the language of the installed Vosk model. Download the model for the language you speak; `language` gates a trigger to one BCP-47 tag (compared against the client's Minecraft language), and `messages` lets you list the same trigger phrase in several languages so speakers of any of them fire the same action.

> If words aren't being recognised, the model language and the spoken language almost certainly disagree — English audio against a French model is the usual cause of "nothing happens".

## Example

Cast a fireball on the word, in English or French:

```json
{
  "type": "apoli:action_on_speech",
  "messages": ["fireball", "boule de feu"],
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball"
  }
}
```

## Notes

- Only **final** results fire the action. Partial results are discarded, so one spoken phrase runs the action once — earlier builds could fire several times for a single word.
- A short per-power cooldown on the server suppresses repeats if the same phrase is recognised twice in quick succession.
- Players without a model installed, or with the option off, simply never trigger these powers; nothing desyncs.

## See also

- [`apoli:action_on_sending_message`](/docs/compat/simple-voice-chat/action_on_sending_message) — the typed-chat equivalent.
