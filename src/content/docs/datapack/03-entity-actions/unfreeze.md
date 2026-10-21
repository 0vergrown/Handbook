---
title: "Unfreeze (Entity Action Type)"
description: "Clears the entity's freeze counter."
navigation_title: "Unfreeze"
---

Sets the entity's freeze counter straight back to `0`, which clears the frost vignette, the blue tint and any freeze damage that was about to land.

Type ID: `apoli:unfreeze`

## Fields

This action has no fields.

## Examples

```json
{
  "type": "apoli:unfreeze"
}
```

Thaw out whenever the holder is on fire:

```json
{
  "type": "apoli:action_over_time",
  "interval": 10,
  "entity_action": {
    "type": "apoli:unfreeze"
  },
  "condition": {
    "type": "apoli:on_fire"
  }
}
```

> [!NOTE]
> An entity standing in powder snow starts freezing again on the next tick, because vanilla refills the counter every tick it is in the block. Clearing the counter doesn't make the entity immune. For that, put the entity's type in `#minecraft:freeze_immune_entity_types` or keep running this action.
