---
title: "Commands"
description: "Every command Apoli and Origins add, what it does, and who can run it."
---

Apoli and Origins add a handful of commands for granting powers, editing resources, disguising entities, managing skill trees and summoning clones. They are meant for pack authors and server admins, and everything they do can also be done from JSON.

## The commands

| Command | Alias | What it does |
| --- | --- | --- |
| [`/apoli:power`](/docs/datapack/commands/power) | `/power` | Grants, revokes, inspects and suppresses powers. |
| [`/apoli:resource`](/docs/datapack/commands/resource) | `/resource` | Reads and writes [`apoli:resource`](/docs/datapack/powers/resource) and [`apoli:cooldown`](/docs/datapack/powers/cooldown) values. |
| [`/apoli:skill_tree`](/docs/datapack/commands/skill-tree) | `/skills` | Buys and refunds skills, hands out points, and grants and revokes trees. |
| [`/apoli:disguise`](/docs/datapack/commands/disguise) | `/disguise` | Makes an entity render as another entity or a player. |
| [`/apoli:scale`](/docs/datapack/commands/scale) | _none_ | Reads and changes the scales stored on entities. |
| [`/apoli:clone`](/docs/datapack/commands/clone) | _none_ | Summons, lists and removes player clones. |
| [`/apoli:mount`](/docs/datapack/commands/mount) | _none_ | Inspects and clears the rider offsets `apoli:mount` stores. |
| [`/apoli:key`](/docs/datapack/commands/key) | _none_ | Holds, releases and inspects keys on any entity, and fakes a scroll wheel. |
| [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) | _none_ | Toggles the debugging view: resources as text, shapes outlined in particles, no cooldowns. |
| [`/tick entity`, `/tick chunk`](/docs/datapack/commands/tick) | `/apoli:tick` | Two extra branches on Minecraft's own `/tick`, so a rate, freeze, step or sprint can be aimed at particular entities or chunks. |
| [`/origin`](/docs/datapack/commands/origin) | _none_ | Sets, queries and rerolls a player's origin. Only with Origins installed. |

Apoli also adds [entity selector options](/docs/datapack/commands/selectors) so `@a[origin=…]` and `@e[power=…]` work anywhere a selector is accepted.

## Namespaced names and aliases

Every command is registered under its full `apoli:` name, and some also have a short alias that points at the same command. `/power grant @s example:flight` and `/apoli:power grant @s example:flight` are the same command. Use the namespaced form in functions if another mod might claim the short name.

`/apoli:clone` has no short alias because `/clone` is a vanilla command. `/apoli:mount` and `/apoli:key` have none either, since `/mount` and `/key` are names other mods are likely to want.

## Permissions

Each command needs permission level 2 (the same as `/give`) by default. On Fabric, when [fabric-permissions-api](https://github.com/lucko/fabric-permissions-api) is installed, Apoli checks a permission node first and only falls back to the level when the node isn't set. On NeoForge the nodes are registered with the built-in permission API, with the level as their default.

| Node | Command |
| --- | --- |
| `apoli.command.power` | `/apoli:power` |
| `apoli.command.resource` | `/apoli:resource` |
| `apoli.command.skill_tree` | `/apoli:skill_tree` |
| `apoli.command.disguise` | `/apoli:disguise` |
| `apoli.command.scale` | `/apoli:scale` |
| `apoli.command.clone` | `/apoli:clone` |
| `apoli.command.mount` | `/apoli:mount` |
| `apoli.command.key` | `/apoli:key` |
| `apoli.command.dev_mode` | `/apoli:dev_mode` |
| `apoli.command.tick` | `/apoli:tick entity` and `/apoli:tick chunk`, and on 1.20.1 also `/tick entity` and `/tick chunk`. On 1.21, `/tick` itself uses vanilla's level 3. |
| `origins.command.origin.set` | `/origin set` and `/origin revoke` |
| `origins.command.origin.gui` | `/origin gui` |
| `origins.command.origin.random` | `/origin random` |
| `origins.command.origin.orb` | `/origin orb` |
| `origins.command.origin.cap` | `/origin cap` |
| `origins.command.origin.storage` | `/origin storage` |

Anyone can run `/origin has` and `/origin get`.

## Return values

Every command returns a count, so it works with `/execute store`:

```mcfunction
execute store result score @s power_count run power has @s
execute if entity @a[origin=example:phoenix] run say someone is a phoenix
```

It works the other way round too: `/execute store result resource` and `/execute store success resource` write any command's result straight into a resource. See [Resource](/docs/datapack/commands/resource#storing-with-execute).
