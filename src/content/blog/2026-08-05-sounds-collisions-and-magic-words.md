---
title: Rewriting sound, colliding with things, and what a magic word actually matches
description: Apoli 1.23.0 adds two sound-replacement powers, action_on_collision, three new play_sound fields, texture icons for skill trees, and makes the chat magic-word trigger say what it means.
date: 2026-08-05
author: Overgrown
---

Apoli **1.23.0** (Origins **1.11.1**) is a sound update, a collision trigger, and a long-overdue clarification of how chat filters match.

## Sound, rewritten in both directions

Two new power types, mirror images of each other.

[`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) changes the sounds an entity **makes** — hurt, death, footsteps, eating, equipping, attack swings, the level-up chime. Everyone who can hear the entity hears the replacement.

[`apoli:replace_sound_reception`](/docs/datapack/powers/replace_sound_reception) changes the sounds a player **hears**, from any source, on their client only.

Both take the same `sounds` map. A key is either an exact sound id or a regular expression matched against the whole id, and a value is a sound id, an object with `volume`/`pitch`, or a weighted array to pick from:

```json
{
   "type":"apoli:replace_sound_emission",
   "sounds":{
      "entity.player.hurt":"minecraft:entity.ghast.hurt",
      "entity.player.big_fall":{
         "id":"minecraft:entity.iron_golem.damage",
         "volume":0.6
      },
      "block.grass.step":[
         {
            "id":"minecraft:block.wool.step",
            "weight":3
         },
         {
            "id":"minecraft:block.snow.step",
            "weight":1,
            "pitch":1.4
         }
      ],
      "minecraft:entity\\.zombie\\.(.*)":"minecraft:entity.pig.$1"
   }
}
```

That last rule is the interesting one: a regex key can feed its capture groups into the replacement, so every `minecraft:entity.zombie.*` sound becomes the matching `minecraft:entity.pig.*` one — ambient, hurt, death, step, all of it — in a single line. `minecraft:empty` mutes a sound outright, which is all deafness needs:

```json
{
   "type":"apoli:replace_sound_reception",
   "sounds":{
      "minecraft:(block|entity|ambient|music)\\..*":"minecraft:empty"
   }
}
```

Set `replace: false` and the replacement plays *on top of* the original instead of taking it away, which is how you get a layered effect — a chime over every footstep, muffled water over everything while submerged. `priority` orders several such powers on the same holder.

**A note on writing these.** A key with no regex metacharacters is treated as an exact sound id and matched with a hash lookup; anything else is compiled once at load and tested in file order. Prefer exact ids where you can — a pack full of `.*` rules runs every one of them against every sound the entity makes, and sound emission is close to a per-tick path.

## Walking into things

[`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision) runs a bi-entity action while the holder's bounding box overlaps another entity's. No attack required — touching is enough.

```json
{
   "type":"apoli:action_on_collision",
   "cooldown":10,
   "target_action":{
      "type":"apoli:set_on_fire",
      "duration":60
   }
}
```

It takes `bientity_condition` and `target_condition` to filter what counts, a `radius` to inflate the check outwards if you want a bubble rather than skin contact, and `hud_render` for the cooldown. Because it works off an overlap test rather than vanilla's push logic, it also fires for the things vanilla never pushes: armour stands, boats, dropped items, projectiles in flight.

One thing to watch: `cooldown` is per power, not per target. With `cooldown: 20`, walking into a crowd fires once and then waits — it does not fire once per mob. Leave it at `0` if you want every colliding entity every tick, and keep in mind what that multiplies out to.

## play_sound grew three fields

[`apoli:play_sound`](/docs/datapack/entity-actions/play_sound) picks up `follow_entity` (the sound travels with the entity instead of pinning to the spot it started), `global` (no distance falloff) and `internal` (everyone *except* the holder hears it). `global` defaults to whatever `follow_entity` is, since a following sound almost always wants full range.

```json
{
  "type": "apoli:play_sound",
  "sound": "minecraft:entity.creeper.primed",
  "internal": true
}
```

## Skill tree icons can be textures

Origins has been able to point `icon` at a PNG for a while. Skill trees now use the same [Icon](/docs/datapack/data-types/icon) type, so a tree tab, a skill node, or a power's `skill` block all take a texture:

```json
{
   "name":"Pyromancy",
   "icon":{
      "texture":"example:textures/gui/skills/pyromancy_tab.png"
   }
}
```

Item ids and item stacks work exactly as before. The file's real size is read from the PNG and scaled into the slot, so a 16×16 or a 256×256 icon both just work.

## What a magic word actually matches

[`apoli:action_on_sending_message`](/docs/datapack/powers/action_on_sending_message) matches typed chat against a pattern. The part nobody could tell from the docs: the pattern was a **substring search**. `"fireball"` fired on `Fireball 1`, on `I cast fireball`, on `fireballs`. That is a fine default, but it was never stated and it is not what most people mean by a magic word.

There is now a `match_mode` field that says it out loud:

| `match_mode` | `"fireball"` fires on |
| --- | --- |
| `"contains"` (default, unchanged) | `fireball`, `Fireball 1`, `throw a fireball!`, `fireballs` |
| `"full"` | `fireball` — and nothing else |
| `"word"` | `fireball`, `throw a fireball!` — but not `fireballs` |
| `"starts_with"` | `fireball`, `fireball at the sky` |
| `"ends_with"` | `fireball`, `cast a fireball` |

So the trigger most people were actually reaching for is:

```json
{
   "type":"apoli:action_on_sending_message",
   "filter":{
      "filter":"fireball",
      "match_mode":"full",
      "case_insensitive":true,
      "prevent":true
   },
   "entity_action":{
      "type":"apoli:fire_projectile",
      "entity_type":"minecraft:small_fireball",
      "speed":1.5
   }
}
```

`case_insensitive` replaces hand-writing `(?i)`, `literal: true` turns off regex entirely for words containing `(` or `[`, and a filter can now be written as a bare string when you don't need any of that. Existing packs are untouched — `contains` is still the default and `(?i)` still works.

Two related fixes while in there. `message_type` never worked: the chat hook didn't pass a chat type, so any power that set the field could never match and simply never fired. And `priority` was parsed and then never read. Both do what they say now.

Also: an invalid regex in a filter used to fall back to a literal match silently, which meant a typo left you with a filter that quietly matched nothing you expected. It still falls back — but it says so in the log.

## Smaller things

- Skill trees logged a bogus *"has no skill tree at the top of its parent chain"* warning for **every** skill in the pack on each data-pack load. Skills were registered before their trees, so the first of two rebuilds validated against an empty tree map. If you have been ignoring a wall of those, they are gone.
- `apoli:action_on_sending_message` has moved in these docs out of the Simple Voice Chat section and in with the rest of the power types. It never needed voice chat — it is plain vanilla chat — and filing it under a compat section implied otherwise.
