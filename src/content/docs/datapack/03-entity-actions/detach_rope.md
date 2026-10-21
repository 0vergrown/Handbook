---
title: "Detach Rope (Entity Action Type)"
description: "Cuts ropes the entity owns, either one labelled rope or all of them."
navigation_title: "Detach Rope"
---

Cuts ropes the acting entity owns. With a `slot` it releases only that labelled rope, such as one of two whips. Without one, it releases every rope the entity owns.

Type ID: `apoli:detach_rope`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [String](/docs/datapack/data-types/string) | _optional_ | The labelled rope to cut. Leave it out to cut every rope the entity owns. |

## Example

```json
{
    "entity_action": {
        "type": "apoli:detach_rope",
        "slot": "left_whip"
    }
}
```

This releases the entity's `left_whip` rope and leaves any others in place.
