---
title: "Action On Key Press (Power Type)"
description: "Executes an Entity Action Type on the entity that has the power upon pressing the specified Key."
navigation_title: "Action On Key Press"
aliases: ["active_self"]
---

Executes an Entity Action Type on the entity that has the power upon pressing the specified [Key](/docs/datapack/data-types/key).

Type ID: `apoli:action_on_key_press` (but can use it's old `active_self` type id as an alias)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | | The action to execute on the player.
`cooldown` | [Integer](/docs/datapack/data-types/integer) | `1` | Interval of ticks this power needs to recharge before the power can be triggered again.
`hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | Determines how the cooldown of this power is visualized on the HUD.
`key` | [Key](/docs/datapack/data-types/key) | `{"key": "key.apoli.primary_active"}` | Which active key this power should respond to.

## Examples

```json
{
	"type": "apoli:action_on_key_press",
	"entity_action": {
		"type": "apoli:if_else",
		"condition": {
	    	"type": "apoli:on_fire"
    	},
    	"if_action": {
    		"type": "apoli:extinguish"
    	},
    	"else_action": {
    		"type": "apoli:set_on_fire",
    		"duration": 8
    	}
  	},
  	"cooldown": 20,
  	"hud_render": {
    	"should_render": false
  	}
}
```

This example will set the player on fire for 8 seconds, or extinguish themselves if they're already on fire upon pressing the Primary ability key.

```json
{
	"type": "apoli:active_self",
	"entity_action": {
		"type": "apoli:and",
		"actions": [
			{
				"type": "apoli:equipped_item_action",
				"equipment_slot": "mainhand",
				"action": {
					"type": "apoli:consume",
					"amount": 1
				}
			},
			{
				"type": "apoli:apply_effect",
				"effect": {
					"effect": "minecraft:speed",
					"duration": 100,
					"amplifier": 1,
					"is_ambient": true,
					"show_particles": true,
					"show_icon": true
				}
			}
		]
	},
	"cooldown": 1,
	"hud_render": {
		"should_render": false
	},
	"key": {
		"key": "key.use",
		"continuous": true
	},
	"condition": {
		"type": "apoli:equipped_item",
		"equipment_slot": "mainhand",
		"item_condition": {
			"type": "apoli:ingredient",
			"ingredient": {
				"item": "minecraft:sugar"
			}
		}
	}
}
```

This example will allow the player that has the power to essentially consume a Sugar item if the player is holding a Sugar item, which would then apply a Speed II status effect that would last for 5 seconds upon pressing the `key.use` keybind. (The example is bound to the `key.use` keybind.)
