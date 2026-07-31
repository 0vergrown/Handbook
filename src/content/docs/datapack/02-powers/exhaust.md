---
title: "Exhaust (Power Type)"
description: "Applies exhaustion to the player over time."
navigation_title: "Exhaust"
---

Applies exhaustion to the player over time.

Type ID: `apoli:exhaust`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`interval` | Integer | `20` | Duration of ticks to wait between applying exhaustion.
`exhaustion` | Float | | How much exhaustion will be applied each interval.

## Examples

```json
{
  	"type": "apoli:exhaust",
  	"interval": 20,
  	"exhaustion": 4.0,
	"condition": {
		"type": "apoli:fluid_height",
		"fluid": "minecraft:water",
		"comparison": ">",
		"compare_to": 0.0
	}
}
```

This example will apply 4.0 exhaustion to the player if the player is touching water.
