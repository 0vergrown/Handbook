---
title: "Chance (Meta Condition Type)"
description: "Passes with a given probability, by rolling a random number from 0 to 1."
navigation_title: "Chance"
---

Rolls a random number between 0.0 and 1.0 and passes if it is less than a given value.

Type ID: `apoli:chance`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `chance` | [Float](/docs/datapack/data-types/float) | _required_ | The value the random number is compared with. |

## Examples

```json
"condition": {
	"type": "apoli:chance",
	"chance": 0.5
}
```

This passes 50% of the time.
