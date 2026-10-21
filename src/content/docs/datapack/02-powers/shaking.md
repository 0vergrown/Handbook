---
title: "Shaking (Power Type)"
description: "Makes the entity shake like a strider out of lava or a zombie that is converting."
navigation_title: "Shaking"
---

Makes the entity that has the power shake, like a strider out of lava or a zombie that is converting.

Type ID: `apoli:shaking`

## Fields

_None._

## Behaviour

The shake is the same body yaw wobble vanilla uses, so other players see it on the entity, but it doesn't show in your own first-person view. Skeletons and strays are the exception: their renderer decides `isShaking` on its own and ignores the power.

> [!WARNING]
> The client checks this power's `condition` against the world as the client knows it. Conditions that need state only the server has will never pass here, such as [power inventories](/docs/datapack/powers/inventory), [apoli:command](/docs/datapack/entity-conditions/command), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard) and [apoli:stat](/docs/datapack/entity-conditions/stat). Use [apoli:power_active](/docs/datapack/entity-conditions/power_active) or a [resource](/docs/datapack/powers/resource) instead, because those are synced.

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

This makes the entity shake while it isn't on fire.
