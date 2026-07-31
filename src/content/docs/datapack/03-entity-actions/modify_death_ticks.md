---
title: "Modify Death Ticks (Entity Action Type)"
description: "Modifies how long the entity has been dead for."
navigation_title: "Modify Death Ticks"
---

Modifies how long the entity has been dead for.

Type ID: `apoli:modify_death_ticks`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`modifier` | Attribute Modifier | | This modifier will be applied to the current death ticks value of the entity.

## Examples

```json
"entity_action": {
    "type": "apoli:modify_death_ticks",
    "modifier": {
        "operation": "set_total",
        "value": 0
    }
}
```

This example will make the corpse of the entity remain in the world forever.
