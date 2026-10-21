---
title: "Action On Speech (Power Type)"
description: "Runs an action when the holder says a word or phrase out loud."
navigation_title: "Action On Speech"
---

Runs an [entity action](/docs/datapack/entity-actions) when the holder says a word or phrase out loud. Say "fireball" and cast a fireball.

Type ID: `apoli:action_on_speech`

> [!NOTE]
> Transcription happens entirely on the speaking player's own machine, offline, using a bundled [Vosk](https://alphacephei.com/vosk/) recogniser. The recognised text never leaves the client: Apoli matches your `message`, `messages` or `regex` locally and only tells the server that power `X` triggered. The server then checks again that you actually hold that power before running its action.

> [!IMPORTANT]
> It needs the client-side speech to action option enabled and a Vosk model installed (see below). This power doesn't need Simple Voice Chat.

## Client setup

1. Enable it by setting `"speechToAction": true` in `config/apoli-client.json`.
2. Install a model: download one from [alphacephei.com/vosk/models](https://alphacephei.com/vosk/models) (the `small` models of about 40 MB are plenty) and unpack it into `<game folder>/apoli/vosk-model/`.

The recogniser ships with the mod on both loaders. On NeoForge it is unpacked to `<game folder>/apoli/runtime/` the first time you enable speech to action and loaded on its own, so it can't clash with the copy of JNA other mods ship.

With Simple Voice Chat installed, that is all. Apoli reads the audio Simple Voice Chat has already captured, on your machine, before it is encoded. You talk on voice chat as normal, and your own push-to-talk (or voice activation) decides when you are heard. Apoli never opens the microphone itself, so there is no device to fight over.

Without Simple Voice Chat, Apoli opens the microphone itself and needs a key: bind Speech to Action under Options, Controls, Apoli. It only listens while that key is held.

When you join, Apoli says in chat which of the two it is using, or what is missing if it can't start.

### Response time

By default Apoli matches against Vosk's partial results, the running guess the recogniser makes while you are still speaking, so the action fires within a couple of hundred milliseconds of the word instead of waiting for you to stop talking. Each power fires at most once per utterance, so a phrase that keeps matching as the sentence grows still only triggers once.

Set `"speechInstant": false` in `config/apoli-client.json` to wait for the finished sentence instead. That is slightly more accurate, because a partial guess can be revised, so a word can occasionally trigger on a mishearing that the final result would have corrected. It costs about half a second of delay.

## Client options

All of these live in `config/apoli-client.json` and only affect the player who sets them.

| Option | Default | What it does |
| --- | --- | --- |
| `speechToAction` | `false` | The main switch. Nothing listens until this is `true`. |
| `speechSource` | `"auto"` | `auto` uses Simple Voice Chat when it is installed, and the microphone otherwise. Force one with `voicechat` or `microphone`. |
| `speechInstant` | `true` | Fires on partial results for a fast response. `false` waits for the finished sentence. |
| `speechPushToTalk` | `true` | For the microphone source only. Listens only while the Speech to Action key is held, and `false` listens all the time. |
| `speechInputDevice` | `""` | For the microphone source only. Part of a recording device name, and empty uses the system default. |
| `speechEcho` | `false` | Prints every recognised phrase to chat, for diagnosing problems (see below). |

### Recording device

This only applies to the microphone source. On Windows, another program holding the device can leave Apoli capturing silence. If you see `Captured no audio` in the log or chat, set `"speechInputDevice"` to part of a device name (matched without regard to case). The usable devices are listed in the log at startup as `Recording devices available for speech: ...`. This is the main reason `auto` prefers Simple Voice Chat.

### If nothing fires

Set `"speechEcho": true` in `config/apoli-client.json`. Every phrase Vosk recognises is then printed to chat, with a note when nothing matched it. That separates the two kinds of failure:

- If nothing is printed, the microphone or the model is the problem, and the log says which. `Speech capture started` appears when the key is detected, and `Speech capture ended (N bytes)` when it is released. No `started` line means the key isn't being seen, and `0 bytes` means the device is the problem (see above).
- If text is printed but nothing happens, recognition works and the phrase isn't matching. Check the spelling, and remember that matching checks whether the speech contains the phrase, ignoring case, so short words are easiest.

Every recognised phrase is also written to the log as `[Apoli] Speech heard: "..."`, with echo on or off.

### Listening all the time

Set `"speechPushToTalk": false` in `config/apoli-client.json` to listen continuously instead. Even then the microphone stays on the client and only trigger IDs are sent, but you would be transcribing everything you say, which is why push-to-talk is the default.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the holder when the speech matches. |
| `message` | [String](/docs/datapack/data-types/string) | _optional_ | A phrase to listen for. It matches if the recognised speech contains it, ignoring case, so it works in the middle of a sentence. |
| `messages` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `[]` | Several phrases, such as the same trigger in several languages. It matches if the speech contains any of them. |
| `regex` | [String](/docs/datapack/data-types/string) | _optional_ | A regular expression tested against the recognised speech. |
| `language` | [String](/docs/datapack/data-types/string) | _optional_ | Only matches when the speaker's transcription language equals this BCP-47 tag (`en-US`, `fr-FR` and so on). Leave it out to match any language. |

If none of `message`, `messages` and `regex` is set, any speech triggers the action.

## Several languages

Matching is done in the language of the installed Vosk model, so download the model for the language you speak. `language` limits a trigger to one BCP-47 tag (compared against the client's Minecraft language), and `messages` lets you list the same trigger phrase in several languages, so speakers of any of them fire the same action.

> [!TIP]
> If words aren't being recognised, the model language and the spoken language almost certainly disagree. English audio with a French model is the usual cause of nothing happening.

## Example

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

This casts a fireball when the holder says "fireball" or "boule de feu".

## Notes

- A short cooldown for each power on the server suppresses repeats if the same phrase is recognised twice in quick succession.
- Players without a model installed, or with the option off, never trigger these powers, and nothing goes out of sync.
