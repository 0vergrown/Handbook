---
title: "Skill Tree Power Data"
description: "Optional data any power file can carry in its skill field, the skill tree counterpart of Origins' badges."
---

Optional data any power file can carry in its `skill` field, the skill tree counterpart of Origins' badges. Adding it turns the power into a skill widget in a skill tree. The widget's name and description come from the power's own `name` and `description`, and buying the skill grants the power it is defined in.

> [!IMPORTANT]
> `parent` is required. It must point at a `skill_trees` file ID, which makes this a top-level skill of that tree, or at another power that has `skill` data, which makes this its child. A skill whose parent chain doesn't end at a skill tree is ignored with a warning in the log.

On an `apoli:multiple` power, put `skill` at the top level of the multiple, next to `name` and `description`. One widget appears, and buying it grants the whole multiple with all of its sub-powers. A sub-power object can instead carry its own `skill` block, which makes a widget that grants just that sub-power. Its ID is `<power>_<subkey>`, if you want to parent other skills to it. If a skill doesn't appear, check the log: a malformed `skill` block, such as one missing `parent`, fails the whole power's parse with a `Failed to parse power` error.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `parent` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The skill tree ID, or the ID of another power with skill data, that this widget hangs under. |
| `icon` | [Icon](/docs/datapack/data-types/icon) | `{"item": "minecraft:grass_block"}` | The item or texture shown as the skill widget's icon. |
| `frame` | `task`, `goal` or `challenge` | `task` | The border drawn around the widget, matching the advancement frames: `task` is the plain square, `goal` the rounded one and `challenge` the spiked one. |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The lock on the widget. It is shown, but can only be bought (still costing points) while this holds, and is dimmed otherwise. |
| `visibility_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | Whether the widget shows at all. It only appears while this holds, and a failed condition hides it entirely. |
| `excludes` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Skills that rule each other out: buying this locks each listed skill, and buying any of them locks this one. A skill locked this way names the choice that locked it out. |
| `cost` | [Integer](/docs/datapack/data-types/integer) or [Object](/docs/datapack/data-types/object) | `0` | What buying the skill costs: a number of points, or an object of points (from this tree or any other) and items, each of which can be hidden (see [Costs](#costs)). |
| `reward` | [Integer](/docs/datapack/data-types/integer) or [Object](/docs/datapack/data-types/object) | _none_ | What buying the skill gives on top of its power: points for any tree and items (see [Rewards](#rewards)). `rewards` works too. |
| `placement` | [Array](/docs/datapack/data-types/array) of two [Floats](/docs/datapack/data-types/float), or `{"x", "y"}` | _optional_ | Draws the skill at this spot as the start of its own branch, with no line to its parent (see [Separate branches](#separate-branches)). |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | The sort key among skills with the same `parent`, where lower comes first. Ties are ordered by skill ID. |

Purchased skills can be shift-clicked for a refund as long as no purchased skill depends on them and the tree hasn't set `refundable: false` (see [Skill Tree](/docs/datapack/skill-tree/skill-tree) for the admin commands). A refund gives back exactly what was paid, removes the power and takes back the skill's rewards. If the player no longer has the rewards, because they spent the points or got rid of the items, the refund is refused and the hover card says so.

Each skill's `condition` and `visibility_condition` are evaluated when the skill state is worked out: on join, on purchase, on grant or revoke, and each time the tree screen is opened. They aren't checked every tick.

## Costs

`cost` takes a plain number of points from the skill's own tree, or an object:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `points` | [Integer](/docs/datapack/data-types/integer), a point entry, or an [Array](/docs/datapack/data-types/array) of them | `0` | The points the skill costs. A plain number is taken from the skill's own tree. |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _the skill's tree_ | A shorthand for a single `points` number that takes those points from this tree instead. |
| `items` | Item cost, or an [Array](/docs/datapack/data-types/array) of them | _optional_ | Items taken from the player's inventory. See [Paying with items](#paying-with-items). |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Hides the whole cost, so the hover card only says `Cost: ???`. |

A point entry says how many points to take and from which tree:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` (or `points`) | [Integer](/docs/datapack/data-types/integer) | _required_ | How many points. |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _the skill's tree_ | Which tree's points to spend. Any loaded tree works, even one that is never shown, so a hidden tree can act as a shared currency. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Leaves this entry out of the hover card. |

Several entries for the same tree add up. The purchase only goes through when every tree has enough points.

```json
"cost": {
    "points": 3,
    "skill_tree": "example_pack:mana"
}
```

Three points from the `example_pack:mana` tree, whatever tree the skill is in.

```json
"cost": {
    "points": [
        2,
        { "skill_tree": "example_pack:mana", "amount": 4, "hidden": true }
    ],
    "items": { "item": "minecraft:echo_shard", "hidden": true }
}
```

Two points from the skill's own tree, plus four Mana points and an echo shard that the hover card doesn't reveal.

### Hidden costs

The hover card lists the visible parts of a cost and adds `???` when something is hidden. A cost that is hidden altogether shows `Cost: ???`. When only a hidden part is missing, the card says `You can't pay for this yet` instead of naming it.

### Paying with items

Each item cost uses the fields of an [Item Stack](/docs/datapack/data-types/item-stack) (`item` or `id`, `amount` or `count`, plus `components` on 1.21.1 or `tag` on 1.20.1), with two more:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only stacks that pass this condition count toward the cost. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Leaves this item out of the hover card. |

For a single item, you can leave out `items` and write the item fields straight into `cost`:

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

- A stack matches when it is the same item. If the cost gives `components` (or `tag`), the stack must carry exactly that data, and a cost without data accepts the item whatever its data. `item_condition` narrows the match further.
- Items come from the main inventory, the hotbar and the offhand, never from worn armor.
- The purchase is all or nothing. If any item (or any of the points) is missing, nothing is taken.
- A refund, or a reset with `refund`, gives back exactly the points and stacks that were paid, so an enchanted sword comes back with its enchantments. A reset without a refund doesn't return them. Items that don't fit in the inventory are dropped at the player's feet.

The tooltip lists each visible item, in red while the player doesn't have enough. It doesn't check `item_condition`, so a stack the server rejects on its condition can still show as enough, and the purchase then doesn't go through.

## Rewards

`reward` gives something on top of the power, once, when the skill is bought. It takes a plain number of points for the skill's own tree, or an object:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `points` | [Integer](/docs/datapack/data-types/integer), a point entry, or an [Array](/docs/datapack/data-types/array) of them | _none_ | Points added to a tree. Point entries are the same as for [costs](#costs). |
| `skill_tree` | [Identifier](/docs/datapack/data-types/identifier) | _the skill's tree_ | A shorthand for a single `points` number that gives those points to this tree. |
| `items` | Item, or an [Array](/docs/datapack/data-types/array) of them | _none_ | Items given to the player, using the [Item Stack](/docs/datapack/data-types/item-stack) fields plus `hidden`. Items that don't fit are dropped at the player's feet. A single item can be written straight into `reward`, as with costs. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Hides every reward line, including the names of the granted powers. |

Under Rewards, the hover card lists:

- the display name of each power the skill grants, except the power the skill is defined in (that is already the card's title) and powers marked `hidden`. This matters for skills defined in `skill_trees` files, which can grant several powers;
- each item, as `2× Emerald`;
- each point reward, as `+3 Mana point(s)`, using the tree's `name`, or `+3 point(s)` for the skill's own tree.

Entries marked `hidden` are left out and replaced by `???`, and with `"hidden": true` on the whole reward the card shows `Rewards: ???`.

A skill with a reward but no power can be bought. A skill with neither is still a free node that only connects others.

> [!NOTE]
> A refund takes the rewards back: the points are subtracted and the exact items removed from the inventory. If they are gone, the player has to get them back (or refund the skills they spent the points on) before the refund works. The admin `unbuy` command and a reset with `refund` take back whatever is still there and never refuse.

```json
"reward": {
    "points": { "skill_tree": "example_pack:mana", "amount": 2 },
    "items": [
        { "item": "minecraft:emerald", "count": 3 },
        { "item": "minecraft:totem_of_undying", "hidden": true }
    ]
}
```

Two Mana points, three emeralds, and a totem the hover card keeps secret.

## Separate branches

A skill with `placement` is drawn at that spot instead of next to its parent, with no line leading to it, and becomes the start of its own branch. Its children, the skills that name it as `parent` and have no `placement` of their own, hang off it with the usual lines and layout.

`placement` is `[x, y]` (or `{"x": …, "y": …}`) in skill slots, measured from the tree's root, where one step in `x` is one column to the right and one step in `y` is one row down. Fractions and negative numbers are allowed. Nothing stops two skills from being placed on top of each other, so leave room.

`parent` still decides which tree the skill belongs to and what has to be bought first. Point it at the tree ID for a branch anyone can start, or at another skill to require that skill without drawing a line to it. In that case the hover card names the skill that is needed.

```json
{
	"skill": {
		"parent": "example_pack:parkour_skills",
		"placement": [4, -2],
		"cost": 2
	}
}
```

This starts a branch four columns right and two rows above the tree's root. Skills with `"parent": "<this power's id>"` grow out of it.

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

This skill in a power creates a widget under the `example_pack:parkour_skills` tree that grants the power it is defined in when it is bought for 1 point.
