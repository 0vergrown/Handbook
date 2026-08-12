---
title: "If Else List (Meta Action Type)"
description: "Checks a list of actions associated with conditions, and executes every one whose condition holds."
navigation_title: "If Else List"
---

Checks a list of actions associated with conditions, and executes **every** one whose condition holds — not just the first. Basically a less indentation-heavy way to represent a deeply nested [apoli:if_else](/docs/datapack/meta-actions/if_else), except that more than one branch may fire in a single run.

Type ID: `apoli:if_else_list`

> **Every condition is evaluated before any action runs.** Each branch is tested against the state as it was when the list started, so an earlier branch's action cannot make a later branch's condition start matching. Without that, a list whose branches read a resource its own actions write would cascade straight down the whole list in one tick.

> Depending on the condition type, a different action type is expected:
> 
> Action Type | Condition Type
> ------------|----------------
> Bi-entity Action Type | Bi-entity Condition Type
> Entity Action Type | Entity Condition Type
> Block Action Type | Block Condition Type
> Item Action Type | Item Condition Type

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`actions` | [Array](/docs/datapack/data-types/array) of Objects (Data Type) | | Each object has to have an `action` Action Type object and a `condition` Condition Type object.

## Examples

```json
"entity_action": {
	"type": "apoli:if_else_list",
	"actions": [
		{
			"condition": {
				"type": "apoli:health",
				"comparison": "<=",
				"compare_to": 6
			},
			"action": {
				"type": "apoli:apply_effect",
				"effect": {
					"effect": "minecraft:speed",
					"amplifier": 2,
					"duration": 80
				}
			}
		},
		{
			"condition": {
				"type": "apoli:health",
				"comparison": "<=",
				"compare_to": 12
			},
			"action": {
				"type": "apoli:apply_effect",
				"effect": {
					"effect": "minecraft:speed",
					"amplifier": 1,
					"duration": 80
				}
			}
		},
		{
			"condition": {
				"type": "apoli:health",
				"comparison": "<=",
				"compare_to": 18
			},
			"action": {
				"type": "apoli:apply_effect",
				"effect": {
					"effect": "minecraft:speed",
					"amplifier": 0,
					"duration": 80
				}
			}
		}
	]
}
```

This example will apply a stronger Speed status effect the lower the entity's health is, in three stages (&lt;= 3 hearts, &lt;= 6 hearts or &lt;= 9 hearts).
