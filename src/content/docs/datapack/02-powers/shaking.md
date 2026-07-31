---
title: "Shaking (Power Type)"
description: "Makes the entity that has the power shake, similar to a Strider out of lava or a Zombie undergoing conversion."
navigation_title: "Shaking"
---

Makes the entity that has the power shake, similar to a Strider out of lava or a Zombie undergoing conversion.

Type ID: `apoli:shaking`

## Fields

_None._

## Examples

```json
{
  	"type": "apoli:shaking",
  	"condition": {
    	"type": "apoli:on_fire",
      "inverted": true
  	}
}
```

This example will make the entity shake if the entity is not burning.
