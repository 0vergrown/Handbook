---
title: "Skill Tree (Command)"
description: "Buys and refunds skills, hands out points, and grants and revokes trees."
navigation_title: "Skill Tree"
---

Drives the [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) system from the command line. The short alias is `/skills`.

Every sub-command targets players and updates their skill screen straight away.

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `buy <targets> <skill> [force]` | Buys a skill, paying its cost. |
| `unbuy <targets> <skill>` | Refunds a skill: returns what was paid and takes back its rewards. |
| `points get <target> <tree>` | Prints the target's points in a tree. |
| `points set <targets> <tree> <value>` | Sets points to an exact value. |
| `points add <targets> <tree> <value>` | Adds points. |
| `points remove <targets> <tree> <value>` | Subtracts points. |
| `grant <targets> <tree>` | Grants a tree so its tab appears. |
| `revoke <targets> <tree>` | Revokes an explicit tree grant. |
| `reset <targets> [<tree>] [norefund]` | Clears every bought skill. |
| `list <target>` | Prints the target's trees, points and purchases. |

## points

```mcfunction
skills points set @a example:magic 10
skills points add @s example:magic 3
skills points remove @s example:magic 1
skills points get @s example:magic
```

`<tree>` is the ID of a skill tree file (`data/<namespace>/skill_trees/<name>.json`), not of a skill. Points are stored per tree, and skills are bought with them. `set` and `remove` stop at zero.

An unknown tree ID is rejected with a message listing the loaded trees, so a typo never quietly writes points to a key nothing uses.

## buy and unbuy

```mcfunction
skills buy @s example:fire_mastery
skills buy @s example:fire_mastery force
skills unbuy @s example:fire_mastery
```

`buy` runs the same checks as a player clicking in the screen: the tree is available, the parent is bought, nothing excludes it, the skill's `condition` passes, and the cost can be paid. `force` skips all of that and the cost, and the skill's [rewards](/docs/datapack/skill-tree/skill-tree-power-data#rewards) are still given.

`unbuy` refunds whether or not the tree is `refundable`, unlike the refund in the screen. It gives back exactly what was paid (nothing for a forced purchase) and takes back the rewards the player still has, without refusing when some are gone.

## grant and revoke

```mcfunction
skills grant @s example:magic
skills revoke @s example:magic
```

These only matter for trees with `auto_grant: false`, because a tree with `auto_grant: true` is always available and can't be revoked. Granting applies the tree's `default_powers`. Revoking takes those and the tree's bought skill powers away, but remembers the purchases in case it is granted again.

## reset

```mcfunction
skills reset @s
skills reset @s example:magic
skills reset @s example:magic norefund
```

Clears every bought skill (in one tree, or in all of them), gives back what was paid and takes back the rewards the player still has. Add `norefund` to clear the purchases without giving anything back, and the player then keeps the rewards.

## list

```mcfunction
skills list @s
```

Prints which trees the player has, their points in each tree, and every bought skill.

## Where skills come from

A skill can be declared in two ways, and both end up in the same tree:

- a `skill` block inside a [power file](/docs/datapack/skill-tree/skill-tree-power-data), where the power is the skill
- a file in `skill_trees/` with a `parent` field, which names the powers it unlocks

A file in `skill_trees/` without a `parent` is the tree itself. That one field is the whole difference.
