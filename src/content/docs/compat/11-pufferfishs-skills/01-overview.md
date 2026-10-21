---
title: Pufferfish's Skills
description: "Apoli powers and resources as Skills rewards, and Skills categories as skill trees."
---

[Pufferfish's Skills](https://modrinth.com/mod/skills) is a standalone skill tree mod with its own categories, points and rewards. Apoli integrates with it in both directions, so a pack can keep using the Skills tree screen while the gameplay itself lives in Apoli powers.

Everything here is behaviour-gated. Apoli loads fine without Skills: the reward types aren't registered, and the skill tree fallback never runs.

## Rewards Apoli registers

These go in a Skills category JSON, in a skill's `rewards` list.

| Type | What it does |
| --- | --- |
| [`apoli:power`](/docs/compat/pufferfishs-skills/power) | Grants (or revokes) an Apoli power while the skill is unlocked. |
| [`apoli:modify_resource`](/docs/compat/pufferfishs-skills/modify_resource) | Sets an Apoli resource from the number of times the skill is unlocked. |

## Skills categories from Apoli

[`apoli:grant_skill_tree`](/docs/datapack/skill-tree/grant_skill_tree) and [`apoli:revoke_skill_tree`](/docs/datapack/skill-tree/revoke_skill_tree) look up their `skill_tree` ID among Apoli's own [skill trees](/docs/datapack/skill-tree/skill-tree) first. When the ID isn't a loaded Apoli tree and Skills is present, it is looked up as a Skills category, which is unlocked or locked instead. One action drives both systems, so you don't need a separate power type.

```json
{
    "type": "apoli:grant_skill_tree",
    "skill_tree": "example:mage"
}
```

If `example:mage` is an Apoli skill tree, it is granted, and if it is a Skills category, it is unlocked.

## Sources and restarts

Every `apoli:power` reward grants its power under its own generated source ID, so two rewards handing out the same power don't fight, and revoking one doesn't take the power away from the other. Those source IDs are generated again each time the data pack loads, so when a player logs in, Apoli first drops every power still held under an old reward source and then asks Skills to apply the current ones again. A grant left over from a previous server session can never linger.

`apoli:modify_resource` avoids the same problem by writing a value worked out from the unlock count instead of adding to the current one, so applying it again changes nothing.

## Migrating from Pufferfish's Skills x Origins

The `puffish_skills_origins:power` reward from [Pufferfish's Skills x Origins](https://modrinth.com/mod/skills-origins) maps onto [`apoli:power`](/docs/compat/pufferfishs-skills/power) field for field, so rename the `type` and the pack keeps working. Its `puffish_skills_origins:unlock_category` power type has no equivalent. Use [`apoli:grant_skill_tree`](/docs/datapack/skill-tree/grant_skill_tree) in an [`apoli:action_on_callback`](/docs/datapack/powers/action_on_callback) instead.
