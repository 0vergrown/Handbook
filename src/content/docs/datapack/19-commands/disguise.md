---
title: "Disguise (Command)"
description: "Make an entity render as another entity type or as a player."
navigation_title: "Disguise"
---

Applies the same disguise the [`apoli:disguise`](/docs/datapack/bientity-actions/disguise) action uses. Aliased to `/disguise`.

A disguise is client-side rendering only: hitbox, AI, drops and everything else stay as they were.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `<targets> <disguise> [<nbt>]` | Shorthand — resolves `<disguise>` as an entity type, or as a player name if no such type exists. |
| `entity <targets> <entity_type> [<nbt>]` | Renders the targets as that entity type. |
| `player <targets> <player_name>` | Renders the targets as that player. |
| `random <targets> [player\|entity\|any]` | Picks a random disguise. |
| `clear <targets>` | Removes the disguise. |
| `query <target>` | Prints the target's current disguise. |

## Shorthand

```mcfunction
disguise @s minecraft:creeper
disguise @s creeper
disguise @s notch
disguise @e[type=zombie] minecraft:villager {Profession:"minecraft:librarian"}
```

`<disguise>` is tried as an entity type first (an unqualified id means `minecraft:`), then as a player name. Player names are matched without regard to case, so `notch` finds `Notch` — spell it any way you like, but a name that is not lowercase has to go through `disguise player` if you want tab-completion to offer it.

## entity

```mcfunction
disguise entity @s minecraft:creeper
disguise entity @s minecraft:sheep {Color:5}
disguise entity @e[type=zombie] minecraft:villager
```

The optional NBT is applied to the rendered stand-in, so you can set variants, colours, poses and anything else the entity reads from its save data.

Unknown entity types are rejected with a message.

## player

```mcfunction
disguise player @s Notch
```

Resolves the name against online players first, then the server's profile cache. A disguised entity also takes on that player's name in chat and the tab list.

## random

```mcfunction
disguise random @s
disguise random @s player
disguise random @s entity
```

`player` picks a random online player, `entity` a random registered entity type, and `any` (the default) picks between the two.

## clear / query

```mcfunction
disguise clear @s
disguise query @s
```
