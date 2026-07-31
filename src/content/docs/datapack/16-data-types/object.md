---
title: "Object (Data Type)"
description: "A complex piece of data consisting of more fields."
navigation_title: "Object"
---

A complex piece of data consisting of more fields. Objects are enclosed in curly braces and contain multiple `"key": value` entries separated by commas.
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
An object containing a [String](/docs/datapack/data-types/string) field, an [Integer](/docs/datapack/data-types/integer) field, and an [Array](/docs/datapack/data-types/array) of Strings.

```json
"effect": {
    "effect": "minecraft:slowness",
    "amplifier": 1,
    "duration": 80
}
```

An object in the format of a [Status Effect Instance](/docs/datapack/data-types/status-effect-instance), specifying a Slowness II status which lasts for 4 seconds.
