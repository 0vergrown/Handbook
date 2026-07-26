---
title: "apoli:grant_skill_tree"
description: "Grants a Skill Tree JSON Format to the player this action runs on."
---

Grants a [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) to the player this action runs on. The grant is stored on the player (it survives relogs), the tree's tab appears in the skill screen, and its `default_powers` are applied immediately. Granting is what makes a tree with `auto_grant: false` reachable — from an origin, a power, an item action, or anything else that can run an entity action.

Type ID: `apoli:grant_skill_tree`

> Granting a tree the player already has (or that has `auto_grant: true`) does nothing. Skills the player had purchased before a [apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree) come back when the tree is granted again.

## Fields

| Field        | Type                   | Default      | Description                        |
|--------------|------------------------|--------------|------------------------------------|
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The id of the skill tree to grant. |

## Example

The following action unlocks the Phantom skill tree `example:phantom`.

```json
{
    "type": "apoli:grant_skill_tree",
    "skill_tree": "example:phantom"
}
```

