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
`entity_action_released` | Entity Action Type | _optional_ | Runs when the key is let go after a press that fired `entity_action`. See [Acting on release](#acting-on-release).
`cooldown` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | Interval of ticks this power needs to recharge before the power can be triggered again.
`hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | `{"should_render": false}` | Determines how the cooldown of this power is visualized on the HUD.
`key` | [Key](/docs/datapack/data-types/key) | `{"key": "key.apoli.primary_active"}` | Which active key this power should respond to.

> `cooldown` is evaluated at the moment the power fires, on the holder — so `"cooldown": "20 - mypack:haste * 2"` shortens the recharge as a resource grows. The HUD bar and the [apoli:resource](/docs/datapack/entity-conditions/resource) `max` read the same expression, so both follow the current value.

## Acting on release

With `entity_action_released`, every press that fires `entity_action` is followed by exactly one release action when the key comes back up. While it runs, the [Expression](/docs/datapack/data-types/expression) variable `held_ticks` is the number of ticks the key was held, so a charged ability can scale with how long it was charged:

```json
{
    "type": "apoli:action_on_key_press",
    "key": "key.apoli.primary_active",
    "cooldown": 40,
    "entity_action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:slowness",
            "duration": 200,
            "amplifier": 2
        }
    },
    "entity_action_released": {
        "type": "apoli:and",
        "actions": [
            {
                "type": "apoli:clear_effect",
                "effect": "minecraft:slowness"
            },
            {
                "type": "apoli:add_velocity",
                "z": "min(held_ticks, 40) / 20",
                "space": "local"
            }
        ]
    }
}
```

Pressing the key slows the player while they charge; letting go clears the slowness and launches them forward, further the longer they held it, up to two seconds.

- The release only follows a press that went through. A press blocked by the cooldown, the power's `condition` or a [prevent_key_press](/docs/datapack/powers/prevent_key_press) has no release.
- The power's `condition` is not checked again on release, so the release can always undo what the press started. A release does not run if the power was removed or suppressed in between.
- A `"continuous": true` key fires `entity_action` every tick it is held but releases once, and `held_ticks` counts from the first press.
- Opening a screen while holding the key counts as letting go.
- A forced press ([apoli:force_key_pressed](/docs/datapack/entity-actions/force_key_pressed) or the `/apoli:key press` command) releases when its duration runs out, on players and on mobs alike. A power activated directly, as [apoli:run_stored_power](/docs/datapack/entity-actions/run_stored_power) does, releases straight away with `held_ticks` at `0`.

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
