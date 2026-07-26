---
title: "apoli:revoke_skill_tree"
description: "Revokes a previously Grant Skill Tree Skill Tree JSON Format from the player this action runs on."
---

Revokes a previously [granted](/docs/datapack/skill-tree/grant_skill_tree) [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) from the player this action runs on. The tree's tab disappears, and its `default_powers` plus all powers from its purchased skills are removed. Purchases and points are **kept** (if the tree is granted again later, everything comes back).

Type ID: `apoli:revoke_skill_tree`

> Trees with `auto_grant: true` cannot be meaningfully revoked — every player has them automatically. Set `auto_grant: false` on trees you want to manage with grant/revoke.

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

