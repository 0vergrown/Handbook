---
title: "Holder Action (Item Action Type)"
description: "Runs an entity action on whoever is holding the item stack."
navigation_title: "Holder Action"
aliases: ["holder"]
---

Runs an entity action on whoever is holding the item stack.

Type ID: `apoli:holder_action` (alias `apoli:holder`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | The entity action to run on the holder. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | The same as `action`, under another name. |

## Examples

```json
"item_action": {
	"type": "apoli:holder_action",
	"action": {
		"type": "apoli:heal",
		"amount": 4.0
	}
}
```

This heals the holder by 2 hearts (4 health points).
