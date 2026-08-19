---
title: "If Else List (Meta Action Type)"
description: "Checks a list of actions associated with conditions, and executes the first one whose condition holds."
navigation_title: "If Else List"
---

Checks a list of actions associated with conditions, and executes the **first** one whose condition holds. A less indentation-heavy way to write a deeply nested [apoli:if_else](/docs/datapack/meta-actions/if_else) chain.

Type ID: `apoli:if_else_list`

> **Only one branch ever runs.** Conditions are tested top to bottom and the list stops at the first match, exactly like an `if / else if / else if` chain — later branches are not evaluated at all. Order your branches from most specific to least: with three `apoli:health` branches at `>= 6`, `>= 12` and `>= 18`, a full-health entity still only takes the `>= 6` one, because that is the first that matches.

> To run several actions unconditionally, use [apoli:and](/docs/datapack/meta-actions/and). To run **every** matching branch instead of just the first, use [apoli:if_case](/docs/datapack/meta-actions/if_case) — it takes the same list under `cases` (and still accepts `actions`), so switching between the two is a one-word change.

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

This example will apply a stronger Speed status effect the lower the entity's health is, in three stages (&lt;= 3 hearts, &lt;= 6 hearts or &lt;= 9 hearts). The branches are ordered lowest-threshold first, so an entity on 2 hearts matches the `<= 6` branch and stops there — it does not also get the weaker two.
