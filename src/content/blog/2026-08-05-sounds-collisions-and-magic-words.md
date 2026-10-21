---
title: Rewriting sound, colliding with things, and what a magic word actually matches
description: "Apoli 1.23.1 adds two sound replacement powers, apoli:action_on_collision, three play_sound fields and texture icons for skill trees, and fixes the chat magic word trigger properly."
date: 2026-08-05
author: Overgrown
---

Apoli 1.23.1 (Origins 1.11.1) brings sound replacement, a collision trigger, and a fix for the chat magic word trigger that was long overdue.

## Sound, rewritten in both directions

There are two new power types, mirror images of each other.

[`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) changes the sounds an entity makes: hurt, death, footsteps, eating, equipping, attack swings and the level up chime. Everyone who can hear the entity hears the replacement.

[`apoli:replace_sound_reception`](/docs/datapack/powers/replace_sound_reception) changes the sounds a player hears, from any source, on their client only.

Both take the same `sounds` map. A key is either an exact sound ID or a regular expression matched against the whole ID, and a value is a sound ID, an object with `volume` and `pitch`, or a weighted array to pick from:

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

The last rule is the interesting one. A regex key can feed its capture groups into the replacement, so every `minecraft:entity.zombie.*` sound becomes the matching `minecraft:entity.pig.*` one (ambient, hurt, death, step, all of it) in a single line. `minecraft:empty` mutes a sound outright, which is all deafness needs:

```json
{
   "type":"apoli:replace_sound_reception",
   "sounds":{
      "minecraft:(block|entity|ambient|music)\\..*":"minecraft:empty"
   }
}
```

Set `replace: false` and the replacement plays on top of the original instead of replacing it. That gives you layered effects, like a chime over every footstep, or muffled water over everything while you're underwater. `priority` orders several such powers on the same holder.

A key with no regex metacharacters is treated as an exact sound ID and matched with a hash lookup. Anything else is compiled once at load and tested in file order. Prefer exact IDs where you can, since a pack full of `.*` rules runs every one of them against every sound the entity makes, and sound emission is close to a per-tick path.

## Walking into things

[`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision) runs a bi-entity action while the holder's bounding box overlaps another entity's. No attack is needed, and touching is enough.

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

It takes `bientity_condition` and `target_condition` to filter what counts, a `radius` to inflate the check outwards if you want a bubble instead of skin contact, and `hud_render` for the cooldown. It works from an overlap test instead of vanilla's push logic, so it also fires for things vanilla never pushes: armour stands, boats, dropped items and projectiles in flight.

> [!WARNING]
> `cooldown` counts per power. With `cooldown: 20`, walking into a crowd fires once and then waits, instead of firing once for each mob. Leave it at `0` if you want every colliding entity every tick, and keep in mind what that multiplies out to.

## play_sound grew three fields

[`apoli:play_sound`](/docs/datapack/entity-actions/play_sound) picks up `follow_entity` (the sound travels with the entity instead of staying where it started), `global` (no falloff with distance) and `internal` (everyone except the holder hears it). `global` defaults to whatever `follow_entity` is, since a sound that follows almost always wants full range.

```json
{
  "type": "apoli:play_sound",
  "sound": "minecraft:entity.creeper.primed",
  "internal": true
}
```

## Skill tree icons can be textures

Origins has been able to point `icon` at a PNG for a while. Skill trees now use the same [Icon](/docs/datapack/data-types/icon) type, so a tree tab, a skill node or a power's `skill` block can all take a texture:

```json
{
   "name":"Pyromancy",
   "icon":{
      "texture":"example:textures/gui/skills/pyromancy_tab.png"
   }
}
```

Item IDs and item stacks work exactly as before. The file's real size is read from the PNG and scaled into the slot, so a 16×16 or a 256×256 icon both work.

## What a magic word actually matches

[`apoli:action_on_sending_message`](/docs/datapack/powers/action_on_sending_message) matches typed chat against a pattern. What nobody could tell from the docs was that the pattern was a substring search. `"fireball"` fired on `Fireball 1`, on `I cast fireball` and on `fireballs`. That's a fine default, but it was never stated, and it isn't what most people mean by a magic word.

There is now a `match_mode` field that says it out loud:

| `match_mode` | `"fireball"` fires on |
| --- | --- |
| `"contains"` (default, unchanged) | `fireball`, `Fireball 1`, `throw a fireball!`, `fireballs` |
| `"full"` | `fireball` and nothing else |
| `"word"` | `fireball` and `throw a fireball!`, but not `fireballs` |
| `"starts_with"` | `fireball`, `fireball at the sky` |
| `"ends_with"` | `fireball`, `cast a fireball` |

So the trigger most people were actually reaching for is this one:

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

`case_insensitive` replaces writing `(?i)` by hand, `literal: true` turns regex off entirely for words containing `(` or `[`, and a filter can now be written as a plain string when you don't need any of that. Existing packs are untouched, since `contains` is still the default and `(?i)` still works.

> [!NOTE]
> `(?i)` is regex for ignore case. It doesn't mean "not this", and a surprising number of packs were using it that way. For "not this", see `inverted` below.

### One match, one action

Each filter used to run the power's `entity_action` when it matched, so a message matching two filters ran the action twice. With the default substring matching, that's easy to hit without noticing: `"stone"` and `"smooth stone"` both match the message `smooth stone`.

Now the list is evaluated first and `entity_action` runs once. The per-filter `before_action`, `after_action`, `replacement` and `prevent` still run for every filter that matched, because those are meant to be per filter. A `filters` list used as a dispatch table, with one `after_action` per magic word, keeps working exactly as before.

### `inverted`, for carving out exceptions

A filter can now be marked `"inverted": true`, which turns it into a veto. It never triggers the power by itself, and only stops the power when it matches.

```json
{
  "type": "apoli:action_on_sending_message",
  "filters": [
    {
      "filter": "stone",
      "prevent": true
    },
    {
      "filter": "smooth stone",
      "inverted": true
    },
    {
      "filter": "mossy cobblestone",
      "inverted": true
    }
  ]
}
```

That fires on `stone` and `stonecutter`, but not on `smooth stone` or `mossy cobblestone`.

Before you reach for it, though: if the words are simply different messages, `match_mode` already says that, and more clearly.

```json
{
  "filter": "stone",
  "match_mode": "full",
  "literal": true,
  "case_insensitive": true,
  "prevent": true
}
```

`inverted` earns its keep when the pattern really has to stay loose and you only want a few holes in it.

### Three reasons it wasn't firing at all

`message_type` never worked. The chat hook didn't pass a chat type, so any power that set the field could never match and never fired. `priority` was parsed and then never read. And only typed chat was hooked, so `/say`, `/me` and `/msg` went straight past the filters, and a magic word sent as a command did nothing. All three work now.

An invalid regex in a filter also fell back to a literal match silently, leaving you with a filter that matched nothing you expected. It still falls back, but now it says so in the log.

A failing action inside the power could also break chat with no useful error. Chat broadcast runs inside a future chain whose exception handler logs a generic "Chain link failed" and moves on, never naming the mod. The power now catches its own failures, names itself and the message, and lets the message through.

### Rewriting instead of blocking

A filter can now carry a `replacement`, which rewrites the message instead of swallowing it, capture groups and all:

```json
{
  "type": "apoli:action_on_sending_message",
  "filter": {
    "filter": "heck",
    "replacement": "****",
    "case_insensitive": true
  }
}
```

### A way to see what's happening

`/apoli:message <text>` tests `<text>` as if you'd typed it, and tells you which powers are active, which filters matched, whether the power ends up inert, and what would have happened to the message. If a magic word isn't firing, start there. It tells you whether the power is even active before you start rewriting regex.

It's a dry run, and no `entity_action` is executed, so debugging a power that hands out items doesn't fill your inventory with the evidence.

### Translation keys got much cheaper

`#{some.translation.key}` in a filter expands to every translation of that key, so one filter catches a phrase in any language. It used to index every translation key of every installed mod at startup, tens of thousands of strings held for the whole session to serve a couple of lookups. Now only the keys your filters name are read, once, the first time such a filter is tested. A pack with no `#{...}` never opens a language file at all.

## Smaller things

- Skill trees logged a bogus "has no skill tree at the top of its parent chain" warning for every skill in the pack on each data pack load. Skills were registered before their trees, so the first of two rebuilds checked against an empty tree map. If you've been ignoring a wall of those, they're gone.
- In these docs, `apoli:action_on_sending_message` has moved out of the Simple Voice Chat section and in with the rest of the power types. It never needed voice chat, since it works on plain vanilla chat, and filing it under a compat section suggested otherwise.
