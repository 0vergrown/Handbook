---
title: "Type (Damage Condition Type)"
description: "Checks whether the damage is of a given damage type, or in a damage type tag."
navigation_title: "Type"
---

Checks whether the damage is of a given damage type.

Type ID: `apoli:type`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The damage type to match. Start it with `#` to match a damage type tag instead, as in `"#minecraft:is_fire"`. |

## Examples

```json
"damage_condition": {
	"type": "apoli:type",
	"damage_type": "minecraft:magic"
}
```

This checks whether the damage is of the `minecraft:magic` damage type.

```json
"damage_condition": {
	"type": "apoli:type",
	"damage_type": "#minecraft:is_fire"
}
```

This checks whether the damage type is in the `minecraft:is_fire` tag.
