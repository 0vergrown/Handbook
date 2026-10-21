---
title: "Object (Data Type)"
description: "A piece of data made of several named fields, in curly braces."
navigation_title: "Object"
---

A piece of data made of several fields. Objects are enclosed in curly braces and contain `"key": value` entries separated by commas.

## Examples

```json
{
	"field_name": {
		"field_1": "value_1",
		"field_2": 3,
		"field_3": [
			"array_value_1",
			"array_value_2"
		]
	}
}
```

An object with a [String](/docs/datapack/data-types/string) field, an [Integer](/docs/datapack/data-types/integer) field and an [Array](/docs/datapack/data-types/array) of strings.

```json
"effect": {
    "effect": "minecraft:slowness",
    "amplifier": 1,
    "duration": 80
}
```

An object in the format of a [Status Effect Instance](/docs/datapack/data-types/status-effect-instance), for Slowness II lasting 4 seconds.
