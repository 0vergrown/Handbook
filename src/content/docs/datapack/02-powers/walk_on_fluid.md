---
title: "Walk On Fluid (Power Type)"
description: "Lets the entity that has the power walk on a fluid."
navigation_title: "Walk On Fluid"
---

Lets the entity that has the power walk on a fluid.

Type ID: `apoli:walk_on_fluid`

> [!TIP]
> Add a [Fluid Height](/docs/datapack/entity-conditions/fluid_height) condition that checks the fluid is 0.4 blocks deep or less where the entity stands. Without it, an entity that ends up submerged can struggle to get out of the fluid.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fluid` | [Identifier](/docs/datapack/data-types/identifier) | | The fluid tag the entity can walk on, such as `minecraft:water` or `minecraft:lava`. The leading `#` is optional. |

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

This lets the entity walk on lava like a strider. The `fluid_height` condition lets it swim in lava once it sinks, which can happen when it walks into a lavafall.
