---
title: "apoli:chance"
description: "Generates a random number between 0.0 and 1.0 and checks if it's less than a specified value."
---

Generates a random number between 0.0 and 1.0 and checks if it's less than a specified value.

Type ID: `apoli:chance`


##	Fields

Field | Type | Default | Description
------|------|---------|------------
`chance` | [Float](/docs/datapack/data-types/float) | | The value to compare the randomly generated number to.


##	Examples

```json
"condition": {
	"type": "apoli:chance",
	"chance": 0.5
}
```

This example will evaluate to true 50% of the time.

