---
title: "origins:remove_power"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Removes a power from the entity, regardless of its source.

Type ID: `origins:remove_power`


##	Fields

Field | Type | Default | Description
------|------|---------|------------
`power` | Identifier | | The ID of the power to remove from the entity.


##	Examples

```json
"entity_action": {
	"type": "origins:remove_power",
	"power": "origins:arcane_skin"
}
```

This example will remove the `origins:arcane_skin` power from the entity.




```json
"entity_action": {
	"type": "origins:remove_power",
	"power": "*:*"
}
```

This example will remove the power itself from the entity.

