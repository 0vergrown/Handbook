---
title: "Type (Damage Condition Type)"
description: "Checks whether the damage source is of a certain damage type."
navigation_title: "Type"
---

Checks whether the damage source is of a certain damage type.

Type ID: `apoli:type`

##	Fields

| Field         | Type                   | Default | Description                                                |
|---------------|------------------------|---------|------------------------------------------------------------|
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) |         | The damage type to compare the damage source to. Prefix with `#` to match a damage type tag instead — `"#minecraft:is_fire"`. |

##	Examples

```json
"damage_condition": {
	"type": "apoli:type",
	"damage_type": "minecraft:magic"
}
```

This example will check if the damage source is of the `minecraft:magic` damage type.

```json
"damage_condition": {
	"type": "apoli:type",
	"damage_type": "#minecraft:is_fire"
}
```

This example will check if the damage source is in the `minecraft:is_fire` tag.
