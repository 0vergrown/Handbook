---
title: "Remove Power (Entity Action Type)"
description: "Removes a power from the entity, whatever its source."
navigation_title: "Remove Power"
---

Removes a power from the entity, whatever source granted it.

Type ID: `apoli:remove_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to remove. |

## Examples

```json
"entity_action": {
	"type": "apoli:remove_power",
	"power": "origins:arcane_skin"
}
```

This removes the `origins:arcane_skin` power from the entity.

```json
"entity_action": {
	"type": "apoli:remove_power",
	"power": "*:*"
}
```

`*:*` is the ID of the [file it is written in](/docs/datapack/data-types/identifier#3--means-the-file-i-am-written-in), so this removes the power the action belongs to.
