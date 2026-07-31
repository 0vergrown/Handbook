---
title: "Action On Reply (Power Type)"
description: "Runs a bi-entity action when another player answers the holder in voice chat."
navigation_title: "Action On Reply"
---

Held by the **actor**. When another player starts speaking near the holder shortly after the holder spoke, runs a [Bi-Entity Action](/docs/datapack/bientity-actions) with `actor` = the holder and `target` = the responder.

Type ID: `apoli:action_on_reply`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `bientity_action` | Bi-Entity Action | _optional_ | Run with actor = holder, target = responder. |
| `window` | Integer | `60` | How many ticks after the holder spoke a reply still counts. |
| `range` | Double | `16.0` | Maximum distance in blocks between holder and responder. |

## Example

Answer within three seconds from ten blocks and you get shoved:

```json
{
  "type": "apoli:action_on_reply",
  "window": 60,
  "range": 10.0,
  "bientity_action": {
    "type": "apoli:target_action",
    "action": { "type": "apoli:add_velocity", "y": 0.8 }
  }
}
```
