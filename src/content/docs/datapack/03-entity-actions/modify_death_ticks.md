---
title: "Modify Death Ticks (Entity Action Type)"
description: "Changes how long the entity counts as having been dead."
navigation_title: "Modify Death Ticks"
---

Changes the entity's death ticks, the counter of how long it has been dead.

Type ID: `apoli:modify_death_ticks`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _required_ | The modifier applied to the entity's current death ticks. |

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

This sets the death ticks back to 0, which restarts the death animation. Run it every tick while the entity is dead and the corpse stays in the world.
