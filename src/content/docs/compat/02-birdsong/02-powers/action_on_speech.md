---
title: "Action On Speech (Power Type)"
description: "Runs an action when the holder says a word or phrase out loud."
navigation_title: "Action On Speech"
---

Runs an [entity action](/docs/datapack/entity-actions) when the holder says a word or phrase out loud. Say "fireball" and cast a fireball.

Type ID: `birdsong:action_on_speech` (alias `apoli:action_on_speech`)

> [!NOTE]
> This power comes from [Birdsong](/docs/compat/birdsong/overview), which has to be installed on the server and on the speaking player's client. It doesn't need Simple Voice Chat.

Speech is recognised offline on the speaking player's own computer, by [Vosk](https://alphacephei.com/vosk/). Their client compares what it heard with the phrases of the powers they hold and tells the server only which power matched. The server then checks that the player holds that power and that its `condition` passes before it runs `entity_action`, so a modified client can't fire a power the player doesn't have.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the holder when the speech matches. |
| `message` | [String](/docs/datapack/data-types/string) | _optional_ | A word or phrase to listen for. [How phrases match](#how-phrases-match) explains the rules. |
| `messages` | [Array](/docs/datapack/data-types/array) of [Strings](/docs/datapack/data-types/string) | `[]` | Several phrases, such as the same command in several languages. Any one of them matches. |
| `regex` | [String](/docs/datapack/data-types/string) | _optional_ | A regular expression, found anywhere in what was heard. `#{some.translation.key}` expands to every translation of that key, as it does in [message filters](/docs/datapack/powers/action_on_sending_message#translation-keys). |
| `language` | [String](/docs/datapack/data-types/string) | _optional_ | Only matches when the speaker's [language](#languages) is this one, written as a tag such as `en`, `en-US` or `fr`. Leave it out to match any language. |
| `tolerance` | [Float](/docs/datapack/data-types/float) | `0.2` | How different a finished sentence may be from a phrase and still match, from `0` to `1`. `0` accepts exact words only. See [Close matches](#close-matches). |

When several of `message`, `messages` and `regex` are set, any one of them matching is enough. If none of them is set, any speech triggers the action.

## How phrases match

Birdsong splits the phrase and what was heard into words of letters and digits, so case and punctuation don't matter: `"Fire-ball!"` is the two words `fire` and `ball`.

- A phrase matches whole words anywhere in the sentence. `fireball` matches "cast a fireball now", and `fire` doesn't match "fireball".
- Spaces between the words don't matter, since a recogniser often splits a word in two or joins two words. `fireball` also matches "fire ball", and `fire ball` matches "fireball".

A `regex` is tested against the sentence as the recogniser wrote it. Vosk writes lowercase words without punctuation.

### Close matches

A recogniser often gets a word slightly wrong, so a finished sentence also matches when part of it is close enough to a phrase. Birdsong counts the letters that would have to be added, removed or changed to turn those words into the phrase, ignoring spaces, and divides that by the length of the longer of the two. If the result is `tolerance` or less, the phrase matches. Words that sound alike count half.

At the default `0.2`, "fireballs" matches `fireball` (one letter in nine), and so does "firebolt": two letters in eight is `0.25`, halved because the two words sound alike.

Close matches only apply to phrases of at least five letters, and only to finished sentences, so they never fire while the player is still talking.

### Response time

By default the client also checks the recogniser's running guess while the player is still talking, so a power fires a moment after its word instead of at the end of the sentence. Close matches still wait for the finished sentence. Each power fires at most once per sentence, however often its phrase comes up in it, and the server ignores a second trigger of the same power within a quarter of a second.

Players who prefer to wait for the finished sentence can turn off Match While Speaking. A running guess can be revised, so waiting is a little more accurate, at the cost of about half a second.

## Languages

A recogniser only understands the language of its speech model, so download the model for the language you speak. English spoken to a French model is the usual cause of nothing being recognised.

A speaker's language is the language of their speech model when Birdsong downloaded it, and their game language for a model unpacked by hand. In `language`, a short tag also covers its regions: `en` matches `en-US` and `en-GB`, and `en-US` matches a speaker whose language is just `en`. Case and the choice of `-` or `_` don't matter.

`messages` can list the same command in several languages, so every player can say it in their own.

## Turning it on

Nothing listens until the player agrees. When a player who holds one of these powers joins a world while Speech Recognition is set to Ask, the default, Birdsong asks in chat whether to turn it on, with three choices:

- Turn on starts listening, now and in every world with voice commands.
- Not now asks again on the next join.
- Never turns it off and stops asking.

The first time it is turned on, Birdsong downloads a speech model from [alphacephei.com](https://alphacephei.com/vosk/models): the small model for the game language, or the English one when that language has none. It says how large the download is before it starts, shows the progress above the hotbar, and saves the model in `<game folder>/birdsong/models/`, where it is reused from then on. If the download fails, the message links to the model list and names the folder to unpack a model into by hand.

Birdsong only downloads a model when none is installed. With several installed, it picks one it downloaded for the game language, and otherwise the first one by name. A model in `<game folder>/apoli/vosk-model/` is used when `birdsong/models/` is empty. To choose a model yourself, name its folder in the Speech Model setting, or remove the installed one so Birdsong downloads the model for the current game language.

## Where the audio comes from

With Simple Voice Chat installed, Birdsong reads the audio Simple Voice Chat has already captured, on the player's computer, before it is encoded. Only what the player transmits is heard, so their own push-to-talk or voice activation decides when Birdsong listens, and there is no second program fighting over the microphone.

Without Simple Voice Chat, Birdsong opens the microphone itself. By default it only listens while the Push to Talk key is held. That key has no binding at first, so bind it under Controls, Birdsong. Birdsong reminds you in chat while it is unbound. With Push to Talk turned off it listens all the time and picks speech out of the background noise. The microphone isn't read while a menu or the chat is open.

## Client settings

Each player sets these for themselves, on Birdsong's settings screen (from Mod Menu or Catalogue on Fabric, and from the mods list on NeoForge) or in `config/birdsong-client.json`. If that file doesn't exist yet, Birdsong copies any speech settings it finds in `config/apoli-client.json`.

| Setting | In the file | Default | What it does |
| --- | --- | --- | --- |
| Speech Recognition | `speech` | `"ask"` | `ask` offers to turn it on when you join a world with voice commands, `on` always listens in those worlds, and `off` never listens. |
| Listen To | `source` | `"auto"` | `auto` uses Simple Voice Chat when it is installed and the microphone otherwise. `voicechat` and `microphone` force one. |
| Push to Talk | `push_to_talk` | `true` | For the microphone only. `true` listens while the Push to Talk key is held, and `false` listens whenever you speak. |
| Match While Speaking | `instant` | `true` | Fires on the running guess. `false` waits for the finished sentence. |
| Show What Was Heard | `echo` | `false` | Prints every finished sentence in chat and in the log, with a note when no voice command matched it. |
| Microphone | `input_device` | `""` | For the microphone only. Part of a recording device's name, matched without regard to case. Empty uses the system default. |
| Speech Model | `model` | `""` | The name of a model folder in `birdsong/models`, or a full path to one. Empty picks the model for the game language. |

## Commands

These client commands change the same settings from chat:

| Command | What it does |
| --- | --- |
| `/birdsong speech on` | Sets Speech Recognition to On and starts listening. |
| `/birdsong speech off` | Sets it to Off and stops listening. |
| `/birdsong speech later` | Skips the question until the next join. |
| `/birdsong speech status` | Shows the setting, whether Birdsong is listening and through what, and the model and language in use. |

To test a power without a microphone, any player can run `/birdsong:speech <text>` (also `/apoli:speech <text>`) on the server. It runs their own speech powers as if they had just finished saying `<text>`, close matches included, and reports how many fired. Its `language` is the player's game language, and always `en-US` on Minecraft 1.20.1.

## If nothing fires

Run `/birdsong speech status` first. It says whether Birdsong is listening at all, and which model and language it is using. Birdsong also says in chat when the server doesn't have Birdsong, since voice commands can't run there.

Then turn on Show What Was Heard, which prints every finished sentence in chat:

- If nothing is printed, no audio is reaching Birdsong. Through Simple Voice Chat only what you transmit is heard. With the microphone and Push to Talk, the key has to be held. When Birdsong reports that no audio reached it, another program may be holding the microphone, so pick a different one in the Microphone setting. The names it accepts are listed in the log as `[Birdsong] Recording devices: ...` when Birdsong starts listening to the microphone.
- If the sentence is printed but nothing fires, recognition works and the phrase doesn't match. Compare the printed words with the phrase, and check `language`.

## Examples

```json
{
  "type": "birdsong:action_on_speech",
  "messages": ["fireball", "boule de feu"],
  "entity_action": {
    "type": "apoli:fire_projectile",
    "entity_type": "minecraft:small_fireball"
  }
}
```

This casts a fireball when the holder says "fireball" or "boule de feu".

```json
{
  "type": "birdsong:action_on_speech",
  "message": "levitate",
  "tolerance": 0,
  "entity_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:levitation",
      "duration": 60
    }
  }
}
```

This lifts the holder for three seconds when they say "levitate", and a close match such as "levitated" doesn't count.

```json
{
  "type": "birdsong:action_on_speech",
  "regex": "\\b(heal|mend) me\\b",
  "language": "en",
  "entity_action": {
    "type": "apoli:heal",
    "amount": 4
  }
}
```

This heals two hearts when an English speaker says "heal me" or "mend me" anywhere in a sentence.
