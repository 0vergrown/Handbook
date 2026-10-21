---
title: "Skill Tree"
description: "The /apoli:skill_tree command, also available as /skills, manages skill trees for testing and administration."
---

The `/apoli:skill_tree` command, also available as plain `/skills`, manages the skill tree system for testing and administration: buying and refunding skills, editing points, granting and revoking trees, resetting, and inspecting a player's state.

## Syntax

```mcfunction
apoli:skill_tree buy <targets> <skill> [force]
```

Buys the skill for the target players under the normal rules: the tree is available, the parent is owned, there are enough points and the conditions pass. Add `force` to skip every requirement and the cost, so the skill is marked as bought, its power applied (only if its tree is available) and its [rewards](/docs/datapack/skill-tree/skill-tree-power-data#rewards) given.

```mcfunction
apoli:skill_tree unbuy <targets> <skill>
```

Removes a purchased skill, gives back exactly what was paid for it (nothing, for a skill bought with `force`), takes back its rewards as far as the player still has them, and takes its power away. This is the admin version: it ignores the tree's `refundable` setting, doesn't care whether purchased child skills depend on it, and never refuses because a reward is gone.

```mcfunction
apoli:skill_tree points get <target> <tree>
apoli:skill_tree points set <targets> <tree> <value>
apoli:skill_tree points add <targets> <tree> <value>
```

Reads or edits a player's point balance for a tree. `add` accepts negative values, and balances never go below 0.

```mcfunction
apoli:skill_tree grant <targets> <tree>
apoli:skill_tree revoke <targets> <tree>
```

The command forms of [apoli:grant_skill_tree](/docs/datapack/skill-tree/grant_skill_tree) and [apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree).

```mcfunction
apoli:skill_tree reset <targets> [<tree>] [norefund]
```

Deselects every purchased skill (optionally only in one tree) and rebuilds the powers. Unless `norefund` is added, it gives back what was paid and takes back the rewards the player still has, the same as the [apoli:reset_skills](/docs/datapack/skill-tree/reset_skills) action. With `norefund`, the player keeps the rewards.

```mcfunction
apoli:skill_tree list <target>
```

Prints the player's trees (with their auto, granted or not granted status), point balances and purchased skills.

`<skill>` suggests every loaded skill ID (the ID of the power carrying the `skill` data), and `<tree>` suggests every `skill_trees` file ID.

## Refunds for players

Players can refund their own skills without commands. Shift-clicking a purchased skill in the tree screen removes it, gives back what was paid, takes back its rewards and revokes its power. This only works while no purchased skill depends on it (those have to be refunded first), while the player still has its rewards, and only in trees that allow it. Set `refundable: false` in the [tree file](/docs/datapack/skill-tree/skill-tree-json-format) to make purchases permanent. The hover card shows "Shift-click to refund" whenever a refund is possible, and says why when the rewards are in the way.

## Permissions

`/apoli:skill_tree` (and the `/skills` alias) needs the permission node `apoli.command.skill_tree`, which defaults to operator permission level 2. On Fabric the node is checked through fabric-permissions-api when it is present, and on NeoForge it is registered with the built-in Permission API. Without a permissions mod, and for the console and command blocks, the vanilla operator level check applies.
