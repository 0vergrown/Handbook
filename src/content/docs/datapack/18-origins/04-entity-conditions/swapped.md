---
title: "Swapped (Entity Condition Type)"
description: "Checks whether the player is currently wearing an origin from their swap pool."
navigation_title: "Swapped"
---

Checks whether the player is currently wearing an origin from their [swappable pool](/docs/datapack/origins/swapping) instead of their own main origin.

Type ID: `origins:swapped`

> [!NOTE]
> This condition comes from the Origins mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The layer to check, either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Also requires this to be the origin they are swapped into. |

The condition is false while the player is on their main origin. To test the main origin itself, use [`origins:origin`](/docs/datapack/origins/origin), which reports the layer's stored pick, and a swap doesn't change that.

## Examples

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/borrowed.png",
    "condition": {
        "type": "origins:swapped"
    }
}
```

This power draws an overlay on the screen while the player is borrowing someone else's origin.

```json
{
    "type": "origins:swapped",
    "origin": "example:acid"
}
```

This only passes while the player is wearing `example:acid`.
