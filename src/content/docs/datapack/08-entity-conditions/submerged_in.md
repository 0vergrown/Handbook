---
title: "Submerged In (Entity Condition Type)"
description: "Checks whether the entity's eyes are in a fluid that is included in the specified fluid tag."
navigation_title: "Submerged In"
---

Checks whether the entity's eyes are in a fluid that is included in the specified fluid tag.

Type ID: `apoli:submerged_in`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fluid` | Identifier | | The namespace and ID of the fluid tag that should be checked. Most important examples: `minecraft:water` and `minecraft:lava`. The leading `#` is optional.

## Examples

```json
"condition": {
    "type": "apoli:submerged_in",
    "fluid": "minecraft:water"
}
```

This example will check if the player is submerged in water.
