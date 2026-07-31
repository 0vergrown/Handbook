---
title: "Clear Effect (Entity Action Type)"
description: "Removes one specific type of status effect, or all status effects, from a living entity."
navigation_title: "Clear Effect"
---

Removes one specific type of status effect, or all status effects, from a living entity.

Type ID: `apoli:clear_effect`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`effect` | Identifier | _optional_ | If specified, the status effect with this namespace and ID will be cleared. If not specified, all status effects will be cleared.

## Examples

```json
"entity_action": {
    "type": "apoli:clear_effect",
    "effect": "minecraft:poison"
}
```

This example will clear the Poison status effect from the entity.
