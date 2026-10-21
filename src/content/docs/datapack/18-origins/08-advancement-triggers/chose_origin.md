---
title: "Chose Origin (Advancement Trigger)"
description: "Fires when the player takes a given origin."
navigation_title: "Chose Origin"
---

Fires when the player takes an origin: picking one in the selection screen, being given one by [origins:grant_origin](/docs/datapack/origins/grant_origin) or an orb, swapping to one on a [swappable layer](/docs/datapack/origins/swapping), and once per layer when they log in holding one.

Trigger ID: `origins:chose_origin`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The origin that was taken. Leave it out to match any origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The layer it was taken on. Leave it out to match any layer. |

## Examples

```json
{
  "criteria": {
    "became_a_phantom": {
      "trigger": "origins:chose_origin",
      "conditions": {
        "origin": "origins:phantom"
      }
    }
  },
  "requirements": [["became_a_phantom"]]
}
```

This advancement is granted when the player becomes a Phantom.

```json
{
  "criteria": {
    "picked_a_class": {
      "trigger": "origins:chose_origin",
      "conditions": {
        "layer": "example:class"
      }
    }
  },
  "requirements": [["picked_a_class"]]
}
```

This one is granted for any origin on the `example:class` layer.

## Notes

- It also fires on login for the origin a player already holds, so an advancement added to an existing world is picked up the next time its players join. That makes it work for "has the origin" as well as "just picked it".
- On a swappable layer it reports the active origin, so cycling back to the base origin fires for that one too.
