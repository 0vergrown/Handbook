---
title: "Shaking (Power Type)"
description: "Makes the entity that has the power shake, similar to a Strider out of lava or a Zombie undergoing conversion."
navigation_title: "Shaking"
---

Makes the entity that has the power shake, similar to a Strider out of lava or a Zombie undergoing conversion.

Type ID: `apoli:shaking`

## Fields

_None._

## Behaviour

The shake is the same body-yaw wobble vanilla uses, so it shows on the entity as other players see it, not in your own first-person view. Skeletons and strays are the one exception — their renderer decides `isShaking` on its own and ignores the power.

> The `condition` on this power is checked by the **client**, against the world as the client knows it. Conditions that need server-only state — [power inventories](/docs/datapack/powers/inventory), [apoli:command](/docs/datapack/entity-conditions/command), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard), [apoli:stat](/docs/datapack/entity-conditions/stat) — will never pass here. Gate the power with [apoli:power_active](/docs/datapack/entity-conditions/power_active) or a [resource](/docs/datapack/powers/resource) instead; those are synced.

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
