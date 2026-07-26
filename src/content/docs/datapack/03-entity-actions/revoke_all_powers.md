---
title: "origins:revoke_all_powers"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Revoke all powers from the specified source.

Type ID: `origins:revoke_all_powers`


##	Fields

Field | Type | Default | Description
------|------|---------|------------
`source` | Identifier | | The ID of the source to revoke powers from.


##	Examples

```json
"entity_action": {
	"type": "origins:revoke_all_powers",
	"source": "origins:blazeborn"
}
```

This example will revoke all powers granted by the Blazeborn origin.

