---
title: "Chose Origin (Advancement Trigger)"
description: "Fires when the player takes a given origin."
navigation_title: "Chose Origin"
---

Fires when the player takes an origin — picking one in the selection screen, being given one by [origins:grant_origin](/docs/datapack/origins/grant_origin) or an orb, swapping to one on a [swappable layer](/docs/datapack/origins/swapping), and once per layer when they log in holding one.

Trigger ID: `origins:chose_origin`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The origin that was taken. Omit it to match any origin. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The layer it was taken on. Omit it to match any layer. |

## Example

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

Any origin at all, on one specific layer:

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

## Notes

- Because it also fires on login for the origin a player already holds, an advancement added to an existing world is picked up the next time its players join. That is what makes "has the origin" work as well as "just picked it".
- On a swappable layer it reports the origin that is *active*, so cycling back to the base origin fires for that one too.
