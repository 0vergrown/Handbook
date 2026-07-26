---
title: "Skill Tree JSON Format"
description: "The format of a JSON file that defines a skill tree, placed in the skilltrees folder of your namespace (data/<namespace>/skilltrees/<name>.json)."
---

The format of a JSON file that **defines a skill tree**, placed in the `skill_trees` folder of your namespace (`data/<namespace>/skill_trees/<name>.json`). A skill tree file only defines the tree itself. Its tab, background, and the powers every holder of the tree gets by default. The individual skills that appear in the tree are **not** defined here; each skill lives in the power file it unlocks, via [Skill Tree Power Data](/docs/datapack/skill-tree/skill-tree-power-data) (the same way Origins badges live on their powers).

> **How a tree reaches a player:** by default (`auto_grant: true`) every player has the tree. Set `auto_grant: false` to hide it until it is explicitly granted with **[apoli:grant_skill_tree](/docs/datapack/skill-tree/grant_skill_tree)** from an origin's power, an item, another power's action, or any other entity-action source. **[apoli:revoke_skill_tree](/docs/datapack/skill-tree/revoke_skill_tree)** takes it away again (purchased skills are remembered and come back if the tree is re-granted). Because grants are stored per player and only change on those actions, there is **no per-tick condition checking** for tree visibility anymore.

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

Skill-only fields (`parent`, `power`/`powers`, `cost`, `excludes`, `condition`, `visibility_condition`) are **not valid here** anymore, the loader logs a warning and ignores them. Move those onto the powers via Skill Tree Power Data.

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
	"type": "apoli:multiple",
	"skill": {
		"parent": "example_pack:parkour_skills",
		"icon": { "item": "minecraft:feather" },
		"cost": 2
	}
}
```

## Screen controls

- **Drag** with the left mouse button to pan the tree.
- **Mouse wheel** zooms out/in (down to 25%), centered on the window. Hovering a node always pops a full-size info card, so small nodes stay readable while zoomed out. When the whole tree fits in the window it stays centered.
- Opening the screen requests a fresh skill state from the server, so per-skill conditions are up to date the moment it opens (an open screen also refreshes live whenever the server pushes a new state).
