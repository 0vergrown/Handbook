---
title: "Emissive (Power Type)"
description: "Makes the entity glow at full brightness, and light up the world when LambDynamicLights is installed."
navigation_title: "Emissive"
---

Makes the entity with the power glow. Its model renders at full brightness, and with [LambDynamicLights](https://modrinth.com/mod/lambdynamiclights) installed it also casts real light on the blocks around it.

Type ID: `apoli:emissive`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `luminance` | [Integer](/docs/datapack/data-types/integer) | `15` | The light level, from `0` to `15`, on the same scale as block light. `15` is one level brighter than a torch, and `7` matches a redstone torch. |
| `self_lit` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the entity's own model renders at that brightness. Set it to `false` for an entity that lights the room without looking lit itself. |
| `water_sensitive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Passed to LambDynamicLights. When `true`, the light goes out underwater, the way a torch's would. |

Several active `apoli:emissive` powers don't stack. The highest `luminance` wins.

## LambDynamicLights

Lighting the world is optional. Without LambDynamicLights the power still renders the entity at full brightness, and nearby blocks stay unlit. Apoli detects the mod at runtime, so the data pack doesn't change either way. Unlike the types under [Compatibility](/docs/compat/introduction/overview), `apoli:emissive` always loads.

Dynamic lighting is drawn by each client, so on the same server, players with LambDynamicLights see the light and players without it don't.

## Examples

```json
{
	"type": "apoli:emissive"
}
```

The entity glows and lights its surroundings at full strength.

```json
{
   "type":"apoli:emissive",
   "luminance":10,
   "water_sensitive":true,
   "condition":{
      "type":"apoli:power_active",
      "power":"example:flame_mode"
   }
}
```

A torch-like glow that only shows while `example:flame_mode` is on, and goes out underwater.

> [!NOTE]
> The power works on any entity that can hold powers, mobs included.
