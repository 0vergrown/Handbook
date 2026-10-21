---
title: "Action On Reply (Power Type)"
description: "Runs a bi-entity action when another player answers the holder in voice chat."
navigation_title: "Action On Reply"
---

When another player starts speaking near the holder shortly after the holder spoke, this power runs a [bi-entity action](/docs/datapack/bientity-actions) with the holder as the actor and the responder as the target.

Type ID: `apoli:action_on_reply`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the holder as the actor and the responder as the target. |
| `window` | [Integer](/docs/datapack/data-types/integer) | `60` | How many ticks after the holder spoke a reply still counts. |
| `range` | [Float](/docs/datapack/data-types/float) | `16.0` | The maximum distance in blocks between the holder and the responder. |

## Example

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

Anyone who answers within three seconds and ten blocks is launched upwards.
