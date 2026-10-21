---
title: "Disguise (Command)"
description: "Makes an entity render as another entity type or as a player."
navigation_title: "Disguise"
---

Applies the same disguise that the [`apoli:disguise`](/docs/datapack/bientity-actions/disguise) action uses. The short alias is `/disguise`.

A disguise only changes how the entity is drawn on clients. Its hitbox, AI, drops and everything else stay as they were.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `<targets> <disguise> [<nbt>]` | The shorthand. It reads `<disguise>` as an entity type, or as a player name if no such type exists. |
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

`<disguise>` is tried as an entity type first, where an ID without a namespace means `minecraft:`, and then as a player name. Player names are matched regardless of case, so `notch` finds `Notch`. `<disguise>` is read as an ID, and an ID can't hold capital letters, so here a name has to be typed in lowercase, which is also how tab completion offers it. `disguise player` takes the name exactly as written.

## entity

```mcfunction
disguise entity @s minecraft:creeper
disguise entity @s minecraft:sheep {Color:5}
disguise entity @e[type=zombie] minecraft:villager
```

The optional NBT is applied to the stand-in that is drawn, so you can set variants, colours, poses and anything else the entity reads from its save data.

Unknown entity types are rejected with a message.

## player

```mcfunction
disguise player @s Notch
```

The name is looked up among online players first, then in the server's profile cache. A disguised entity also takes on that player's name in chat and the tab list.

## random

```mcfunction
disguise random @s
disguise random @s player
disguise random @s entity
```

`player` picks a random online player, `entity` a random registered entity type, and `any` (the default) picks between the two.

## clear and query

```mcfunction
disguise clear @s
disguise query @s
```
