---
title: "apoli:action_on_speech"
description: "Runs an Entity Action Type when the holder says a word or phrase out loud (real speech-to-action)."
---

Runs an Entity Action Type when the holder **says** a word or phrase out loud — real speech-to-action. Say "Fireball" and cast a fireball.

Type ID: `apoli:action_on_speech`

> **How it works (and why it's TPS-friendly):** transcription happens entirely on the speaking player's own machine, in their browser, using the built-in Web Speech API. Apoli runs a tiny local web page (opened automatically on join) that listens to the microphone and sends only the recognised **text** to the game. No audio ever reaches the server, and the server only does cheap string matching — zero server-side speech processing. Keep the opened tab in the background while playing.

> Requires a browser with the Web Speech API (Chrome / Edge). A fully-offline Vosk fallback is planned for browsers/setups without it.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | The action run on the holder when the speech matches.
`message` | String | _optional_ | A phrase to listen for. Matches if the recognised speech **contains** it (case-insensitive), so it works mid-sentence.
`messages` | Array of String | _optional_ | Several phrases (e.g. the same trigger in multiple languages); matches if the speech contains **any** of them.
`regex` | String | _optional_ | A regular expression tested against the recognised speech.
`language` | String | _optional_ | Only match when the speaker's transcription language matches this BCP-47 tag (e.g. `en-US`, `fr-FR`). Omit to match any language.

If none of `message`/`messages`/`regex` are set, **any** speech triggers the action.

## Multi-language

The speech page has a **"Speak in" language selector** — it defaults to the player's Minecraft language but each player can switch it to whatever they actually speak, independently of their game language. The browser then recognises that language and every transcript is tagged with it. Use `language` to gate a trigger to one tag, and `messages` to list a trigger phrase across several languages so speakers of any of them fire the same action — useful on servers with a mixed playerbase.

> If your words aren't recognised, first check the selector matches the language you're speaking — recognising English audio under a French setting (or vice-versa) is the usual cause of "nothing happens."

## Example

Cast a fireball on the word, in English or French:

```json
{
   "type":"apoli:action_on_speech",
   "messages":[
      "fireball",
      "boule de feu"
   ],
   "entity_action":{
      "type":"apoli:fire_projectile",
      "entity_type":"minecraft:small_fireball"
   }
}
```
