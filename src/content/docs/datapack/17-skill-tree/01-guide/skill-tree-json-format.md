---
title: "Skill Tree JSON Format"
description: "The format of a JSON file that defines a skill tree, in the skill_trees folder of your namespace."
---

The format of a JSON file that defines a skill tree, placed in the `skill_trees` folder of your namespace (`data/<namespace>/skill_trees/<name>.json`). A skill tree file only defines the tree itself: its tab, its background and the powers every holder of the tree gets by default. The skills that appear in the tree aren't defined here. Each skill lives in the power file it unlocks, through [Skill Tree Power Data](/docs/datapack/skill-tree/skill-tree-power-data), the same way Origins badges live on their powers.

> [!NOTE]
> By default (`auto_grant: true`) every player has the tree. Set `auto_grant: false` to hide it until it is granted with [Grant Skill Tree (Entity Action Type)](/docs/datapack/skill-tree/grant_skill_tree) from an origin's power, an item, another power's action or anything else that runs entity actions. [Revoke Skill Tree (Entity Action Type)](/docs/datapack/skill-tree/revoke_skill_tree) takes it away again, and purchased skills are remembered and come back if the tree is granted again. Grants are stored per player and only change through those actions, so no condition is checked every tick. A tree can also carry a `condition` for the cases a stored grant can't express (see [Tying a tree to an origin](#tying-a-tree-to-an-origin)).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | [Text Component](/docs/datapack/data-types/text-component) | _empty_ | The display name of the tree's tab. |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | _empty_ | The description of the tree's tab. |
| `icon` | [Icon](/docs/datapack/data-types/icon) | `{"item": "minecraft:grass_block"}` | The item or texture shown as the tree's tab icon. |
| `frame` | `task`, `goal` or `challenge` | `task` | The border drawn around the tree's tab icon, matching the advancement frames. |
| `background` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The texture used as the background of the tree screen. |
| `default_powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Powers granted to every player who has the tree, such as a power that earns points. They are removed when the tree is revoked. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | The tab's position among trees. Lower values come first, and ties are ordered by tree ID. |
| `auto_grant` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, every player has this tree automatically, and revoking it has no lasting effect. With `false`, the tree is hidden until the grant action gives it. |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | When set, the tree only counts for players who pass it (see [Tying a tree to an origin](#tying-a-tree-to-an-origin)). |
| `refundable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, players can shift-click a purchased skill in the tree screen to undo the purchase. The power is removed and its point cost returned, as long as no purchased skill depends on it. Set it to `false` to make purchases permanent. Admins can still use `unbuy` through the [`/apoli:skill_tree` command](/docs/datapack/commands/skill-tree). |

## Tying a tree to an origin

`auto_grant` and the grant and revoke actions are stored state, so once a player has a tree, they keep it until something takes it away. `condition` is the live part. A tree whose condition is false still remembers everything the player bought, but none of its powers apply and its tab is hidden. When the condition becomes true again, the purchases come straight back.

That is what ties a tree to an origin, so its skills don't follow the player into their next origin:

```json
{
	"name": "Pyromancy",
	"condition": {
		"type": "origins:origin",
		"layer": "origins:origin",
		"origin": "my_pack:ember"
	}
}
```

A tree with no `condition` is global, and every player keeps its powers through any number of origin changes, which is what you want for something like a progression tree for the whole server.

> [!WARNING]
> The condition is checked again whenever Origins reconciles a player's origins (on join, on a data pack reload, with an orb and on every origin choice), not every tick. A condition on something that changes all the time, like health or the time of day, won't follow it in real time, so base it on an origin, an advancement or a power instead.

## Tree file or skill file?

A file in `skill_trees/` is read as a skill, not a tree, when it has a `parent` field. That one field is the whole difference:

| The file has | It is |
| --- | --- |
| no `parent` | a tree, and the fields above apply |
| a `parent` | a skill inside a tree |

So a pack can define its skills in either of two ways:

- inside the power file, through [Skill Tree Power Data](/docs/datapack/skill-tree/skill-tree-power-data), where the power is the skill
- as its own file in `skill_trees/`, naming the powers it unlocks

Both end up in the same tree and behave the same. Skills defined in power data win if both define the same ID.

### Skill file fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `parent` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The tree, or another skill, this one hangs off. |
| `power` / `powers` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | _none_ | The powers buying this skill grants. |
| `name` | [Text Component](/docs/datapack/data-types/text-component) | `skill.<ns>.<path>.name` | The display name. |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | `skill.<ns>.<path>.description` | The display description. |
| `icon` | [Icon](/docs/datapack/data-types/icon) | `{"item": "minecraft:grass_block"}` | The node's icon: an item ID, an item stack or a `texture`. |
| `frame` | `task`, `goal` or `challenge` | `task` | The border drawn around the node, matching the advancement frames. |
| `cost` | [Integer](/docs/datapack/data-types/integer) or [Object](/docs/datapack/data-types/object) | `0` | What buying it costs: points from any tree and items, as described in [Costs](/docs/datapack/skill-tree/skill-tree-power-data#costs). |
| `reward` | [Integer](/docs/datapack/data-types/integer) or [Object](/docs/datapack/data-types/object) | _none_ | Points and items given when it is bought, as described in [Rewards](/docs/datapack/skill-tree/skill-tree-power-data#rewards). `rewards` works too. |
| `placement` | [Array](/docs/datapack/data-types/array) of two [Floats](/docs/datapack/data-types/float), or `{"x", "y"}` | _optional_ | Draws the skill at this spot as the start of its own branch, as described in [Separate branches](/docs/datapack/skill-tree/skill-tree-power-data#separate-branches). |
| `excludes` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Skills that can't be bought once this one is, and the other way round. |
| `condition` | [Entity Condition](/docs/datapack/introduction/conditions) | _optional_ | Must pass before the skill can be bought. |
| `visibility_condition` | [Entity Condition](/docs/datapack/introduction/conditions) | _optional_ | Must pass for the node to appear at all. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | The sort order among siblings. Ties are ordered by skill ID. |

A skill with no `power` or `powers` and no `reward` is a free node that only connects others. It can't be bought, and its children treat it as already done. Use it to branch a tree without charging for the branch point. A skill with a `reward` but no power can be bought like any other.

The hover card of a skill file lists the powers it grants by name, under Rewards, unless a power is marked `hidden` or the reward is hidden.

```json
{
   "parent":"example_pack:parkour_skills",
   "power":"example_pack:double_jump",
   "icon":{
      "item":"minecraft:feather"
   },
   "cost":2,
   "condition":{
      "type":"apoli:advancement",
      "advancement":"example_pack:learned_to_jump"
   }
}
```

> [!WARNING]
> Every skill's `parent` chain must end at a tree file. A skill whose chain never reaches one is dropped with a warning naming the file, and it doesn't show up anywhere.

## Example

```json
{
	"name": "Parkour Skills",
	"description": "A skill tree that lets you earn parkour skills",
	"icon": {
		"item": "minecraft:stick"
	},
	"default_powers": [
		"example_pack:gain_points"
	],
	"auto_grant": false
}
```

This tree (`example_pack:parkour_skills`) stays hidden until something runs:

```json
{
    "type": "apoli:grant_skill_tree",
    "skill_tree": "example_pack:parkour_skills"
}
```

A skill is then attached to the tree from inside its power file:

```json
{
   "type":"apoli:multiple",
   "skill":{
      "parent":"example_pack:parkour_skills",
      "icon":{
         "item":"minecraft:feather"
      },
      "cost":2
   }
}
```

## Screen controls

- Drag with the left mouse button to move around the tree.
- The mouse wheel zooms out and in (down to 25%), centred on the window. Hovering a node always shows a full size info card, so small nodes stay readable while zoomed out. When the whole tree fits in the window, it stays centred.
- Opening the screen asks the server for a fresh skill state, so each skill's conditions are up to date the moment it opens. An open screen also refreshes whenever the server sends a new state.
