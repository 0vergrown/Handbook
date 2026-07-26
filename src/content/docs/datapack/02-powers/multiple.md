---
title: "apoli:multiple"
description: "Allows for defining more than one power in a single file."
---

Allows for defining more than one power in a single file.

Type ID: `apoli:multiple`

> The sub-powers are automatically hidden. When the super-power (where the `apoli:multiple` power type is used) is added to the entity, all sub-powers are added automatically.
> 
> You can reference sub-powers by using the ID of the super-power and the ID of the sub-power, split by an underscore (`_`). (e.g: `namespace:super-power_sub-power`)
> 
> If you wish to check for an entity condition for the entire super-power, you would have to check for the said entity condition in every sub-power of the super-power.


## Fields

Arbitrary fields. Any "key", except for `type`, `loading_priority`, `name`, `description`, `hidden`, `condition`, is considered a sub-power and takes a fully-defined power type as the value.

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
