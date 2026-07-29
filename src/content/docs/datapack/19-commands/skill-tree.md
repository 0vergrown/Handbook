---
title: "/apoli:skill_tree"
description: "Buy and refund skills, hand out points, grant and revoke trees."
---

Drives the [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) system from the command line. Aliased to `/skills`.

Every sub-command targets players and re-syncs their skill screen immediately.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `buy <targets> <skill> [force]` | Purchases a skill, paying its cost. |
| `unbuy <targets> <skill>` | Refunds a skill and returns its cost. |
| `points get <target> <tree>` | Prints the target's points in a tree. |
| `points set <targets> <tree> <value>` | Sets points to an exact value. |
| `points add <targets> <tree> <value>` | Adds points. |
| `points remove <targets> <tree> <value>` | Subtracts points. |
| `grant <targets> <tree>` | Grants a tree so its tab appears. |
| `revoke <targets> <tree>` | Revokes an explicit tree grant. |
| `reset <targets> [<tree>] [norefund]` | Un-purchases every skill. |
| `list <target>` | Prints the target's trees, points and purchases. |

## points

```mcfunction
skills points set @a example:magic 10
skills points add @s example:magic 3
skills points remove @s example:magic 1
skills points get @s example:magic
```

`<tree>` is the id of a **skill tree file** (`data/<namespace>/skill_trees/<name>.json`), not a skill. Points are stored per tree and are what skills are bought with. `set` and `remove` clamp at zero.

An unknown tree id is rejected with a message listing the trees that are loaded, so a typo never silently vanishes into an unused key.

## buy / unbuy

```mcfunction
skills buy @s example:fire_mastery
skills buy @s example:fire_mastery force
skills unbuy @s example:fire_mastery
```

`buy` runs the same checks a player clicking in the screen would: the tree is available, the parent is purchased, nothing excludes it, the skill's `condition` passes, and there are enough points. `force` skips all of that and the cost.

`unbuy` refunds regardless of whether the tree is `refundable`, unlike the in-game refund button.

## grant / revoke

```mcfunction
skills grant @s example:magic
skills revoke @s example:magic
```

Only meaningful for trees with `auto_grant: false` — a tree with `auto_grant: true` is always available and cannot be revoked. Granting applies the tree's `default_powers`; revoking takes them and the tree's purchased skill powers away, while remembering the purchases for if it is granted again.

## reset

```mcfunction
skills reset @s
skills reset @s example:magic
skills reset @s example:magic norefund
```

Un-purchases everything (in one tree, or all of them) and refunds the points spent. Add `norefund` to wipe the purchases without giving the points back.

## list

```mcfunction
skills list @s
```

Prints which trees the player has, their points per tree, and every purchased skill.

## Where skills come from

A skill can be declared two ways, and both end up in the same tree:

- a `skill` block inside a [power file](/docs/datapack/skill-tree/skill-tree-power-data) — the power *is* the skill
- a file in `skill_trees/` that carries a `parent` field — the classic layout, where the file names the power(s) it unlocks

A file in `skill_trees/` **without** a `parent` is the tree itself. That one field is the whole distinction.

## See also

- [Skill Tree JSON Format](/docs/datapack/skill-tree/skill-tree-json-format)
- [Skill data on a power](/docs/datapack/skill-tree/skill-tree-power-data)
- [apoli:add_skill_points](/docs/datapack/skill-tree/add_skill_points)
- [Commands overview](/docs/datapack/commands/overview)
