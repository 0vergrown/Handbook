---
title: "If Else List (Meta Action Type)"
description: "Goes through a list of actions with conditions and runs the first one whose condition holds."
navigation_title: "If Else List"
---

Goes through a list of actions with conditions and runs the first one whose condition holds. It is a flatter way to write a deeply nested [apoli:if_else](/docs/datapack/meta-actions/if_else) chain.

Type ID: `apoli:if_else_list`

> [!IMPORTANT]
> Only one branch ever runs. Conditions are tested top to bottom and the list stops at the first match, exactly like an `if / else if / else if` chain, so later branches aren't evaluated at all. Order your branches from most specific to least. With three `apoli:health` branches at `>= 6`, `>= 12` and `>= 18`, an entity at full health still only takes the `>= 6` one, because that is the first that matches.

> [!TIP]
> To run several actions unconditionally, use [apoli:and](/docs/datapack/meta-actions/and). To run every matching branch instead of only the first, use [apoli:if_case](/docs/datapack/meta-actions/if_case). It takes the same list under `cases` (and still accepts `actions`), so switching between the two is a one-word change.

> [!NOTE]
> The kind of action each branch takes depends on the kind of condition:
>
> | Action type | Condition type |
> | --- | --- |
> | Bi-entity Action Type | Bi-entity Condition Type |
> | Entity Action Type | Entity Condition Type |
> | Block Action Type | Block Condition Type |
> | Item Action Type | Item Condition Type |

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | [Array](/docs/datapack/data-types/array) of objects | _required_ | Each object needs an `action` and a `condition`. |

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

This gives a stronger Speed effect the lower the entity's health is, in three stages: at most 3 hearts, at most 6 hearts or at most 9 hearts. The branches start with the lowest threshold, so an entity on 2 hearts matches the `<= 6` branch and stops there, without also getting the two weaker ones.
