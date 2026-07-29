---
title: "Skill Tree JSON Format"
description: "The format of a JSON file that defines a skill tree, placed in the skilltrees folder of your namespace (data/<namespace>/skill_trees/<name>.json)."
---

The format of a JSON file that **defines a skill tree**, placed in the `skill_trees` folder of your namespace (`data/<namespace>/skill_trees/<name>.json`). A skill tree file only defines the tree itself. Its tab, background, and the powers every holder of the tree gets by default. The individual skills that appear in the tree are **not** defined here; each skill lives in the power file it unlocks, via [Skill Tree Power Data](/docs/datapack/skill-tree/skill-tree-power-data) (the same way Origins badges live on their powers).

> **How a tree reaches a player:** by default (`auto_grant: true`) every player has the tree. Set `auto_grant: false` to hide it until it is explicitly granted with **[Grant Skill Tree (Entity Action Type)](/docs/datapack/skill-tree/grant_skill_tree)** from an origin's power, an item, another power's action, or any other entity-action source. **[Revoke Skill Tree (Entity Action Type)](/docs/datapack/skill-tree/revoke_skill_tree)** takes it away again (purchased skills are remembered and come back if the tree is re-granted). Because grants are stored per player and only change on those actions, there is **no per-tick condition checking** for tree visibility anymore.

## Fields

| Field            | Type                                        | Default                             | Description                                                                                                                                                                                                                                                                                        |             |
|------------------|---------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `name`           | [Text Component](/docs/datapack/data-types/text-component)                  | _empty_                             | The display name of the tree's tab.                                                                                                                                                                                                                                                                |             |
| `description`    | [Text Component](/docs/datapack/data-types/text-component)                  | _empty_                             | The description of the tree's tab.                                                                                                                                                                                                                                                                 |             |
| `icon`           | Item Stack (Data Types)                     | `{"item": "minecraft:grass_block"}` | The item shown as the tree's tab icon.                                                                                                                                                                                                                                                             |             |
| `background`     | [Identifier](/docs/datapack/data-types/identifier)                      | _optional_                          | The texture used as the background of the tree screen.                                                                                                                                                                                                                                             |             |
| `default_powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_                          | Powers granted to every player who has the tree (e.g. a point-earning power). Removed when the tree is revoked.                                                                                                                                                                                    |             |
| `order`          | [Integer](/docs/datapack/data-types/integer)                         | `0`                                 | Tab order among trees — lower values come first; ties keep load order.                                                                                                                                                                                                                             |             |
| `auto_grant`     | [Boolean](/docs/datapack/data-types/boolean)                         | `true`                              | If `true`, every player automatically has this tree (revoking has no lasting effect). If `false`, the tree is hidden until granted via the grant action.                                                                                                                                           |             |
| `refundable`     | [Boolean](/docs/datapack/data-types/boolean)                         | `true`                              | If `true`, players can shift-click a purchased skill in the tree screen to un-buy it — the power is removed and its point cost returned (only allowed while no purchased skill depends on it). Set `false` to make purchases permanent (admins can still `unbuy` via the [Skill Tree](/docs/datapack/skill-tree/skill-tree). |             |

## Tree file or skill file?

A file in `skill_trees/` is read as a **skill** — not a tree — when it has a `parent` field. That one field is the whole distinction:

| The file has… | It is… |
|---------------|--------|
| no `parent` | a tree; the fields above apply |
| a `parent` | a skill inside a tree |

So a pack can define its skills either way:

- inside the power file, via [Skill Tree Power Data](/docs/datapack/skill-tree/skill-tree-power-data) — the power *is* the skill
- as its own file in `skill_trees/`, naming the power(s) it unlocks

Both end up in the same tree and behave identically. Power-data skills win if both define the same id.

### Skill file fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `parent` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The tree, or another skill, this one hangs off. |
| `power` / `powers` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | _none_ | The power(s) buying this skill grants. |
| `name` | [Text Component](/docs/datapack/data-types/text-component) | `skill.<ns>.<path>.name` | Display name. |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | `skill.<ns>.<path>.description` | Display description. |
| `icon` | Item Stack | `{"item": "minecraft:grass_block"}` | Node icon. |
| `cost` | [Integer](/docs/datapack/data-types/integer) | `0` | Points needed to buy it. |
| `excludes` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | `[]` | Skills that become unbuyable once this one is bought, and vice versa. |
| `condition` | [Entity Condition](/docs/datapack/introduction/conditions) | _optional_ | Must pass before the skill can be bought. |
| `visibility_condition` | [Entity Condition](/docs/datapack/introduction/conditions) | _optional_ | Must pass for the node to appear at all. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | Sort order among siblings. |

A skill with **no** `power`/`powers` is a free pass-through node: it can't be bought, and its children treat it as already satisfied. Use it to branch a tree without charging for the branch point.

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

> Every skill's `parent` chain must end at a tree file. A skill whose chain never reaches one is dropped with a warning naming the file — it will not show up anywhere.


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

- **Drag** with the left mouse button to pan the tree.
- **Mouse wheel** zooms out/in (down to 25%), centered on the window. Hovering a node always pops a full-size info card, so small nodes stay readable while zoomed out. When the whole tree fits in the window it stays centered.
- Opening the screen requests a fresh skill state from the server, so per-skill conditions are up to date the moment it opens (an open screen also refreshes live whenever the server pushes a new state).
