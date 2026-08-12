---
title: "Walk On Fluid (Power Type)"
description: "Allows the entity that has the power to walk on fluid."
navigation_title: "Walk On Fluid"
---

Allows the entity that has the power to walk on fluid.

Type ID: `apoli:walk_on_fluid`

> It is suggested to use the [Fluid Height (Entity Condition Type)](/docs/datapack/entity-conditions/fluid_height) entity condition type to check if the height of the fluid the player is currently on/in is less or equal to 0.4, otherwise, the entity that has the power may have problems getting out of the fluid once they are submerged.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fluid` | Identifier | | The namespace and ID of the fluid tag on which the player should be able to walk onto. Most important examples: `minecraft:water` and `minecraft:lava`. The leading `#` is optional.

## Examples

```json
{
  	"type": "apoli:walk_on_fluid",
  	"fluid": "minecraft:lava",
  	"condition": {
    	"type": "apoli:fluid_height",
    	"fluid": "minecraft:lava",
    	"comparison": "<=",
    	"compare_to": 0.4
  	}
}
```

This example will allow the entity that has the power to walk on lava similar to Striders. The suggested condition was added to allow the entity to swim in lava once they sink, which may happens when they walk into a Lava-fall.
