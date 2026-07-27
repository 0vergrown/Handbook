---
title: "apoli:action_on_speech"
description: "Runs an action when the holder says a word or phrase out loud (real speech-to-action)."
---

Runs an [Entity Action](/docs/datapack/entity-actions) when the holder **says** a word or phrase out loud. Say "fireball" and cast a fireball.

Type ID: `apoli:action_on_speech`

> **How it works.** Transcription happens on the speaking player's own machine, in their browser, using the built-in Web Speech API. Apoli serves a tiny local page (opened automatically on join) that listens to the microphone and sends only the recognised **text** to the game. No audio reaches the server, and the server only does cheap string matching. Keep the opened tab in the background while playing.

> Needs a browser with the Web Speech API (Chrome / Edge), and the client-side *speech to action* option enabled. This power does **not** need Simple Voice Chat.

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

The speech page has a **"Speak in" language selector**. It defaults to the player's Minecraft language, but each player can switch it to whatever they actually speak, independently of their game language. Every transcript is tagged with that language.

Use `language` to gate a trigger to one tag, and `messages` to list the same trigger phrase across several languages so speakers of any of them fire the same action.

> If words aren't being recognised, check the selector matches the language actually being spoken — English audio under a French setting is the usual cause of "nothing happens".

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

## See also

- [`apoli:action_on_sending_message`](/docs/compat/simple-voice-chat/action_on_sending_message) — the typed-chat equivalent.
