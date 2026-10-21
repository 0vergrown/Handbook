---
title: "If Case (Meta Action Type)"
description: "Goes through a list of actions with conditions and runs every one whose condition holds."
navigation_title: "If Case"
---

Goes through a list of actions with conditions and runs every one whose condition holds. It is the counterpart to [apoli:if_else_list](/docs/datapack/meta-actions/if_else_list), which stops at the first match.

Type ID: `apoli:if_case`

> [!IMPORTANT]
> Every matching case runs. All conditions are evaluated first, against the state as it was when the action started, and then every case that matched runs, top to bottom. Because of that snapshot, an earlier case that heals the entity can't switch a later case that tests health on or off.

> [!TIP]
> Use `apoli:if_case` when the cases are independent, such as applying each effect that currently applies, and [apoli:if_else_list](/docs/datapack/meta-actions/if_else_list) when they form a ladder, such as picking the first tier that fits.

> [!NOTE]
> The kind of action each case takes depends on the kind of condition:
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
| `cases` | [Array](/docs/datapack/data-types/array) of objects | _required_ | Each object needs an `action` and a `condition`. `actions` is accepted as a legacy spelling, so an `apoli:if_else_list` block can be switched over by changing only the `type`. |

## Examples

```json
"entity_action": {
	"type": "apoli:if_case",
	"cases": [
		{
			"condition": {
				"type": "apoli:on_fire"
			},
			"action": {
				"type": "apoli:extinguish"
			}
		},
		{
			"condition": {
				"type": "apoli:submerged_in",
				"fluid": "minecraft:water"
			},
			"action": {
				"type": "apoli:apply_effect",
				"effect": {
					"effect": "minecraft:water_breathing",
					"duration": 100
				}
			}
		}
	]
}
```

An entity that is both on fire and underwater gets extinguished and gains Water Breathing. With `apoli:if_else_list` it would only be extinguished.
