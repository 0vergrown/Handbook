---
title: "If Case (Meta Action Type)"
description: "Checks a list of actions associated with conditions, and executes every one whose condition holds."
navigation_title: "If Case"
---

Checks a list of actions associated with conditions, and executes **every** one whose condition holds. The multi-fire counterpart to [apoli:if_else_list](/docs/datapack/meta-actions/if_else_list), which stops at the first match.

Type ID: `apoli:if_case`

> **Every matching case runs.** All conditions are evaluated first, against the state as it was when the action started; then every case that matched runs, top to bottom. Snapshotting matters: an earlier case that heals the entity cannot switch on or off a later case that tests health.

> Use `apoli:if_case` when the cases are independent ("apply each effect that currently applies"), and [apoli:if_else_list](/docs/datapack/meta-actions/if_else_list) when they are a ladder ("pick the first tier that fits").

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
`cases` | [Array](/docs/datapack/data-types/array) of Objects (Data Type) | | Each object has to have an `action` Action Type object and a `condition` Condition Type object. `actions` is accepted as a legacy spelling, so an `apoli:if_else_list` block can be switched over by changing only the `type`.

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

An entity that is both on fire and underwater gets extinguished **and** gains Water Breathing. With `apoli:if_else_list` it would only be extinguished.
