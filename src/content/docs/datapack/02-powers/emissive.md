---
title: "Emissive (Power Type)"
description: "Makes the holder glow — rendered at full brightness, and lighting up the world when LambDynamicLights is installed."
navigation_title: "Emissive"
---

Makes the holder glow: its model is rendered at full brightness, and with [LambDynamicLights](https://modrinth.com/mod/lambdynamiclights) installed it also casts real light on the blocks around it.

Type ID: `apoli:emissive`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`luminance` | [Integer](/docs/datapack/data-types/integer) | `15` | Light level from `0` to `15`, on the same scale as block light — `15` is a torch and then some, `7` is roughly a redstone torch.
`self_lit` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the holder's own model renders at that brightness. Set it `false` for a holder that lights the room without looking lit itself.
`water_sensitive` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Passed to LambDynamicLights: when `true` the emitted light is suppressed underwater, the way a torch would be.

Several active `apoli:emissive` powers do not stack — the highest `luminance` wins.

## LambDynamicLights

The world-lighting half is optional. Without LambDynamicLights the power still renders the holder at full brightness; blocks nearby simply stay unlit. Apoli detects the mod at runtime, so no data-pack change is needed either way — and unlike the types under [Compat](/docs/compat/introduction/overview), `apoli:emissive` always loads.

Because dynamic lighting is drawn by the client, the effect is visible to everyone who has LambDynamicLights, and invisible to everyone who does not, on the same server.

## Examples

```json
{
	"type": "apoli:emissive"
}
```

The holder glows and lights its surroundings at full strength.

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

A torch-like glow that only burns while `example:flame_mode` is on, and goes out underwater.

> This works on any entity that can hold powers, not just players.
