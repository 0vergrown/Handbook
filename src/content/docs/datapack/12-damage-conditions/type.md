---
title: "apoli:type"
description: "Checks whether the damage source is of a certain damage type."
---

Checks whether the damage source is of a certain damage type.

Type ID: `apoli:type`


##	Fields

| Field         | Type                   | Default | Description                                                |
|---------------|------------------------|---------|------------------------------------------------------------|
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) |         | The ID of the damage type to compare the damage source to. |

##	Examples

```json
"damage_condition": {
	"type": "apoli:type",
	"damage_type": "minecraft:magic"
}
```

This example will check if the damage source is of the `minecraft:magic` damage type.
