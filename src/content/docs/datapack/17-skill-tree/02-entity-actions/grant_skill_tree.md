---
title: "Grant Skill Tree (Entity Action Type)"
description: "Grants a skill tree to the player this action runs on."
navigation_title: "Grant Skill Tree"
---

Grants a [skill tree](/docs/datapack/skill-tree/skill-tree-json-format) to the player this action runs on. The grant is stored on the player and survives relogs, the tree's tab appears in the skill screen, and its `default_powers` apply straight away. Granting is what makes a tree with `auto_grant: false` reachable, from an origin, a power, an item action or anything else that can run an entity action.

Type ID: `apoli:grant_skill_tree`

> [!NOTE]
> Granting a tree the player already has (or one with `auto_grant: true`) does nothing. Skills the player bought before an [apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree) come back when the tree is granted again.

## Pufferfish's Skills categories

If `skill_tree` names an ID that isn't a loaded Apoli skill tree and [Pufferfish's Skills](/docs/compat/pufferfishs-skills/overview) is installed, the ID is looked up as a Skills category instead, and that category is unlocked for the player. It is the same fallback the [apoli:modify_player_model](/docs/datapack/powers/modify_player_model) power uses for Figura avatars: Apoli's own registry wins, and the other mod only gets IDs Apoli doesn't know.

[apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree) locks the category again.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the skill tree to grant. |

## Example

This action unlocks the Phantom skill tree, `example:phantom`:

```json
{
    "type": "apoli:grant_skill_tree",
    "skill_tree": "example:phantom"
}
```
