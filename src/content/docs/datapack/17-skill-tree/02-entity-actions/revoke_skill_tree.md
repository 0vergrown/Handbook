---
title: "Revoke Skill Tree (Entity Action Type)"
description: "Revokes a previously granted skill tree from the player this action runs on."
navigation_title: "Revoke Skill Tree"
---

Revokes a [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) that was [granted](/docs/datapack/skill-tree/grant_skill_tree) to the player this action runs on. The tree's tab disappears, and its `default_powers` and every power from its purchased skills are removed. Purchases and points are kept, so if the tree is granted again later, everything comes back.

Type ID: `apoli:revoke_skill_tree`

> [!NOTE]
> Trees with `auto_grant: true` can't really be revoked, because every player has them automatically. Set `auto_grant: false` on trees you want to manage with grant and revoke.

If `skill_tree` names an ID that isn't a loaded Apoli skill tree and [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed, the ID is looked up as a Skills category and that category is locked instead, the reverse of [apoli:grant_skill_tree](/docs/datapack/skill-tree/grant_skill_tree).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the skill tree to revoke. |

## Example

```json
{
    "type": "apoli:revoke_skill_tree",
    "skill_tree": "example:phantom"
}
```
