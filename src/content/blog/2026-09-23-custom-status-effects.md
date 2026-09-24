---
title: "Custom status effects, and four more"
description: "Apoli 1.95.0: data packs can define their own status effects, /resource gains scoreboard operations and an /execute store target, and there is a new sprinting power, an item cooldown action and an aggro action."
date: 2026-09-23
author: Overgrown
---

Apoli **1.95.0** is a feature release, built on work contributed by FLDebug10 and PolarKookie.

## Custom status effects

A file in `data/<namespace>/effects/` now defines a real status effect. It works with `/effect give`,
potions, `apoli:apply_effect` and `apoli:status_effect`, and while an entity has it, the entity holds
the powers the file lists:

```json
{
    "type": "beneficial",
    "powers": ["example:frenzy_speed"],
    "r": 0.85, "g": 0.15, "b": 0.1,
    "name": "Frenzy"
}
```

The server sends the list to every client, so players only need a resource pack for icons and
translations. Server owners can switch the whole feature off in `config/apoli-effects.json`.
Everything else is on the [Custom status effects](/docs/datapack/introduction/custom-status-effects)
page.

## /resource operation and /execute store resource

`/resource operation` combines a resource with a scoreboard score, using the same operators as
`/scoreboard players operation`, down to its rounding and its *Cannot divide by zero* error:

```mcfunction
resource operation @s example:mana += @s mana_bonus
```

`resource` is also a target for `/execute store` now, and it chains with the other `store`
clauses like `store score` does:

```mcfunction
execute store result resource @s example:mana run data get entity @s XpLevel
```

Both are on the [Resource](/docs/datapack/commands/resource) command page.

## Three new types

- [`apoli:sprinting`](/docs/datapack/powers/sprinting): the player sprints whenever they move forward.
- [`apoli:cooldown`](/docs/datapack/item-actions/cooldown) (item action): puts the item on cooldown, like an ender pearl after a throw.
- [`apoli:aggro_at`](/docs/datapack/bientity-actions/aggro_at) (bi-entity action): makes a neutral mob angry at a player.

## Update both sides

This release changes the network protocol, so the server and every player need Apoli 1.95.0. A
client on an older version cannot join.
