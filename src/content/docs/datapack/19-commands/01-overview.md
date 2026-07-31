---
title: "Commands"
description: "Every command Apoli and Origins add, what it does, and who is allowed to run it."
---

Apoli and Origins add a handful of commands for granting powers, poking at resources, disguising entities, managing skill trees and summoning clones. They are meant for pack authors and server admins — everything they do can also be done from JSON.

## The commands

| Command | Alias | What it does |
|---------|-------|--------------|
| [`/apoli:power`](/docs/datapack/commands/power) | `/power` | Grant, revoke, inspect and suppress powers. |
| [`/apoli:resource`](/docs/datapack/commands/resource) | `/resource` | Read and write [`apoli:resource`](/docs/datapack/powers/resource) and [`apoli:cooldown`](/docs/datapack/powers/cooldown) values. |
| [`/apoli:skill_tree`](/docs/datapack/commands/skill-tree) | `/skills` | Buy and refund skills, hand out points, grant and revoke trees. |
| [`/apoli:disguise`](/docs/datapack/commands/disguise) | `/disguise` | Make an entity render as another entity or player. |
| [`/apoli:clone`](/docs/datapack/commands/clone) | — | Summon, list and remove player clones. |
| [`/origin`](/docs/datapack/commands/origin) | — | Set, query and reroll a player's origin. Origins only. |

Apoli also adds [entity selector options](/docs/datapack/commands/selectors) so `@a[origin=…]` and `@e[power=…]` work anywhere a selector is accepted.

## Namespaced names and aliases

Every command is registered under its full `apoli:` name, with a short alias pointing at the same tree. `/power grant @s example:flight` and `/apoli:power grant @s example:flight` are the same command. Use the namespaced form in functions if another mod might claim the short name.

`/apoli:clone` has no short alias on purpose — `/clone` is a vanilla command.

## Permissions

Each command needs permission level 2 (the same as `/give`) by default. If [fabric-permissions-api](https://github.com/lucko/fabric-permissions-api) is installed, Apoli checks a permission node first and only falls back to the level when the node is undefined:

| Node | Command |
|------|---------|
| `apoli.command.power` | `/apoli:power` |
| `apoli.command.resource` | `/apoli:resource` |
| `apoli.command.skill_tree` | `/apoli:skill_tree` |
| `apoli.command.disguise` | `/apoli:disguise` |
| `apoli.command.clone` | `/apoli:clone` |
| `origins.command.origin.set` | `/origin set` |
| `origins.command.origin.gui` | `/origin gui` |
| `origins.command.origin.random` | `/origin random` |

`/origin has` and `/origin get` are readable by anyone.

## Return values

Every command returns a count so it composes with `/execute store`:

```mcfunction
execute store result score @s power_count run power has @s
execute if entity @a[origin=example:phoenix] run say someone is a phoenix
```
