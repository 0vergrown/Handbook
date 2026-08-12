---
title: Pufferfish's Skills
description: Apoli powers and resources as Skills rewards, and Skills categories as skill trees.
---

[Pufferfish's Skills](https://modrinth.com/mod/skills) is a standalone skill-tree mod with its own categories, points and rewards. Apoli ships a two-way integration with it, so a pack can keep using Skills' tree UI while the actual gameplay lives in Apoli powers.

Everything here is **behaviour-gated**: Apoli loads fine without Skills, the reward types simply are not registered and the skill-tree fall-through never fires.

## Rewards Apoli registers

These are written in a Skills **category** JSON, under a skill's `rewards` list.

| Type | What it does |
| --- | --- |
| [`apoli:power`](/docs/compat/pufferfishs-skills/power) | Grants (or revokes) an Apoli power while the skill is unlocked. |
| [`apoli:modify_resource`](/docs/compat/pufferfishs-skills/modify_resource) | Drives an Apoli resource from the skill's unlock count. |

## Skills categories from Apoli

[`apoli:grant_skill_tree`](/docs/datapack/skill-tree/grant_skill_tree) and [`apoli:revoke_skill_tree`](/docs/datapack/skill-tree/revoke_skill_tree) resolve their `skill_tree` id against Apoli's own [skill trees](/docs/datapack/skill-tree/skill-tree) first. When the id is not a loaded Apoli tree and Skills is present, it is looked up as a Skills category and unlocked / locked instead. So one action drives both systems and you do not need a separate power type.

```json
{
    "type": "apoli:grant_skill_tree",
    "skill_tree": "example:mage"
}
```

If `example:mage` is an Apoli skill tree it is granted; if it is a Skills category it is unlocked.

## Sources and restarts

Every `apoli:power` reward grants its power under its own generated source id, so two rewards handing out the same power do not fight, and revoking one does not take the power away from the other. Those source ids are regenerated each time the datapack is (re)loaded, so on player login Apoli drops every power still held under an old reward source before asking Skills to re-apply the current ones. A leftover grant from a previous server session can therefore never linger.

`apoli:modify_resource` sidesteps the same problem by writing a value derived from the unlock count rather than adding a delta — re-applying it is always a no-op.

## Migrating from Pufferfish's Skills x Origins

The `puffish_skills_origins:power` reward from [Pufferfish's Skills x Origins](https://modrinth.com/mod/skills-origins) maps onto [`apoli:power`](/docs/compat/pufferfishs-skills/power) field-for-field — rename the `type` and the pack keeps working. Its `puffish_skills_origins:unlock_category` power type has no equivalent; use [`apoli:grant_skill_tree`](/docs/datapack/skill-tree/grant_skill_tree) in an [`apoli:action_on_callback`](/docs/datapack/powers/action_on_callback) instead.
