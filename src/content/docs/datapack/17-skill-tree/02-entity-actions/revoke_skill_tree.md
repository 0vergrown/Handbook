---
title: "Revoke Skill Tree (Entity Action Type)"
description: "Revokes a previously granted skill tree from the player this action runs on."
navigation_title: "Revoke Skill Tree"
---

Revokes a previously [granted](/docs/datapack/skill-tree/grant_skill_tree) [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) from the player this action runs on. The tree's tab disappears, and its `default_powers` plus all powers from its purchased skills are removed. Purchases and points are **kept** (if the tree is granted again later, everything comes back).

Type ID: `apoli:revoke_skill_tree`

> Trees with `auto_grant: true` cannot be meaningfully revoked — every player has them automatically. Set `auto_grant: false` on trees you want to manage with grant/revoke.

If `skill_tree` names an id that is not a loaded Apoli skill tree and [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed, the id is looked up as a Skills **category** and that category is locked instead — the mirror of [apoli:grant_skill_tree](/docs/datapack/skill-tree/grant_skill_tree).

## Fields

| Field        | Type                   | Default      | Description                         |
|--------------|------------------------|--------------|-------------------------------------|
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The id of the skill tree to revoke. |

## Example

```json
{
    "type": "apoli:revoke_skill_tree",
    "skill_tree": "example:phantom"
}
```
