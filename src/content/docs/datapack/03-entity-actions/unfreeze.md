---
title: "Unfreeze (Entity Action Type)"
description: "Clears the entity's freeze counter."
navigation_title: "Unfreeze"
---

Sets the entity's freeze counter straight back to `0`, clearing the frost vignette, the blue tint and any freeze damage that was about to land.

Type ID: `apoli:unfreeze`

## Fields

_None._

## Examples

```json
{
  "type": "apoli:unfreeze"
}
```

Thaw out whenever the holder is warm enough:

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

> An entity standing **in** powder snow starts freezing again on the next tick — vanilla refills the counter every tick it is in the block. Clearing the counter is not immunity; for that, put the entity's type in `#minecraft:freeze_immune_entity_types` or keep running this action.
