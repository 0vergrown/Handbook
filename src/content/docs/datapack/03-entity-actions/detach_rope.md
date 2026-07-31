---
title: "Detach Rope (Entity Action Type)"
description: "Cuts ropes the acting entity owns."
navigation_title: "Detach Rope"
---

Cuts ropes the acting entity owns. With a `slot` it releases only that labelled rope (e.g. one of two whips); without one it releases every rope the entity owns.

Type ID: `apoli:detach_rope`
## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`slot` | String | _optional_ | The labelled rope to cut. If omitted, all ropes owned by the entity are cut.

## Example
```json
{
    "entity_action": {
        "type": "apoli:detach_rope",
        "slot": "left_whip"
    }
}
```

This releases the entity's `left_whip` rope, leaving any others in place.
