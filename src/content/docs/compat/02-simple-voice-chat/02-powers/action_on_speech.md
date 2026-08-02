---
title: "Action On Speech (Power Type)"
description: "Runs an action when the holder says a word or phrase out loud (real speech-to-action)."
navigation_title: "Action On Speech"
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder **says** a word or phrase out loud. Say "fireball" and cast a fireball.

Type ID: `apoli:action_on_speech`

> **How it works.** Transcription happens entirely on the speaking player's own machine, offline, using a bundled [Vosk](https://alphacephei.com/vosk/) recogniser. The recognised text **never leaves the client** — Apoli matches your `message` / `messages` / `regex` locally and sends the server only "power `X` triggered". The server then re-checks that you actually hold that power before running its action.

> Needs the client-side *speech to action* option enabled and a Vosk model installed (see below). This power does **not** need Simple Voice Chat.

## Client setup

1. Enable it: set `"speechToAction": true` in `config/apoli-client.json`.
2. Install a model: download one from [alphacephei.com/vosk/models](https://alphacephei.com/vosk/models) (the ~40 MB `small` models are plenty) and unpack it into `<game folder>/apoli/vosk-model/`.

> The recogniser ships with the mod on **both** loaders. On NeoForge it is unpacked to `<game folder>/apoli/runtime/` the first time you enable speech-to-action and loaded in isolation, so it cannot clash with the copy of JNA other mods ship.

**With Simple Voice Chat installed**, that is all — Apoli reads the audio Simple Voice Chat has already captured,
on your machine, before it is encoded. You just talk on voice chat as normal, and your own push-to-talk (or voice
activation) is the gate. Apoli never opens the microphone itself, so there is no device to fight over.

**Without Simple Voice Chat**, Apoli opens the microphone itself and needs a key: bind **Speech to Action** under
Options → Controls → Apoli. It only listens while that key is held.

Apoli tells you in chat on join which of the two it is using, or what is missing if it cannot start.

### Response time

By default Apoli matches against Vosk's **partial** results — the running hypothesis the recogniser produces
while you are still speaking — so the action fires within a couple of hundred milliseconds of the word instead
of waiting for you to stop talking. Each power fires at most **once per utterance**, so a phrase that keeps
matching as the sentence grows still only triggers once.

Set `"speechInstant": false` in `config/apoli-client.json` to wait for the finished sentence instead. That is
slightly more accurate — a partial hypothesis can be revised, so a word can occasionally trigger on a
mis-hearing that the final result would have corrected — at the cost of roughly half a second of delay.

## Client options

All of these live in `config/apoli-client.json` and only affect the player who sets them.

Option | Default | What it does
-------|---------|--------------
`speechToAction` | `false` | Master switch. Nothing listens until this is `true`.
`speechSource` | `"auto"` | `auto` uses Simple Voice Chat when it is installed, otherwise the microphone. Force one with `voicechat` or `microphone`.
`speechInstant` | `true` | Fire on partial results for a fast response. `false` waits for the finished sentence.
`speechPushToTalk` | `true` | *Microphone source only.* Listen only while the **Speech to Action** key is held. `false` listens continuously.
`speechInputDevice` | `""` | *Microphone source only.* Part of a recording device name; empty uses the system default.
`speechEcho` | `false` | Print every recognised phrase to chat. Diagnostic — see below.

### Recording device (microphone source only)

On Windows another program holding the device can leave Apoli capturing **silence**. If you see
`Captured no audio` in the log or chat, set `"speechInputDevice"` to part of a device name (matched
case-insensitively); the usable devices are listed in the log at startup as
`Recording devices available for speech: ...`. This is the main reason `auto` prefers Simple Voice Chat.

### If nothing fires

Set `"speechEcho": true` in `config/apoli-client.json`. Every phrase Vosk recognises is then printed to chat,
along with a note when nothing matched it. That separates the two failure modes:

- **Nothing printed** — the microphone or the model is the problem. The log tells you which: `Speech capture
  started` appears when the key is detected, and `Speech capture ended (N bytes)` on release. No `started` line
  means the key isn't being seen; `0 bytes` means the device is the problem (see above).
- **Text printed but no action** — recognition works and the phrase simply isn't matching. Check spelling,
  and remember matching is a case-insensitive *contains*, so short words are easiest.

Every recognised phrase is also written to the log as `[Apoli] Speech heard: "..."`, echo or not.

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
