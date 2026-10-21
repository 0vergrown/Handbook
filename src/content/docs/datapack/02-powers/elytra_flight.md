---
title: "Elytra Flight (Power Type)"
description: "Lets the player fly as if they had an Elytra equipped."
navigation_title: "Elytra Flight"
---

Lets the player fly as if they had an Elytra equipped.

Type ID: `apoli:elytra_flight`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `render_elytra` | [Boolean](/docs/datapack/data-types/boolean) | | Whether an Elytra renders on the player's back while the power is active. A rendered Elytra hides the player's cape, as a worn one does. |
| `texture_location` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the texture used for the Elytra this power renders. |

## Examples

```json
{
    "type": "apoli:elytra_flight",
    "render_elytra": false
}
```

This lets the player glide without rendering an Elytra.

```json
{
    "type": "apoli:elytra_flight",
    "render_elytra": true,
    "texture_location": "minecraft:textures/entity/elytra.png"
}
```

This lets the player glide and renders an Elytra with the default texture.
