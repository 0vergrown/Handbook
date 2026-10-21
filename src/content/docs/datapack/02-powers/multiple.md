---
title: "Multiple (Power Type)"
description: "Defines several powers in a single file."
navigation_title: "Multiple"
---

Defines several powers in a single file.

Type ID: `apoli:multiple`

The sub-powers are hidden automatically. When the entity gets the main power (the one using `apoli:multiple`), it gets all of the sub-powers with it.

To refer to a sub-power, join the ID of the main power and the key of the sub-power with an underscore (`_`), for example `namespace:main-power_sub-power`.

Inside a sub-power, `*:*` expands to the main power's ID, which is why `"*:*_set"` in the example below names the `set` sub-power. `*` on its own in the namespace position, as in `"*:some/other_power"`, expands to just the file's namespace, so it can refer to any power in your pack, in any folder. See [Identifier](/docs/datapack/data-types/identifier).

To check an entity condition for the whole bundle, put that condition in every sub-power.

`/reload` updates what entities already have. A sub-power you add to the file is granted to everyone who already has the main power, and one you delete is revoked from them, so you don't have to grant the main power again.

> [!WARNING]
> An `apoli:multiple` counts every power held under its own ID as one of its sub-powers. A power granted to the same entity with the bundle's ID as its `source` is revoked again within a tick, so give those grants a source of their own (see [apoli:grant_power](/docs/datapack/entity-actions/grant_power#choosing-a-source)).

## Fields

Any key except `type`, `loading_priority`, `name`, `description`, `hidden`, `condition`, `tags`, `skill`, `sub_powers` and `load_condition` is a sub-power, and takes a complete power as its value.

The reserved fields belong to the bundle itself, not to its sub-powers. `tags` on an `apoli:multiple` tags the whole bundle, so [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and anything else that selects powers by tag picks up all of it, not one piece. A field that is neither reserved nor an object can't be a sub-power, and Apoli logs one line naming it at load instead of ignoring it.

An entry with `"type": "apoli:macro"` defines a [macro](/docs/datapack/introduction/macros) instead of a sub-power. It is named the way a sub-power would be (`namespace:main-power_key`), any power in the pack can use it, and it is left out of the bundle. With a `macro` field, the entry is a macro call instead, and becomes the sub-power the macro expands to.

Each sub-power takes its own [`load_condition`](/docs/datapack/introduction/powers#skipping-a-power-at-load-time), checked before that sub-power is parsed. A sub-power whose `load_condition` fails is left out of the bundle entirely. A `load_condition` on the `apoli:multiple` itself applies to every sub-power.

## Examples

```json
{
	"type": "apoli:multiple",
	"set": {
		"type": "apoli:entity_set"
	},
	"give_apples": {
		"type": "apoli:action_on_entity_use",
		"bientity_condition": {
			"type": "apoli:and",
			"conditions": [
				{
					"type": "apoli:actor_condition",
					"condition": {
						"type": "apoli:entity_set_size",
						"set": "*:*_set",
						"comparison": "<",
						"compare_to": 3
					}
				},
				{
					"type": "apoli:in_entity_set",
					"set": "*:*_set",
					"inverted": true
				},
				{
					"type": "apoli:target_condition",
					"condition": {
						"type": "apoli:entity_type",
						"entity_type": "minecraft:zombie"
					}
				}
			]
		},
		"bientity_action": {
			"type": "apoli:add_to_entity_set",
			"set": "*:*_set"
		},
		"item_condition": {
			"type": "apoli:ingredient",
			"ingredient": {
				"item": "minecraft:apple"
			}
		},
		"held_item_action": {
			"type": "apoli:consume"
		}
	},
	"give_stick": {
		"type": "apoli:action_on_entity_use",
		"bientity_condition": {
			"type": "apoli:and",
			"conditions": [
				{
					"type": "apoli:in_entity_set",
					"set": "*:*_set"
				},
				{
					"type": "apoli:target_condition",
					"condition": {
						"type": "apoli:entity_type",
						"entity_type": "minecraft:zombie"
					}
				}
			]
		},
		"bientity_action": {
			"type": "apoli:remove_from_entity_set",
			"set": "*:*_set"
		},
		"item_condition": {
			"type": "apoli:ingredient",
			"ingredient": {
				"item": "minecraft:stick"
			}
		},
		"held_item_action": {
			"type": "apoli:consume"
		}
	},
	"no_damage_dealt": {
		"type": "apoli:modify_damage_dealt",
		"modifier": {
			"operation": "multiply_total_multiplicative",
			"amount": -1
		},
		"bientity_condition": {
			"type": "apoli:in_entity_set",
			"set": "*:*_set"
		}
	},
	"no_damage_taken": {
		"type": "apoli:modify_damage_taken",
		"modifier": {
			"operation": "multiply_total_multiplicative",
			"amount": -1
		},
		"bientity_condition": {
			"type": "apoli:invert",
			"condition": {
				"type": "apoli:in_entity_set",
				"set": "*:*_set"
			}
		}
	}
}
```

This bundle keeps up to three zombies in an entity set. Right-clicking a zombie with an apple adds it to the set, and right-clicking it with a stick removes it. The last two sub-powers use the set to cancel damage.
