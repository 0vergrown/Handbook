---
title: "Skill Tree"
description: "The /apoli:skilltree command (also reachable as bare /skills) manages the whole skill tree system for testing and administration: buying and refunding…"
---

The `/apoli:skill_tree` command (also reachable as bare `/skills`) manages the whole skill tree system for testing and administration: buying and refunding skills, editing points, granting/revoking trees, resetting, and inspecting a player's state.

## Syntax

```mcfunction
apoli:skill_tree buy <targets> <skill> [force]
```
Purchases the skill for the target player(s) through the normal rules (tree available, parent owned, enough points, conditions). Append `force` to skip every requirement **and** the point cost — the skill is simply marked purchased and its power applied (only if its tree is available).

```mcfunction
apoli:skill_tree unbuy <targets> <skill>
```
Removes a purchased skill, refunds its point cost, and takes its power away. This is the admin variant: it ignores the tree's `refundable` setting and doesn't care whether purchased child skills depend on it.

```mcfunction
apoli:skill_tree points get <target> <tree>
apoli:skill_tree points set <targets> <tree> <value>
apoli:skill_tree points add <targets> <tree> <value>
```
Reads or edits a player's point balance for a tree (`add` accepts negative values; balances never go below 0).

```mcfunction
apoli:skill_tree grant <targets> <tree>
apoli:skill_tree revoke <targets> <tree>
```
Command forms of [apoli:grant_skill_tree](/docs/datapack/skill-tree/grant_skill_tree) / [apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree).

```mcfunction
apoli:skill_tree reset <targets> [<tree>] [norefund]
```
Deselects every purchased skill (optionally only in one tree) and rebuilds powers, refunding points unless `norefund` is appended — same behavior as the [apoli:reset_skills](/docs/datapack/skill-tree/reset_skills) action.

```mcfunction
apoli:skill_tree list <target>
```
Prints the player's trees (with auto/granted/not-granted status), point balances, and purchased skills.

* `<skill>` suggests every loaded skill id (= the id of the power carrying the `skill` data); `<tree>` suggests every `skill_trees` file id.

## Player-facing refunds

Players can refund their own skills without commands: **shift-clicking a purchased skill** in the tree screen removes it, returns its point cost, and revokes its power. This only works while no purchased skill depends on it (refund leaves first), and only in trees that allow it — set `refundable: false` in the [tree file](/docs/datapack/skill-tree/skill-tree-json-format) to make purchases permanent. The hover card shows "Shift-click to refund" whenever a refund is possible.

## Permissions

`/apoli:skill_tree` (and the `/skills` alias) requires the permission node `apoli.command.skill_tree` (default: operator permission level 2). On Fabric the node is checked through the fabric-permissions-api when it is present; on NeoForge the node is registered with the built-in Permission API. Without a permissions mod (and for the console / command blocks) the vanilla operator level check applies.
