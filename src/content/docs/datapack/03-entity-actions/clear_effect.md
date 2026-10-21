---
title: "Clear Effect (Entity Action Type)"
description: "Removes one status effect, or every status effect, from a living entity."
navigation_title: "Clear Effect"
---

Removes one type of status effect, or every status effect, from a living entity.

Type ID: `apoli:clear_effect`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The status effect to clear. Leave it out to clear every status effect. |

## Examples

```json
"entity_action": {
    "type": "apoli:clear_effect",
    "effect": "minecraft:poison"
}
```

This clears Poison from the entity.
