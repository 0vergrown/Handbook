---
title: "/apoli:disguise"
description: "Make an entity render as another entity type or as a player."
---

Applies the same disguise the [`apoli:disguise`](/docs/datapack/bientity-actions/disguise) action uses. Aliased to `/disguise`.

A disguise is client-side rendering only: hitbox, AI, drops and everything else stay as they were.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `entity <targets> <entity_type> [<nbt>]` | Renders the targets as that entity type. |
| `player <targets> <player_name>` | Renders the targets as that player. |
| `random <targets> [player\|entity\|any]` | Picks a random disguise. |
| `clear <targets>` | Removes the disguise. |
| `query <target>` | Prints the target's current disguise. |

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

## See also

- [apoli:disguise (bi-entity action)](/docs/datapack/bientity-actions/disguise)
- [apoli:disguised (condition)](/docs/datapack/entity-conditions/disguised)
- [Commands overview](/docs/datapack/commands/overview)
