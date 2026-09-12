---
title: "Multiple (Power Type)"
description: "Allows for defining more than one power in a single file."
navigation_title: "Multiple"
---

Allows for defining more than one power in a single file.

Type ID: `apoli:multiple`

> The sub-powers are automatically hidden. When the super-power (where the `apoli:multiple` power type is used) is added to the entity, all sub-powers are added automatically.
> 
> You can reference sub-powers by using the ID of the super-power and the ID of the sub-power, split by an underscore (`_`). (e.g: `namespace:super-power_sub-power`)
> 
> Inside a sub-power, `*:*` expands to the **super-power's** id, which is why `"*:*_set"` in the example below names the `set` sub-power. `*` on its own in the namespace position — `"*:some/other_power"` — expands to just the file's namespace, so it works for referring to any power in your pack, in any folder. See [Identifier](/docs/datapack/data-types/identifier).
> 
> If you wish to check for an entity condition for the entire super-power, you would have to check for the said entity condition in every sub-power of the super-power.
> 
> `/reload` reconciles what an entity is already holding: a sub-power you add to the file is granted to everyone who already has the super-power, and one you delete is revoked from them. You do not have to re-grant the super-power.

## Fields

Arbitrary fields. Any "key", except for `type`, `loading_priority`, `name`, `description`, `hidden`, `condition`, `tags`, `skill`, `sub_powers` and `load_condition`, is considered a sub-power and takes a fully-defined power type as the value.

Those reserved fields belong to the bundle itself, not to its sub-powers — `tags` on an `apoli:multiple` tags the **bundle**, so [`apoli:store_power`](/docs/datapack/entity-actions/store_power) and anything else that selects powers by tag picks up the whole thing rather than one piece of it. A field that is neither reserved nor an object cannot be a sub-power, and Apoli logs one line naming it at load rather than ignoring it silently.

Each sub-power takes its own [`load_condition`](/docs/datapack/introduction/powers#gating-a-power-at-load-time), checked before that sub-power is parsed — a sub-power that is gated off is left out of the bundle entirely. A `load_condition` on the `apoli:multiple` itself gates every sub-power with it.

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
