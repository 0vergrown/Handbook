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
| `icon`                 | [Icon](/docs/datapack/data-types/icon)                     | `{"item": "minecraft:grass_block"}` | The item or texture displayed as the icon for the skill widget.                                                                       |
| `frame`                | `task` \| `goal` \| `challenge`             | `task`                              | The border drawn around the widget, matching the advancement frames — `task` is the plain square, `goal` the rounded one, `challenge` the spiked one. |
| `condition`            | Entity Condition                            | _optional_                          | The unlock/lock gate — the widget is shown but only purchasable (still costing points) while this holds; dimmed otherwise. |
| `visibility_condition` | Entity Condition                            | _optional_                          | The show/hide gate — the widget only appears while this holds (a failed condition hides it entirely).                      |
| `excludes`             | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_                          | Mutually-exclusive skills: buying this locks each listed skill, and buying any of them locks this one. A skill locked this way says which choice locked it out, by name. |
| `cost`                 | [Integer](/docs/datapack/data-types/integer) or [Object](/docs/datapack/data-types/object) | `0`                                 | What buying the skill costs: a number of points, or an object of points and items — see [Paying with items](#paying-with-items). |
| `order`                | [Integer](/docs/datapack/data-types/integer)                         | `0`                                 | Sort key among skills sharing the same `parent` (lower lays out first); ties keep load order.                              |

Purchased skills can be **shift-clicked to refund** (points and paid items returned, power removed) as long as no purchased skill depends on them and the tree hasn't set `refundable: false` — see [Skill Tree](/docs/datapack/skill-tree/skill-tree) for the admin commands.

Per-skill `condition` and `visibility_condition` are evaluated when the skill state is computed — on join, on purchase, on grant/revoke, and each time the tree screen is opened — **not** every tick.

## Paying with items

`cost` takes a plain number of points, or an object that adds items to the price:

| Field    | Type | Default | Description |
|----------|------|---------|-------------|
| `points` | [Integer](/docs/datapack/data-types/integer) | `0` | Points taken from the skill's tree. |
| `items`  | Item cost, or an [Array](/docs/datapack/data-types/array) of them | _optional_ | Items taken from the player's inventory. |

Each item cost uses the fields of an [Item Stack](/docs/datapack/data-types/item-stack) (`item` or `id`, `amount` or `count`, plus `components` on 1.21.1 or `tag` on 1.20.1), with one more:

| Field            | Type | Default | Description |
|------------------|------|---------|-------------|
| `item_condition` | Item Condition | _optional_ | Only stacks that pass this condition count toward the cost. |

For a single item you can leave out `items` and write the item fields straight into `cost`:

```json
"cost": {
    "points": 20,
    "item": "minecraft:dirt",
    "count": 2
}
```

```json
"cost": {
    "points": 5,
    "items": [
        { "id": "minecraft:diamond", "count": 2 },
        {
            "id": "minecraft:iron_sword",
            "item_condition": { "type": "apoli:enchantment", "enchantment": "minecraft:sharpness" }
        }
    ]
}
```

How the items are taken:

- A stack matches when it is the same item. If the cost gives `components` (or `tag`), the stack must carry exactly that data; a cost without data accepts the item whatever its data. `item_condition` narrows the match further.
- Items come from the main inventory, hotbar and offhand, never from worn armor.
- The purchase is all or nothing: if any item (or the points) is missing, nothing is taken.
- A refund, or a reset with `refund`, gives back exactly the stacks that were paid, so an enchanted sword comes back with its enchantments. A reset without a refund does not return them. Items that don't fit in the inventory are dropped at the player's feet.

The tooltip lists each item, red while the player doesn't have enough. The tooltip does not check `item_condition`, so a stack the server rejects on its condition can still show as enough; the purchase then simply doesn't go through.

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
