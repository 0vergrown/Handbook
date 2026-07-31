---
title: "Skill Tree Power Data"
description: "Optional data any power file can carry in its skill field, the skill-tree counterpart of Origins' badges."
---

Optional data any power file can carry in its `skill` field, the skill-tree counterpart of Origins' badges. Adding it turns the power into a **skill widget** in a Skill Tree: the widget's name and description come from the power's own `name`/`description`, and purchasing the skill grants the power it is defined in.

> `parent` is **required** and must point at a `skill_trees` file id (making this a top-level skill of that tree) or at another power that has `skill` data (making this its child). A skill whose parent chain doesn't end at a skill tree is ignored with a log warning.

**On an `apoli:multiple` power:** put `skill` at the **top level** of the multiple, next to `name`/`description` — one widget appears and purchasing it grants the whole multiple (all sub-powers). A sub-power object can instead carry its own `skill` block, which makes a widget granting just that sub-power (its id is `<power>_<subkey>` if you want to parent other skills to it). If a skill silently doesn't appear, check the log — a malformed `skill` block (e.g. a missing `parent`) fails the whole power's parse with a `Failed to parse power` error.

## Fields

| Field                  | Type                                        | Default                             | Description                                                                                                                |
|------------------------|---------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `parent`               | [Identifier](/docs/datapack/data-types/identifier)                      | **required**                        | The skill tree id, or the id of another skill-bearing power, this widget hangs under.                                      |
| `icon`                 | Item Stack (Data Types)                     | `{"item": "minecraft:grass_block"}` | The item displayed as the icon for the skill widget.                                                                       |
| `condition`            | Entity Condition                            | _optional_                          | The unlock/lock gate — the widget is shown but only purchasable (still costing points) while this holds; dimmed otherwise. |
| `visibility_condition` | Entity Condition                            | _optional_                          | The show/hide gate — the widget only appears while this holds (a failed condition hides it entirely).                      |
| `excludes`             | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_                          | Mutually-exclusive skills: buying this locks each listed skill, and buying any of them locks this one.                     |
| `cost`                 | [Integer](/docs/datapack/data-types/integer)                         | `0`                                 | The amount of points that the player needs in order to purchase this skill.                                                |
| `order`                | [Integer](/docs/datapack/data-types/integer)                         | `0`                                 | Sort key among skills sharing the same `parent` (lower lays out first); ties keep load order.                              |

Purchased skills can be **shift-clicked to refund** (points returned, power removed) as long as no purchased skill depends on them and the tree hasn't set `refundable: false` — see [Skill Tree](/docs/datapack/skill-tree/skill-tree) for the admin commands.

Per-skill `condition` and `visibility_condition` are evaluated when the skill state is computed — on join, on purchase, on grant/revoke, and each time the tree screen is opened — **not** every tick.

## Example

```json
{
	"skill": {
        "icon": {
            "item": "minecraft:feather"
        },
        "parent": "example_pack:parkour_skills",
        "cost": 1
    }
}
```

This in-power skill creates a widget under the `example_pack:parkour_skills` tree that, when purchased for 1 point, grants the power it is defined in.
